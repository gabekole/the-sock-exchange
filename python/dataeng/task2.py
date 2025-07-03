import re
from collections import defaultdict
from pymongo import MongoClient

def extract_transform(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.readlines()

    char_map = defaultdict(int)
    word_map = defaultdict(int)
    act_word_map = defaultdict(lambda: defaultdict(int))
    act_char_map = defaultdict(lambda: defaultdict(int))

    current_act = None

    for line in data:
        if line.startswith('='):
            continue
        
        act_match = re.match(r'Act (\d+)', line, re.IGNORECASE)
        if act_match:
            current_act = act_match.group(1)

        line = re.sub(r'https://.*', '', line)
        line = re.sub(r'[^a-zA-Z0-9\s]', '', line)
        
        for char in line.lower():
            if char.isalnum():
                char_map[char] += 1
                if current_act:
                    act_char_map[current_act][char] += 1

        for word in line.lower().split():
            word_map[word] += 1
            if current_act:
                act_word_map[current_act][word] += 1

    return char_map, word_map, act_char_map, act_word_map

def load_to_mongo(char_map, word_map, act_char_map, act_word_map):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['shakespeare']

    # Collections
    char_collection = db['characters']
    word_collection = db['words']
    act_word_collection = db['act_words']
    act_char_collection = db['act_characters']

    char_collection.insert_many([{'character': char, 'occurrences': count} for char, count in char_map.items()])

    word_collection.insert_many([{'word': word, 'occurrences': count} for word, count in word_map.items()])

    for act, words in act_word_map.items():
        act_word_collection.insert_many([{'act': act, 'word': word, 'occurrences': count} for word, count in words.items()])

    for act, chars in act_char_map.items():
        act_char_collection.insert_many([{'act': act, 'character': char, 'occurrences': count} for char, count in chars.items()])

if __name__ == "__main__":
    file_path = 'a-midsummer-nights-dream.txt'
    char_map, word_map, act_char_map, act_word_map = extract_transform(file_path)
    load_to_mongo(char_map, word_map, act_char_map, act_word_map)
