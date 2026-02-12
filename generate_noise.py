import random
from PIL import Image

def generate_noise_texture(width, height, opacity=0.05):
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            # Random noise value (0-255)
            noise = random.randint(0, 255)
            # Alpha based on opacity (approx)
            alpha = int(255 * opacity * random.random())
            
            # Simple gray noise
            pixels[x, y] = (noise, noise, noise, alpha)
            
    img.save('noise.png')
    print("Noise texture generated as noise.png")

if __name__ == "__main__":
    # Generate a 200x200 patch which can be repeated
    generate_noise_texture(200, 200, opacity=0.15)
