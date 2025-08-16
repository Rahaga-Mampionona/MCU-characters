import "./CharacterCard.css";

export default function CharacterCard({ name, realName, universe, image, onDelete }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image || "https://via.placeholder.com/300x200.png?text=MCU"} alt={name} />
        <div className="overlay"></div>
      </div>
      <div className="card-content">
        <h2>{name}</h2>
        <p className="real-name">{realName}</p>
        <p className="universe">{universe}</p>
        {onDelete && <button onClick={onDelete}>Supprimer</button>}
      </div>
    </div>
  );
}
