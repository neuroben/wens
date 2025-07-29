import feedparser
import time

class PortalFeed:
    def __init__(self, name, feed_url):
        self.name = name
        self.feed_url = feed_url

    def __str__(self):
        return f"{self.name}"

    def returnNews(name,feed_url):
        return feedparser.parse(feed_url)

class News:
    def __init__(self, title, link, pubDate, pubTime, pubDateTime, author, category, description, imgLink, source):
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

    def __str__(self):
        return self.title


if __name__ == "__main__":
    1+1


def feedInput(feedName, feedUrl):
    feed = PortalFeed.returnNews(feedName, feedUrl)
    return 0

telexFeed = PortalFeed.returnNews("Telex", "https://telex.hu/rss/archivum?filters=%7B%22parentId%22%3A%5B%22null%22%5D%7D&perPage=5")
#bbcFeed = PortalFeed.returnNews("BBC", "https://feeds.bbci.co.uk/news/rss.xml?edition=uk")
#guradianUKFeed = PortalFeed.returnNews("GuardianUK", "https://www.theguardian.com/uk/rss")
news_list = []

def appendNews(feed, source_name):
    for entry in feed:
        title = entry.get('title')
        link = entry.get('link')
        t = entry.get('published_parsed')
        if t:
            pubDate = time.strftime("%Y-%m-%d", t)
            pubTime = time.strftime("%H:%M:%S", t)
            pubDateTime = time.strftime("%Y-%m-%d %H:%M:%S", t)
        else:
            pubDateTime = "Nincs dátum & idő"
        author = entry.get('author')
        category = entry.get('category')
        description = entry.get('description')
        imgLink = ""
        enclosures = entry.get('enclosures', [])
        if enclosures and 'url' in enclosures[0]:
            imgLink = enclosures[0]['url']
        elif 'media_thumbnail' in entry:
            imgLink = entry['media_thumbnail'][0].get('url', 'missing')
        elif 'media_content' in entry and entry['media_content']:
            media_contents = entry['media_content']
            largest_width = 0
            for media in media_contents:
                if 'url' in media:
                    width = int(media.get('width', 0))
                    if width > largest_width:
                        largest_width = width
                        imgLink = media['url']
            if not imgLink:
                imgLink = media_contents[0].get('url', 'missing')
        else:
            imgLink = "missing"

        news = News(title, link, pubDate, pubTime, pubDateTime, author, category, description, imgLink, source_name)
        news_list.append(news)

appendNews(telexFeed.entries, "Telex")
#appendNews(bbcFeed.entries, "BBC")
#appendNews(guradianUKFeed.entries, "Guradian")

def fetchnews():
    return news_list

# for n in news_list:
#     print("=" * 80)
#     print(f"Forrás: {n.source}")
#     print(f"Cím: {n.title}")
#     print(f"Link: {n.link}")
#     print(f"Dátum: {n.pubDate}")
#     print(f"Idő: {n.pubTime}")
#     print(f"Teljes dátum és idő: {n.pubDateTime}")
#     print(f"Szerző: {n.author if n.author else 'Nincs megadva'}")
#     print(f"Kategória: {n.category if n.category else 'Nincs megadva'}")
#     print(f"Leírás: {n.description if n.description else 'Nincs leírás'}")
#     print(f"Kép URL: {n.imgLink}")
#     print("=" * 80)
#     print()


print(len(news_list))
    


        