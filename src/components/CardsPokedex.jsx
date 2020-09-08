import React, { useState, useEffect } from 'react'

const CardsPokedex =()=>{

    const [Pokemones, setPokemones] = useState([])
    const [allPokemons, setAllPokemons] = useState([])
    const [load, setLoad] = useState('true');
    const Url ="https://pokeapi.co/api/v2/pokemon?limit=25"

    const arr=[]

    useEffect(() => {
        fetch(Url)
        .then((response) => response.json())
        .then((data) => setPokemones(
        data.results.forEach(item => {
        fetch(item.url)
        .then(response => response.json())
        .then(allpokemon => arr.push(allpokemon));
        setAllPokemons(arr);
        
      }),
      ));
      }, []);

      setTimeout(() => {
        setLoad(false);
        console.log(allPokemons)
      }, 1000);
   
      
    

    return (
        <div className="App">
       <div className='pokegallery'>

        { load ? (
          <p>Loading...</p>
        ) : (

          allPokemons.map((img, i) => (
            <div id={img.id} key={i}>

              <div className='card' style={{ width: '10rem', height: '15rem', backgroundColor: '#F0F0C9' }}>
                <img  src={img.sprites.front_default} alt='pokemon' />
                <div >
                  <h5 >{img.name}</h5>
                  <h6>type: {img.types[0].type.name}</h6>
                </div>
              </div>


            </div>
          ))
        )}



</div>
    </div>
    )

}


export default CardsPokedex;