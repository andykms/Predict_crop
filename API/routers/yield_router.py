from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import numpy as np
from utils.predict_yield import predict_productivity
router = APIRouter()

class YieldParams(BaseModel):
    temperature: float
    precipitation: float
    humidity: float
    wind: float
    weeds: float
    ndvi: float

@router.post("/predict")
def predict_yield(params: YieldParams):
    input_data = {
        "temperature": params.temperature,
        "precipitation": params.precipitation,
        "humidity": params.humidity,
        "wind": params.wind,
        "weeds": params.weeds,
        "NDVI": params.ndvi
    }

    prediction_productivity = predict_productivity(input_data)

    return {
        "productivity": prediction_productivity
    }
