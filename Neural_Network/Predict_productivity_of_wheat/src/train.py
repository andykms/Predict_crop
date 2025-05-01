from data_processing import loadCsv, loadSelectionData
from normalize import normalizeData, normalize
from model import Model
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import joblib
from tensorflow.keras.models import save_model
import os
from pathlib import Path
import datetime

current_script_dir = Path(__file__).parent.absolute()


csv_path = os.path.join(current_script_dir, '../data/WHEAT.csv')

df = loadCsv(csv_path)
X = df[["Temperature","Precipitation","Humidity","Wind","Weeds","NDVI",]]
y = df["Productivity"]
XTrain, XTest, YTrain, YTest = loadSelectionData(X, y, 0.2, 42)

scaler = StandardScaler()

XTrain, XTest = normalizeData(scaler, XTrain, XTest)

model = Model(XTrain, YTrain, XTest, YTest)
model.training(50, 32)
#Температура, осадки, влажность, ветер, сорняки

# Оценка модели на тестовых данных
test_loss, test_mae = model.model.evaluate(XTest, YTest, verbose=0)
print(f"Test MSE: {test_loss:.2f}")
print(f"Test MAE: {test_mae:.2f}%")

# Визуализация динамики обучения: функции потерь и точности
plt.figure(figsize=(12, 5))
# Сорняки - процент по площади
history = model.getHistory()
plt.subplot(1,2,1)
plt.plot(history.history['loss'], label='Training Loss' )
plt.plot(history.history['val_loss' ], label='Validation Loss' )
plt.title('Потери от эпохи')
plt.xlabel('Эпоха')
plt.ylabel('Потери')
plt. legend()

plt.subplot(1,2,2)
plt.plot(history.history['mae'], label='Training Accuracy')
plt.plot(history.history['val_mae'], label='Validation Accuracy' )
plt.title('Средняя величина ошибки от Эпохи')
plt.xlabel('Эпоха')
plt.ylabel('Средняя величина ошибки ')
plt.legend()


plt.show()

model_save_path = os.path.join(current_script_dir, '../models/wheat_model.h5')
scaler_save_path = os.path.join(current_script_dir, '../models/scaler.pkl')

date_save_train = datetime.datetime.now()
print(f"{date_save_train} : Модель сохранена относительно train.py: {model_save_path} | model save between train.py: {model_save_path} - train.py")
save_model(model.model, model_save_path)  # Keras model
# Сохраняем scaler
joblib.dump(scaler, scaler_save_path)