# WENS - News Aggregator

## Setup Instructions

### Python Backend Setup
1. Navigate to the backend/python directory:
   ```bash
   cd backend/python
   ```

2. Create virtual environment:
   ```bash
   python -m venv news_env
   ```

3. Activate virtual environment:
   - Windows (Command Prompt): `news_env\Scripts\activate.bat`
   - Windows (PowerShell): `news_env\Scripts\Activate.ps1`
   - Linux/Mac: `source news_env/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

#### Option 1: Use npm scripts
- **General**: `npm run backend`
- **Windows (Command Prompt)**: `npm run backend:win`
- **Windows (PowerShell)**: `npm run backend:ps`
- **Linux/Mac**: `npm run backend:unix`

#### Option 2: Use the provided scripts directly
- **Command Prompt**: Run `start_server.bat` from the project root
- **PowerShell**: Run `start_server.ps1` from the project root
- **Linux/Mac**: Run `start_server.sh` from the project root

#### Option 3: Manual startup
1. Navigate to backend/python
2. Activate virtual environment
3. Run: `uvicorn main:app --reload`

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `backend/python/` - FastAPI backend
- `frontend/` - React frontend
- `start_server.bat` - Windows batch script to start backend
- `start_server.ps1` - PowerShell script to start backend
- `start_server.sh` - Bash script to start backend (Linux/Mac)
