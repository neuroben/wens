import feedparser
import time
import re

class News:
    def __init__(self, title=None, link=None, pubDate=None, pubTime=None, 
                 pubDateTime=None, author=None, category=None, description=None, 
                 imgLink=None, source=None):
        self.title = title
        self.link = link
        self.pubDate = pubDate
        self.pubTime = pubTime
        self.pubDateTime = pubDateTime
        self.author = author
        self.category = category
        self.description = description
        self.imgLink = imgLink
        self.source = source

    def to_dict(self):
        return {
            "title": self.title,
            "link": self.link,
            "pubDate": self.pubDate,
            "pubTime": self.pubTime,
            "pubDateTime": self.pubDateTime,
            "author": self.author,
            "category": self.category,
            "description": self.description,
            "imgLink": self.imgLink,
            "source": self.source
        }

class NewsAggregator:
    def __init__(self):
        self.news_list = []
        self.feeds = {}

    def parse_feed(self, feed_url):
        return feedparser.parse(feed_url)

    def clean_description(self, description):
        if not description:
            return ""
    
        clean_text = re.sub(r'<[^>]+>', '', description)
        
        clean_text = ' '.join(clean_text.split())
        
        if len(clean_text) > 256:
            clean_text = clean_text[:253] + "..."
        
        return clean_text

    def extract_image_url(self, entry):
        enclosures = entry.get('enclosures', [])
        if enclosures and isinstance(enclosures[0], dict) and 'url' in enclosures[0]:
            return enclosures[0]['url']
        
        if 'media_thumbnail' in entry and entry['media_thumbnail']:
            return entry['media_thumbnail'][0].get('url', 'missing')
        
        if 'media_content' in entry and entry['media_content']:
            media_contents = entry['media_content']
            largest_width = 0
            best_url = ""
            
            for media in media_contents:
                if 'url' in media:
                    width = int(media.get('width', 0))
                    if width > largest_width:
                        largest_width = width
                        best_url = media['url']
            
            return best_url if best_url else media_contents[0].get('url', 'missing')
        
        return "missing"

    def process_entry(self, entry, source_name):
        title = entry.get('title')
        link = entry.get('link')
        
        t = entry.get('published_parsed')
        if t:
            pubDate = time.strftime("%Y-%m-%d", t)
            pubTime = time.strftime("%H:%M:%S", t)
            pubDateTime = time.strftime("%Y-%m-%d %H:%M:%S", t)
        else:
            pubDate = pubTime = pubDateTime = "Nincs dátum & idő"
        
        author = entry.get('author')
        category = entry.get('category')
        description = self.clean_description(entry.get('description', ''))
        imgLink = self.extract_image_url(entry)
        
        return News(
            title=title,
            link=link,
            pubDate=pubDate,
            pubTime=pubTime,
            pubDateTime=pubDateTime,
            author=author,
            category=category,
            description=description,
            imgLink=imgLink,
            source=source_name
        )

    def fetch_all_news(self):
        self.news_list.clear()
        
        for source_name, feed_url in self.feeds.items():
            feed = self.parse_feed(feed_url)
            if not feed or not hasattr(feed, 'entries'):
                continue
            
            for entry in feed.entries:
                news = self.process_entry(entry, source_name)
                self.news_list.append(news)
        
        return self.news_list

    def get_news_as_dict(self):
        return [news.to_dict() for news in self.news_list]

    def add_custom_feed(self, name, url):
        self.feeds[name] = url
        return True

    def remove_feed(self, name):
        if name in self.feeds:
            del self.feeds[name]
            return True
        return False

    def get_feeds(self):
        return self.feeds.copy()

news_aggregator = NewsAggregator()