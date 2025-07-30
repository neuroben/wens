import "./NewsCard.css";
interface NewsCardProps {
  title?: string;
  date?: string;
  author?: string;
  description?: string;
  link?: string;
  source?: string;
}

function NewsCard(props: NewsCardProps) {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{props.title}</h2>
        <div className="meta">
          <p className="date">{props.date}</p>
          <p className="author">{props.author}</p>
        </div>
        <p className="description">{props.description}</p>
        <div className="row-container">
          <a
            className="link-to-article"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Olvasd tovább
          </a>
          <p className="source">{props.source}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
