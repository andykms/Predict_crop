from Neural_Network.Predict_productivity_of_wheat.src.predict import predict_productivity
from Neural_Network.Point_fields_wheat.src.predict import predict
from Neural_Network.Get_NDVI import get_NDVI

result_predict_fields = predict('../test_images/test_image_1.jpg', '../');
NDVI_result = get_NDVI(result_predict_fields["result"])

result = predict_productivity({
    "temperature": 16,
    "precipitation": 90.12,
    "humidity": 45.9,
    "wind": 0.7,
    "weeds": 21,
    "NDVI": NDVI_result,
})

print(result)
