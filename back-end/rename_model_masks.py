import os
import json


def create_name_mapping() -> None:
    name_mapping_path = os.environ['NAME_MAPPING_PATH']
    model_masks_dir = os.environ['MODEL_MASKS_DIR']

    models = [name for name in os.listdir(model_masks_dir) if os.path.isdir(os.path.join(model_masks_dir, name))]

    with open(name_mapping_path) as f:
        name_mapping = json.load(f)

        for model in models:
            for key, value in name_mapping.items():
                key = key.split('.')[0]
                filename = f'{key}.npy'

                old_path = os.path.join(model_masks_dir, model, filename)
                new_path = os.path.join(model_masks_dir, model, f'{value}.npy')
                os.rename(old_path, new_path)


if __name__ == "__main__":
    create_name_mapping()
