from fastapi import FastAPI
from routers import ndvi_router, yield_router

app = FastAPI(title="Wheat Analysis API")

app.include_router(ndvi_router.router, prefix = '/ndvi', tags=["NVDI"])
app.include_router(yield_router.router, prefix="/yield", tags=["Yield"])

if __name__ == "__main__":
    import uvicorn


    uvicorn.run(app, host="0.0.0.0", port=8000)



