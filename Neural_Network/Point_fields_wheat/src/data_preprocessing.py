import os
import cv2
import numpy as np
import pandas as pd
from tqdm import tqdm


#Создание маски из нулей и единиц, которые необходимы для обучения нейросети
def create_masks(annotations_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    df = pd.read_csv(annotations_path)
    #Перебор файлов в папке
    for img_name in tqdm(df['filename'].unique()):
        #Получение нужной аннотаций в csv файле по имени файла
        img_annotations = df[df['filename'] == img_name]
        mask = np.zeros((640, 640), dtype=np.uint8)

        for _, row in img_annotations.iterrows():
            if row['class'] == 'paddy':  # Сегментируем только пшеницу (paddy)
                #Получаем прямоугольную область
                x1, y1, x2, y2 = row['xmin'], row['ymin'], row['xmax'], row['ymax']
                #заполняем данную область в маске единицами
                mask[y1:y2, x1:x2] = 1

        cv2.imwrite(os.path.join(output_dir, img_name), mask * 255)


#Переделываем изображение в канал серого
def preprocess_images(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    for img_name in tqdm(os.listdir(input_dir)):
        if(img_name.endswith('.jpg')):
            #Создаем объект изображения
            img = cv2.imread(os.path.join(input_dir, img_name))
            #Создаем серое изображение из него
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            #сохраняем его в папке
            cv2.imwrite(os.path.join(output_dir, img_name), gray)


# Обработка всех данных
for dataset in ['train', 'valid', 'test']:
    #Сначала создаем черно-белые изображения из папок train valid test
    preprocess_images(f'./data/raw/{dataset}', f'data/processed/images/{dataset}')
    #потом создаем из них маски
    create_masks(f'./data/raw/{dataset}/_annotations.csv', f'data/processed/masks/{dataset}')