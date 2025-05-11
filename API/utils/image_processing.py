import os
import cv2
import numpy as np
from models.NDVI_neural_network_model.unet import unet_model
from .get_NDVI import get_ndvi_on_image_cv2
import datetime
import sys
from pathlib import Path
import copy

current_script_dir = Path(__file__).parent.absolute()
sys.path.append(str(current_script_dir))

def get_colored_filtered_image(black_image, colored_image):
    print(black_image)
    print(colored_image)
    result = np.full_like(colored_image,255)
    mask = (black_image == 0)
    result[mask] = colored_image[mask]
    return result

def resize_image(img, size=(28,28)):
    h, w = img.shape[:2]
    c = img.shape[2] if len(img.shape)>2 else 1
    if h == w:
        return cv2.resize(img, size, cv2.INTER_AREA)
    dif = h if h > w else w
    interpolation = cv2.INTER_AREA if dif > (size[0]+size[1])//2 else cv2.INTER_CUBIC
    x_pos = (dif - w)//2
    y_pos = (dif - h)//2
    if len(img.shape) == 2:
        mask = np.zeros((dif, dif), dtype=img.dtype)
        mask[y_pos:y_pos+h, x_pos:x_pos+w] = img[:h, :w]
    else:
        mask = np.zeros((dif, dif, c), dtype=img.dtype)
        mask[y_pos:y_pos+h, x_pos:x_pos+w, :] = img[:h, :w, :]
    return cv2.resize(mask, size, interpolation)

def apply_mask_and_orig_img(mask, img, img_colored):
    result = cv2.bitwise_and(img, img, mask=mask)
    colored_result = get_colored_filtered_image(result, img_colored)
    return colored_result

#Нормализация изображения
def normalize_img(img):
    img_normalized = np.expand_dims(np.expand_dims(img / 255.0, axis=0), axis=-1)
    return img_normalized

#Получение предсказзанной маски по изображению
def predict_mask(img_normalized):
    model = unet_model()
    model_path = os.path.join(current_script_dir, '../models/NDVI_neural_network_model/best_model.h5')
    model.load_weights(model_path)
    mask = model.predict(img_normalized)[0]
    mask = (mask > 0.5).astype(np.uint8) * 255
    return mask

def predict_points(img):
    #Изменяем размер изображения
    img = resize_image(img, (100, 100))
    img_colored = copy.deepcopy(img);
    print(img_colored)
    if img.shape[-1] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    #Нормализуем изображение
    img_normalized = normalize_img(img)

    #Получаем маску
    mask = predict_mask(img_normalized)

    #Получаем итоговое изображение
    result = apply_mask_and_orig_img(mask, img, img_colored)

    return result

#Основная функция
def proccess_image(img):
    predicted_img = predict_points(img)
    ndvi = get_ndvi_on_image_cv2(predicted_img)
    print(ndvi)
    return [predicted_img, ndvi]


















#Старый код
def predict_points_as_path(path, output_path):
    # Путь к изображению (лучше использовать абсолютный)
    image_path = os.path.join(os.path.dirname(__file__), path)

    print(f"Пытаюсь загрузить: {image_path}")
    time_start_get_image = datetime.datetime.now()
    if os.path.exists(image_path):
        print(f"{time_start_get_image} : файл успешно загружен| file download successfuly - Predict.py")
    else:
        print(f"{time_start_get_image} : ФАЙЛ НЕ НАЙДЕН | FILE NOT FOUND - Predict.py")
        return {
            "result": None,
            "successfuly": False,
            "description": "file not found"
        }
    result = process_image_old(image_path)

    if(result["successfuly"] == True):
        try:
            cv2.imwrite(output_path, result["result"])
        except:
            time_recored_image = datetime.datetime.now()
            print(f"{time_recored_image} : ОШИБКА ЗАПИСИ ФАЙЛА ИЗОБРАЖЕНИЯ В ДИРЕКТОРИЮ | ERROR RECORD FILE IMAGE - Predict.py")

    result["description"] = output_path
    return result


def process_image_old(image_path):
    # Загрузка изображения
    img_colored = cv2.imread(image_path,1)
    img_colored = resize_image(img_colored, (640,640))
    img = cv2.imread(image_path, 0)  # 0 — флаг для grayscale

    datetime_start_process_image = datetime.datetime.now()
    if img is None:
        print(f"{datetime_start_process_image} : ОШИБКА ОБРАБОТКИ ИЗОБРАЖЕНИЕ| ERROR OF PROCESS IMAGE - Predict.py")
        return {
            "result": None,
            "successfuly": False,
            "description": "error process image"
        }


    img = resize_image(img, (640,640))
    img_normalized = np.expand_dims(np.expand_dims(img / 255.0, axis=0), axis=-1)

    # Загрузка модели
    model = unet_model()
    model.load_weights('models/best_model.h5')

    # Предсказание
    mask = model.predict(img_normalized)[0]
    mask = (mask > 0.5).astype(np.uint8) * 255

    # Применение маски
    original = resize_image(img, (640, 640))
    result = cv2.bitwise_and(original, original, mask=mask)
    colored_result = get_colored_filtered_image(result, img_colored)
    return {
        "result": colored_result,
        "successfuly": True,
        "description": "",
    }