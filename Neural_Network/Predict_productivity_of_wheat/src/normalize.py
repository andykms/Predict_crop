import numpy as np
#XTrain: number[]
#XTest: number[]
#return [number[], number[]]
def normalizeData(scaler,XTrain, XTest):
    XTrain = scaler.fit_transform(XTrain)
    XTest = scaler.transform(XTest)
    return [XTrain, XTest]

def normalize(scaler, data):
    dataScaled = scaler.transform(data)
    return dataScaled
