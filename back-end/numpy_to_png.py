import os

from PIL import Image
import numpy as np

COLOR_MAPPING = {
    "SegFormer": (244, 96, 54, 255),
    "model": (91, 133, 170, 255),
    "Purple Navy": (65, 71, 112, 255),
    "Russian Violet": (55, 34, 72, 255),
    "Xiketic": (23, 17, 35, 255),
    "Misty Rose": (244, 219, 216, 255),
    "Dark Pastel Green": (76, 185, 68, 255),
    "Baby Powder": (253, 255, 252, 255),
}


def numpy_to_png() -> None:
    model_masks_dir = os.environ['MODEL_MASKS_DIR']
    output_dir = os.environ['OUTPUT_DIR']

    models = [name for name in os.listdir(model_masks_dir) if os.path.isdir(os.path.join(model_masks_dir, name))]

    for model in models:
        model_dir = os.path.join(model_masks_dir, model)
        masks = [f for f in os.listdir(model_dir) if os.path.isfile(os.path.join(model_dir, f)) and f.endswith('.npy')]

        model_output_dir = os.path.join(output_dir, model)
        os.makedirs(model_output_dir, exist_ok = True)

        for mask in masks:
            numpy_file_path = os.path.join(model_dir, mask)
            data = np.load(numpy_file_path)

            if model in ['model']:
                data = np.logical_or.reduce(data, axis=2).astype(int)

            result = np.zeros((*data.shape, 4), dtype=np.uint8)
            result[data > 0] = COLOR_MAPPING[model]

            png_file_path = os.path.join(model_output_dir, f'{mask.split(".")[0]}.png')
            output_image = Image.fromarray((result).astype(np.uint8))
            output_image = output_image.convert('RGBA')
            output_image.save(png_file_path)


if __name__ == "__main__":
    numpy_to_png()
