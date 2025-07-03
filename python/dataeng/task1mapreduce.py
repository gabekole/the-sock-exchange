import re
from collections import defaultdict
from datetime import datetime

def map_reduce(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.readlines()

    start_time = datetime.now()

    word_map = defaultdict(int)
    for line in data:
        if line.startswith('='):
            continue
        
        line = re.sub(r'https://.*', '', line)
        line = re.sub(r'[^a-zA-Z0-9\s]', '', line)
        
        for word in line.lower().split():
            word_map[word] += 1

    end_time = datetime.now()
    print('Duration: {}'.format(end_time - start_time))

    return word_map

file_path = 'a-midsummer-nights-dream.txt'  # Replace with the path to your text file
word_count = map_reduce(file_path)
print(word_count)
