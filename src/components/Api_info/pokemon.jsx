import React, { useState } from "react";
import "./Pokemon.css";

const Pokemon = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");

      const data = await response.json();
      setPokemon(data);
      setError("");
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input className="tte"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit"><b /></button>
      </form>

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="pokemon-card">
          <div className="container2">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>Tipo: {pokemon.types.map(t => t.type.name).join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;

