from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from news import news_aggregator

app = FastAPI(
    title="News API",
    description="RSS News Aggregator API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeedRequest(BaseModel):
    name: str
    url: str

@app.get("/news")
def get_news():
    """Get all news from configured RSS feeds"""
    try:
        news_aggregator.fetch_all_news()
        return news_aggregator.get_news_as_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching news: {str(e)}")

@app.get("/feeds")
def get_feeds():
    """Get all configured RSS feeds"""
    try:
        return news_aggregator.get_feeds()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting feeds: {str(e)}")

@app.post("/feeds")
def add_feed(feed: FeedRequest):
    """Add a new RSS feed"""
    try:
        success = news_aggregator.add_custom_feed(feed.name, feed.url)
        if success:
            # Automatikusan frissítjük a híreket
            news_aggregator.fetch_all_news()
            return {
                "message": f"Feed '{feed.name}' added successfully",
                "news_count": len(news_aggregator.news_list)
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to add feed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding feed: {str(e)}")

@app.delete("/feeds/{feed_name}")
def remove_feed(feed_name: str):
    """Remove an RSS feed"""
    try:
        success = news_aggregator.remove_feed(feed_name)
        if success:
            news_aggregator.fetch_all_news()
            return {
                "message": f"Feed '{feed_name}' removed successfully",
                "news_count": len(news_aggregator.news_list)
            }
        else:
            raise HTTPException(status_code=404, detail="Feed not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error removing feed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)