import "./NewsCard.css";
import type { NewsCardProps } from "../types/NewsTypes";
import { useNewsCardClick } from "../hooks/useNewsCardClick";

function NewsCard(props: NewsCardProps) {
  const {
    handleCardClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    preventPropagation,
    isHovered,
    hasImage,
  } = useNewsCardClick(props.link, props.imgLink);

  return (
    <div
      className={`card ${hasImage ? "has-image" : ""}`}
      onClick={handleCardClick}
      onMouseDown={handleMouseDown}
      onAuxClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {isHovered && props.imgLink && (
        <div className="card-image-slide-up">
          <img
            src={props.imgLink}
            alt={props.title || "Cikk kép"}
            className="card-slide-image"
            onError={(e) => {
              // Ha nem sikerül betölteni a képet, elrejtjük
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
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
