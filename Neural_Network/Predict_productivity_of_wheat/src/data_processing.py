import pandas as pd
from sklearn.model_selection import train_test_split

def loadSelectionData(X, y, testSize, randomState):
    #X = df[['Температура', 'Осадки', 'Влажность', 'Ветер', 'Сорняки']]
    #y = df['Урожайность']
    return train_test_split(X, y, test_size=testSize, random_state=randomState)

def loadCsv(path):
    df = pd.read_csv(path)
    return df

