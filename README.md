# WENS - News Aggregator

A modern, responsive news aggregator application built with React and FastAPI that allows users to dynamically manage RSS feeds and browse news articles with an elegant, dark-themed interface.

## 🚀 Features

### Core Functionality

- **Dynamic RSS Feed Management**: Add and remove RSS feeds on-the-fly
- **Real-time News Aggregation**: Fetch and display news from multiple sources
- **Fast Search**: Quick search across all news content (title, description, author, source)
- **Source Filtering**: Filter news by specific RSS sources
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern, eye-friendly dark interface

### Interactive UI

- **Hover Image Preview**: News articles show preview images with smooth slide-up animations
- **Clean Card Layout**: News articles displayed in responsive grid cards
- **Sidebar Navigation**: Easy access to search and feed management
- **Real-time Updates**: Automatic news refresh and feed management

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS3** with modern animations and responsive design
- **Custom hooks** for state management

### Backend

- **FastAPI** (Python) for REST API
- **RSS Feed Parser** for news aggregation
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
wens/
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main application component
│   │   ├── main.tsx             # Application entry point
│   │   └── types/               # TypeScript type definitions
│   ├── modules/
│   │   ├── NewsCard.tsx         # News article card component
│   │   ├── NewsCard.css         # Card styling and animations
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── SearchBox.tsx        # Search functionality
│   └── utils/
│       ├── searchUtils.ts       # Search and filtering logic
│       ├── feedHistoryUtils.ts  # Feed management utilities
│       └── linkUtils.ts         # URL handling utilities
├── backend/
│   └── python/
│       ├── main.py              # FastAPI server
│       ├── news.py              # News aggregation logic
│       └── news_env/            # Python virtual environment
└── package.json                # Frontend dependencies
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wens
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Set up Python backend**

   ```bash
   cd backend/python
   # Activate virtual environment (if using news_env)
   news_env\Scripts\activate

   # Install Python dependencies
   pip install fastapi uvicorn feedparser
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   # From project root
   npm run backend
   # OR manually:
   cd backend/python && python main.py
   ```

2. **Start the frontend development server**

   ```bash
   # From project root
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (frontend) and `http://localhost:8000` (backend API)

## 📖 API Endpoints

- `GET /news` - Fetch all aggregated news
- `POST /feeds` - Add a new RSS feed
- `DELETE /feeds/{feed_name}` - Remove an RSS feed
- `GET /feeds` - List all configured feeds

## 🎨 Features in Detail

### News Cards

- **Responsive Grid Layout**: Automatically adjusts to screen size
- **Hover Animations**: Smooth image preview with slide-up effect
- **Rich Content**: Displays title, description, author, source, and publication date
- **External Links**: Direct links to original articles

### Search & Filtering

- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Searches across title, description, author, and source
- **Source Filter**: Dropdown to filter by specific news sources

### Feed Management

- **Dynamic Addition**: Add RSS feeds through the sidebar
- **Easy Removal**: Remove feeds with confirmation
- **Persistent Storage**: Feeds are saved and restored on restart

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Development

### Code Style

- **TypeScript** for type safety
- **ESLint** for code quality
- **Clean Code** principles with modular architecture
- **Responsive Design** with CSS Grid and Flexbox

### Key Components

- `NewsCard.tsx` - Individual news article display
- `Sidebar.tsx` - Navigation and feed management
- `SearchBox.tsx` - Search and filtering interface
- `App.tsx` - Main application logic and state management

## 📱 Responsive Design

The application is fully responsive with:

- **Desktop**: Multi-column grid layout with hover effects
- **Tablet**: Adaptive column count
- **Mobile**: Single column with touch-optimized interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **FastAPI** for the excellent Python web framework
- **React** for the powerful frontend library
- **Vite** for lightning-fast development experience
