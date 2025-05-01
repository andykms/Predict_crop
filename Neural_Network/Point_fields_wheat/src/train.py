from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from model import unet_model
import yaml
import os
import numpy as np
import cv2

# Загрузка параметров
with open('configs/params.yaml') as f:
    params = yaml.safe_load(f)

# Создание модели
model = unet_model()
model.compile(optimizer=Adam(params['lr']),
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Генератор данных
def data_generator(image_dir, mask_dir, batch_size):
    image_files = os.listdir(image_dir)
    image_files.pop()
    while True:
        batch_images = []
        batch_masks = []
        for img_name in np.random.choice(image_files, batch_size):
            # Загрузка изображения
            img_path = os.path.join(image_dir, img_name)
            img = cv2.imread(img_path, 0)
            if img is None:
                print(f"Ошибка загрузки изображения: {img_path}")
                continue

            # Загрузка маски
            mask_path = os.path.join(mask_dir, img_name)
            mask = cv2.imread(mask_path, 0)
            if mask is None:
                print(f"Ошибка загрузки маски: {mask_path}")
                continue

            # Нормализация и добавление в батч
            batch_images.append(np.expand_dims(img / 255.0, axis=-1))
            batch_masks.append(np.expand_dims(mask / 255.0, axis=-1))

        yield np.array(batch_images), np.array(batch_masks)

# Обучение
train_image_dir = 'data/processed/images/train'
train_mask_dir = 'data/processed/masks/train'

print("Примеры файлов в images:", os.listdir(train_image_dir)[:3])
print("Примеры файлов в masks:", os.listdir(train_mask_dir)[:3])

# Проверка совпадения имён
image_files = set(os.listdir(train_image_dir))
mask_files = set(os.listdir(train_mask_dir))
print("Отсутствующие маски:", image_files - mask_files)


train_gen = data_generator('data/processed/images/train', 'data/processed/masks/train', params['batch_size'])
val_gen = data_generator('data/processed/images/valid', 'data/processed/masks/valid', params['batch_size'])

callbacks = [
    ModelCheckpoint('models/best_model.h5', save_best_only=True),
    EarlyStopping(patience=5)
]

history = model.fit(
    train_gen,
    steps_per_epoch=len(os.listdir('data/processed/images/train')) // params['batch_size'],
    validation_data=val_gen,
    validation_steps=len(os.listdir('data/processed/images/valid')) // params['batch_size'],
    epochs=params['epochs'],
    callbacks=callbacks
)