from pydantic import BaseModel
import json
from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import openai
from dotenv import load_dotenv
import uvicorn
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
product_info = {
    "Áo thun nam oversize": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu trắng ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },
    "Áo thun nam oversize ver2": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu nâu ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },
    "Áo thun nam oversize ver3": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu hồng ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },
    "Áo thun nam oversize ver4": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu xám ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },
    "Áo thun nam oversize ver5": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu xanh lam ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },
    "Áo thun nam oversize ver6 ": {
        "name": "Áo thun nam",
        "description": "Áo thun nam mặc mùa hè màu vàng ",
        "size_chart": "Bảng size: S :1m55-1m65 <50kg, M: 1m65-1m75 50-60kg L:>1m75 >60kg ",
    },

}

# Lời nhắc có sẵn (prompt) sẽ bao gồm thông tin sản phẩm và bảng size
content_system = "Chào mừng bạn đến với cửa hàng quần áo. Dưới đây là thông tin về một số sản phẩm:\n"

for product_key, product in product_info.items():
    content_system += f"- {product['name']}: {product['description']} \n size: {product['size_chart']}"


content_system += "\nNếu bạn quan tâm đến vấn đề gì hãy cứ hỏi tôi."


app = FastAPI(
    title="API",
    description="AI",
    version="1.0",
    docs_url='/docs',
    # This line solved my issue, in my case it was a lambda function
    openapi_url='/openapi.json',
    redoc_url='/redoc'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/mail-translation-model')
def get_service():
    return 'mail-translation-model'


class TextBody(BaseModel):
    text: str


@app.post("/translate")
def translate(info: TextBody):

    print(str)
    history_chat = [
        {"role": "system", "content": content_system},
    ]
    history_chat.append({"role": "user", "content": info.text})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=history_chat
    )
    result = completion.choices[0].message['content']
    return result


@app.get("/question")
def question(text: str):
    print(content_system)
    history_chat = [
        {"role": "system", "content": content_system},
        {"role": "user", "content": text},
    ]
    temperature = 1.0
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=history_chat,
        temperature=temperature
    )

    result = completion.choices[0].message['content']
    data = {
        "message": result,
        "result": "success"
    }
    return JSONResponse(status_code=200, content=data)


if __name__ == "__main__":
    uvicorn.run(app)


# info = input()
# print(translate(info))
