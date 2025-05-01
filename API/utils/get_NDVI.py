import cv2

def get_ndvi_on_image_cv2(image):
    # Конвертируем из BGR (OpenCV) в RGB
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Получаем размеры изображения
    height, width, _ = rgb_image.shape

    # Список для хранения RGB-значений
    rgb_pixels = []
    ndvi = 0
    # Перебираем каждый пиксель
    for y in range(height):
        for x in range(width):
            # Получаем RGB-значение пикселя
            r, g, b = rgb_image[y, x]
            if(r < 255 and g < 255 and b < 255):
                ndvi +=  (g - r)/2*(g+r+ 1e-10)

    return {
        "successfuly": True,
        "result": ndvi,
        "description": "NDVI"
    }
