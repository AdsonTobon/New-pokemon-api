import React, { useState, useEffect } from "react";
import TypeColors from "../services/TypeColors";
import "../css/Cards.css";
import ImgPokemon from '../img/pokemon.png';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';



const CardsPokedex = () => {
  const [Pokemones, setPokemones] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [load, setLoad] = useState("true");
  const [loading, setLoading] = useState(false);
  const [Abierto, setAbierto] = useState(false)
  
  const Url = "https://pokeapi.co/api/v2/pokemon?limit=25";

  const arr = [];

  useEffect(() => {
    function obtenerPrimeroPokemones(){
      let pokens = obtenerPokemones()
      setAllPokemons(pokens)
      setLoading(false);
    }
    obtenerPrimeroPokemones()
  }, []);

  

 const obtenerPokemones =() =>{
  setLoading(true);
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
  )

 }


  const filtrarPokemones= (e)=>{
    let pokemones = obtenerPokemones()
    let filtro = document.querySelector('#filtro').value.toLowerCase();
    let resultado = pokemones.filter(function(poke){
      let tituloMin = poke.name.toLowerCase();
      return tituloMin.indexOf(filtro) >=0 
    })
    setAllPokemons(resultado)
    setLoading(false)
  }

 const abrirModal=()=>{
    setAbierto(!Abierto)
  }

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
              // onKeyUp={filtrarPokemones}
            />
            {loading===true?<span>Loading....</span>:""}  
          </div>
          
         
        </header>
      </div>

      <div className="container-principal-cards"> 
      <div className="container-cards">
        {load ? (
          <p>Loading...</p>
        ) : (
          allPokemons.map((datos, i) => {
            return (
              <div key={datos.id} id={datos.id} className="cards">
                <div>
                  <img src={datos.sprites.front_default} alt="pokemon"></img>{" "}
                </div>
                <div>{datos.id}</div>
                <div>{datos.name.toUpperCase()}</div>
                <div>
                  {datos.types.map((data, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: TypeColors[data.type.name] }}
                    >
                      {data.type.name}
                    </div>
                  ))}
                </div>
                <div>
                    <Button color="success" onClick={abrirModal} >{datos.name}</Button>
                </div>
                <div>
                    <Modal isOpen={Abierto}>
                      <ModalHeader>
                        Informacion Pokemon
                      </ModalHeader>
                      <ModalBody>
                      <img src={datos.sprites.front_default} alt="pokemon"></img>
                      <div>{datos.name}</div>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="danger" onClick={abrirModal}>Cerrar</Button>
                      </ModalFooter>
                    </Modal>
          </div>
              </div>
            );
          })
        )}
      </div>
      
                
      </div>
      
    </div>
  );
};

export default CardsPokedex;
