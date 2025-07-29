from fastapi import FastAPI
from news import fetchnews

app = FastAPI()

@app.get("/")
def read_root():
    return fetchnews()