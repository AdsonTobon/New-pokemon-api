import React, { useState, useEffect } from "react";
import TypeColors from "../services/TypeColors";
import "../css/Cards.css";
import ImgPokemon from "../img/pokemon.png";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const CardsPokedex = () => {
  const [Pokemones, setPokemones] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [load, setLoad] = useState("true");
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const Url = "https://pokeapi.co/api/v2/pokemon?limit=25";

  const arr = [];
  console.log(arr)

  useEffect(() => {
    obtenerPokemones()
    
  }, []);

  const obtenerPokemones = () => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) =>
        setPokemones(
          data.results.forEach((item) => {
            fetch(item.url)
              .then((response) => response.json())
              .then((allpokemon) => arr.push(allpokemon));
            setAllPokemons(arr);
            
          })
        )
      );
  };

  setTimeout(() => {
    setLoad(false);
  }, 1000);

  return (
    <div className="container-principal">
      <div className="container-search">
        <header>
          <div>
            <h1>Pokemon-Api</h1>
            <img className="img-pokemon" src={ImgPokemon} alt="" />
          </div>
          <div>
            <input
              id="filtro"
              className="button-search"
              type="text"
              placeholder="search to pokemon"
              onChange={handleSearchChange}
            />
          </div>
        </header>
      </div>

      <div className="container-principal-cards">
        <div className="container-cards">
          {load ? (
            <p>Loading...</p>
          ) : (
            allPokemons.map(
              (datos, i) =>
                datos.name.includes(filter) && (
                  <div key={i} className="cards">
                    <div>
                      <img
                        src={datos.sprites.front_default}
                        alt="pokemon"
                      ></img>
                    </div>
                    <div>{datos.id}</div>
                    <div>{datos.name.toUpperCase()}</div>

                    <div>
                      {datos.types.map((data, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: TypeColors[data.type.name],
                          }}
                        >
                          {data.type.name}
                        </div>
                      ))}
                    </div>

                    <Link to={`/${datos.id}`}>
                      <button className="button-info">Mas Información</button>{" "}
                    </Link>
                  </div>
                )
            )
          )}
        </div>
      </div>
      <footer className="footer">
            <b> <span className="create">Create by:</span></b>   2020 | Camilo Castañeda | Anderson Tobon 
          </footer>
    </div>
  );
};

export default CardsPokedex;
