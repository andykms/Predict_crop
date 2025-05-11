import cv2

def get_ndvi_on_image_cv2(image):
    # Если изображение grayscale (2D), конвертируем в RGB
    print(image)
    if len(image.shape) == 2:
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)

    # Разделение на каналы
    r = image[..., 0].astype(float)  # Красный
    g = image[..., 1].astype(float)  # Зеленый (псевдо-NIR)

    # Расчет псевдо-NDVI
    ndvi = (g - r) / (g + r + 1)
    print(ndvi)
    # Среднее значение NDVI по всему изображению
    return ndvi.mean()
