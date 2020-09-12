import React from 'react';
import CardsPokedex from './components/CardsPokedex'
import InfoPokemones from './components/InfoPokemones'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact  path="/:id" render={(props)=> <InfoPokemones {...props}/>}></Route>
          <Route exact path="/">
            <CardsPokedex   />
          </Route>
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
