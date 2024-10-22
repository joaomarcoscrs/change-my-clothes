#!/usr/local/bin/python

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import base64
# You'll need to import your image processing function here
# from your_image_processing_module import process_image

app = FastAPI()

# Add CORSMiddleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

class ChangeClothesRequest(BaseModel):
    image: str
    prompt: str

@app.post("/api/changeclothes")
async def change_clothes(request: ChangeClothesRequest):
    try:
        # Decode the base64 image
        image_data = base64.b64decode(request.image)
        
        # Process the image (you'll need to implement this function)
        # result_image = process_image(image_data, request.prompt)
        
        # For now, we'll just return the same image
        result_image = image_data
        
        # Encode the result image to base64
        result_base64 = f"data:image/jpeg;base64,{base64.b64encode(result_image).decode('utf-8')}"
        
        return {"result_image": result_base64}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
