#!/usr/local/bin/python

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import base64
import rfadapter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChangeClothesRequest(BaseModel):
    image: str
    prompt: str

@app.post("/api/changeclothes")
async def change_clothes(request: ChangeClothesRequest):
    result_image = rfadapter.infer(request.image, request.prompt)
    result_base64 = f"data:image/jpeg;base64,{base64.b64encode(result_image).decode('utf-8')}"
    return {"result_image": result_base64}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
