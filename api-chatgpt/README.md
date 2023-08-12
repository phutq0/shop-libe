
# README

This is an API service built with FastAPI that utilizes OpenAI's GPT-3 model to extract real estate information from text descriptions and return it in JSON format.

## Getting Started

To use this API service, you'll need an OpenAI API key, which you can obtain from the [OpenAI website](https://beta.openai.com/signup/). Once you have your API key, create a file named `.env` in the root directory of this project and add your API key as follows:
``````
OPENAI_API_KEY=<your_api_key_here>
``````
Then, install the necessary packages by running the command:
``````
pip install -r requirements.txt
``````
You can then start the API service by running the command:
``````
uvicorn main:app --reload
``````
The API service will be available at `http://localhost:8000/`.


