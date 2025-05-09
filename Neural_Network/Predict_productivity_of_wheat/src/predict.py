import joblib
import numpy as np
from tensorflow.keras.models import load_model
import os
import sys
from pathlib import Path

# Получаем путь к директории текущего файла (где лежит функция)
current_script_dir = Path(__file__).parent.absolute()
sys.path.append(str(current_script_dir))
def predict_productivity(wheat_info):
    # Температура, осадки, влажность, ветер, сорняки
    temperature = wheat_info["temperature"]
    precipitation = wheat_info["precipitation"]
    humidity = wheat_info["humidity"]
    wind = wheat_info["wind"]
    weeds = wheat_info["weeds"]
    NDVI = wheat_info["NDVI"]
    """
    Предсказывает урожайность пшеницы на основе входных параметров.

    Аргументы:
    temperature (float): Температура в °C
    precipitation (float): Осадки в мм
    humidity (float): Влажность в %
    wind (float): Скорость ветра в м/с
    weeds (float): Процент сорняков

    Возвращает:
    float: Прогнозируемая урожайность в %
    """
    # Загрузка модели и scaler
    model_path = os.path.join(current_script_dir, '../models/wheat_model.h5')
    scaler_path = os.path.join(current_script_dir,'../models/scaler.pkl' )
    model = load_model(model_path)
    scaler = joblib.load(scaler_path)

    # Создаем массив с входными данными
    input_data = np.array([[temperature, precipitation, humidity, wind, weeds, NDVI]])

    # Нормализуем данные
    scaled_data = scaler.transform(input_data)

    # Делаем предсказание
    prediction = float(model.predict(scaled_data)[0][0])

    # Ограничиваем результат 0-100%

    return {
        "successfuly": True,
        "result": max(0, min(100, round(prediction, 2))),
        "description": "predict productivity"
    }


# Пример использования
