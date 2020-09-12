import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom";
import '../css/Info.css'

const InfoPokemones=(props) =>{

    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [Pokemones, setPokemones] = useState([]);
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    useEffect(() => {
        async function obtenerPokemonesIniciales() {
            let pokens = await obtenerPokemones()
            setPokemones(pokens)
            
        }
        obtenerPokemonesIniciales()
    }, [])

    const obtenerPokemones = async () => {
        
        let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let pokemones = await respuesta.json()
        return pokemones
    }

    console.log(Pokemones)
    return (
        <div className="container-modal">
            <div className="container-info">
                <div><b>ID: </b>{Pokemones.id}</div>
                <div><b>Nombre: </b>{Pokemones.name}</div>
                <div><img style={{ width: "150px", height: "150px" }} src={fullImageUrl} alt="pokemon"></img></div>
                <div className="info">
                    <div><b>Estatura: </b>{Pokemones.height}</div>
                    <div><b>Peso: </b>{Pokemones.weight}</div>
                    <div><b>Abilidades: </b>
                        {Pokemones.abilities?.map((datos,i)=> {return (<ul key={i}><li>{datos.ability.name}</li></ul>)})}
                    </div>
                </div>
                
                <Link to={`/`} ><button className="button-back">Back</button></Link>
                
                
                
            </div>
        </div>
    )
}

export default InfoPokemones