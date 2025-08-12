#!/bin/bash
# Activate Python virtual environment and start FastAPI server
cd "$(dirname "$0")/backend/python"
source news_env/Scripts/activate
uvicorn main:app --reload
