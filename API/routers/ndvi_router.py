from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import Response
import numpy as np
from PIL import Image
import io
from pathlib import Path
import sys

from utils.image_processing import proccess_image

current_script_dir = Path(__file__).parent.absolute()
sys.path.append(str(current_script_dir))
router = APIRouter()

@router.post("/analize", response_class=Response)
async def analyze_ndvi(image: UploadFile = File(...)):
    if not image.content_type.startswith('image/'):
        raise HTTPException(400, "Файл должен быть изображением")

    #Загрузка
    contents = await image.read()
    img = Image.open(io.BytesIO(contents))

    processed_img, ndvi_value = proccess_image(np.array(img))

    img_byte_arr = io.BytesIO()
    Image.fromarray(processed_img).save(img_byte_arr, format="PNG")
    print(ndvi_value)
    return Response(
        content=img_byte_arr.getvalue(),
        media_type="image/png",
        headers={
            "X-NDVI_Value": str(ndvi_value)
        }
    )