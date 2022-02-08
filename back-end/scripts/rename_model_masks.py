import os
import json

PREFIX = {
    'mask output deeplabv3_xception_tf_dim_ordering_tf_kernels': 'deeplabv3_xception_tf_dim_ordering_tf_kernels_',
    'mask output deeplabv3_xception65_ade20k': 'deeplabv3_xception65_ade20k_',
    'mask output mask_rcnn_coco': 'mask_rcnn_coco_'
}


def create_name_mapping() -> None:
    name_mapping_path = os.environ['NAME_MAPPING_PATH']
    model_masks_dir = os.environ['MODEL_MASKS_DIR']

    models = [name for name in os.listdir(model_masks_dir) if os.path.isdir(os.path.join(model_masks_dir, name))]

    with open(name_mapping_path) as f:
        name_mapping = json.load(f)

        for model in models:
            for key, value in name_mapping.items():
                filename = f'{key}.npy'

                if model in PREFIX:
                    filename = f'{PREFIX[model]}{filename}'

                old_path = os.path.join(model_masks_dir, model, filename)
                new_path = os.path.join(model_masks_dir, model, f'{value}.npy')

                try:
                    os.rename(old_path, new_path)
                except:
                    print(old_path.split('/')[-1])


if __name__ == "__main__":
    create_name_mapping()
