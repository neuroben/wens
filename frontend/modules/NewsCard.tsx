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
  const handleCardClick = (e: React.MouseEvent) => {
    if (props.link) {
      // Bal gomb vagy középső gomb
      if (e.button === 0 || e.button === 1) {
        window.open(props.link, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Középső gomb (wheel click)
    if (e.button === 1 && props.link) {
      e.preventDefault();
      window.open(props.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="card"
      onClick={handleCardClick}
      onMouseDown={handleMouseDown}
      onAuxClick={handleCardClick} // Jobb gomb és egyéb gombok
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
            onClick={(e) => e.stopPropagation()} // Megakadályozza a dupla megnyitást
            onMouseDown={(e) => e.stopPropagation()} // Középső gomb esetén is
            onAuxClick={(e) => e.stopPropagation()} // Egyéb gombok esetén is
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
