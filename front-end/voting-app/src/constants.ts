export const MASK_OPACITY = 0.6; 

export const COLOR_MAPPING: any = {
    "segformer_masks": [244, 96, 54, MASK_OPACITY],
    "deeplabv3_xception_tf_dim_ordering_tf_kernels": [91, 133, 170, MASK_OPACITY],
    "deeplabv3_xception65_ade20k": [65, 71, 112, MASK_OPACITY],
    "fcn_resnet101_masks": [55, 34, 72, MASK_OPACITY],
    "mask_rcnn_coco": [23, 17, 35, MASK_OPACITY],
    "unet": [244, 219, 216, MASK_OPACITY],
    "Dark Pastel Green": [76, 185, 68, MASK_OPACITY],
    "Baby Powder": [253, 255, 252, MASK_OPACITY],
}

export const MODELS_NAME_MAPPING: any = {
    "segformer_masks": "SegFormer",
    "deeplabv3_xception_tf_dim_ordering_tf_kernels": "DeepLabV3 Xception",
    "deeplabv3_xception65_ade20k": "DeepLabV3 Xception ADE20k",
    "fcn_resnet101_masks": "FCN ResNet101",
    "mask_rcnn_coco": "Mask R-CNN COCO",
    "unet": 'U-Net',
}

export const COLORS = {
    // DARK: '#272727',
    DARK: 'rgb(16 16 16)',
    YELLOW: '#FED766',

    BLACK: '#050404',
    LIGHT_GREY: '#d9d9d9',
    MEDIUM_GREY: '#a5a5a5',
    DARK_GREY: '#636363',
    DARK_GOLD: '#50462e',
    MEDIUM_GOLD: '#8f7539',
    LIGHT_GOLD: '#ab965f',
    VERY_LIGHT_GOLD: '#d0c18c',
}
