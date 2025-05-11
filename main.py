from API.utils.get_NDVI import get_ndvi_on_image_cv2
import cv2
import os

img_colored = cv2.imread('./test_image_4.png')
print(get_ndvi_on_image_cv2(img_colored))

