from fastapi import FastAPI
from routers import ndvi_router, yield_router
from fastapi.middleware.cors import CORSMiddleware  # <-- Добавьте это


app = FastAPI(title="Wheat Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Для разработки можно разрешить все домены
    allow_methods=["*"],  # Разрешить все методы (GET, POST, OPTIONS и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


app.include_router(ndvi_router.router, prefix = '/ndvi', tags=["NVDI"])
app.include_router(yield_router.router, prefix="/yield", tags=["Yield"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



