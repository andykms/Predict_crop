from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from normalize import normalize
from tensorflow.keras.optimizers import Adam

class Model:
    def __init__(self, XTrain, YTrain, XTest, YTest):
        self.XTrain = XTrain
        self.YTrain = YTrain
        self.XTest = XTest
        self.YTest = YTest
        self.model = Sequential([
            Dense(128, activation='relu', input_shape=(self.XTrain.shape[1],)),
            Dense(64, activation='relu'),
            Dense(32, activation='relu'),
            Dense(1)
        ])

        self.model.compile(optimizer=Adam(learning_rate=0.001),
                           loss='mean_squared_error',
                           metrics=['mae'])

    def training(self, epochs, batchSize):
        self.history = self.model.fit(
            self.XTrain, self.YTrain,
            epochs=epochs,
            batch_size=batchSize,
            validation_data=(self.XTest, self.YTest)
        )

    def getHistory(self):
        return self.history

    def predict(self, data):
        prediction = self.model.predict(data)
        return prediction

