from datetime import datetime

# Function to generate socks with a default template
def generate_socks(*args, **kwargs):
    # Define the default sock template
    default_template = {
        "sockDetails": {
            "size": "Large",
            "color": "Yellow",
            "pattern": "Plain",
            "material": "Bamboo",
            "condition": "Used",
            "forFoot": "Both"
        },
        "additionalFeatures": {
            "waterResistant": False,
            "padded": False,
            "antiBacterial": True
        }
    }

    # Update the default template with any provided keyword arguments
    for key in kwargs:
        if key in default_template:
            default_template[key].update(kwargs[key])

    # Create a list of socks based on the updated template
    socks = []
    for _ in range(args[0]):
        sock = default_template.copy()
        sock['addedTimestamp'] = datetime.now().isoformat()
        socks.append(sock)

    return socks

# Example usage with additional parameters to customize the socks
custom_socks = generate_socks(3, sockDetails={'color': 'Red'}, additionalFeatures={'waterResistant': True})
print(custom_socks)
