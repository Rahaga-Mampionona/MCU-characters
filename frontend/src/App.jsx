import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "./components/CharacterCard";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState({ name: "", realName: "", universe: "", image: "" });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const res = await axios.get("http://localhost:5000/characters");
    setCharacters(res.data);
  };

  const addCharacter = async (e) => {
    e.preventDefault();
    if (!form.name || !form.realName) return;
    await axios.post("http://localhost:5000/characters", form);
    setForm({ name: "", realName: "", universe: "", image: "" });
    fetchCharacters();
  };

  const deleteCharacter = async (id) => {
    await axios.delete(`http://localhost:5000/characters/${id}`);
    fetchCharacters();
  };

  return (
    <div className="app-container">
      <h1>MCU HUB</h1>

      <form className="add-form" onSubmit={addCharacter}>
        <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Nom réel" value={form.realName} onChange={e => setForm({ ...form, realName: e.target.value })} />
        <input placeholder="Univers" value={form.universe} onChange={e => setForm({ ...form, universe: e.target.value })} />
        <input placeholder="URL image" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <button type="submit">Ajouter</button>
      </form>

      <div className="card-grid">
        {characters.map(c => (
          <CharacterCard
            key={c.id}
            name={c.name}
            realName={c.realName}
            universe={c.universe}
            image={c.image}
            onDelete={() => deleteCharacter(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
