import os
import io

from PIL import Image
import numpy as np
from base64 import encodebytes


def png_to_base_64() -> None:
    model_masks_dir = os.environ['MODEL_MASKS_DIR']
    output_dir = os.environ['OUTPUT_DIR']

    models = [name for name in os.listdir(model_masks_dir) if os.path.isdir(os.path.join(model_masks_dir, name))]

    for model in models:
        model_dir = os.path.join(model_masks_dir, model)
        masks = [f for f in os.listdir(model_dir) if os.path.isfile(os.path.join(model_dir, f)) and f.endswith('.png')]

        model_output_dir = os.path.join(output_dir, model)
        os.makedirs(model_output_dir, exist_ok = True)

        for mask in masks:
            full_mask_path = os.path.join(model_dir, mask)
            result = get_response_image(full_mask_path)

            output_path = os.path.join(model_output_dir, f'{mask.split(".")[0]}.txt')

            with open(output_path, 'w') as f:
                f.write(result)


def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    # print('read image')
    byte_arr = io.BytesIO()
    # print('created byte arr')
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    # print('saved image to byte array')
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    # print('encoded into base64')
    return encoded_img


if __name__ == "__main__":
    png_to_base_64()
