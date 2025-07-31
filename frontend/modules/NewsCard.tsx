import "./NewsCard.css";
import type { NewsCardProps } from "../types/NewsTypes";
import { useNewsCardClick } from "../hooks/useNewsCardClick";

function NewsCard(props: NewsCardProps) {
  const { handleCardClick, handleMouseDown, preventPropagation } =
    useNewsCardClick(props.link);

  return (
    <div
      className="card"
      onClick={handleCardClick}
      onMouseDown={handleMouseDown}
      onAuxClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
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
            onClick={preventPropagation}
            onMouseDown={preventPropagation}
            onAuxClick={preventPropagation}
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
