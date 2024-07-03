import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState()
  const [name, setName] = useState()
  const [weight, setWeight] = useState()
  const [attack, setAttack] = useState()
  const [defense, setDefense] = useState()
  const [number, setNumber] = useState(1)


  URL = `https://pokeapi.co/api/v2/pokemon/${number}`

  useEffect(() => {
    axios
    .get(URL)
    .then((response) => {
      console.log(response)
      setData(response.data);
      setName(response.data.name);
      setWeight(response.data.weight);
      setAttack(response.data.stats[1].base_stat);
      setDefense(response.data.stats[2].base_stat);
      setWeight(response.data.weight);
      console.log(response.data.stats.defense)
    }).catch((err) => {
      window.alert(err);
    })
  }, [URL])


  return (
    <div className="container App">
      <div className='container-fluid'>
        <h1>Pokedex v2.0</h1>
        
        <div className="container input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Digite o numero</span>
          </div>
          <input type={'number'} className="form-control" min="1" max="157" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e) => (setNumber(e.target.value))}></input>
          {/* <div className="input-group-append">
            <button className='btn btn-primary'>Mostrar</button>
          </div> */}
        </div>
        
        <div className="card mb-3">
          <img src={data?data.sprites.other.dream_world.front_default:"<p>Loading</p>"} className="card-img-top mx-auto text-center" alt="pokemon" />
          <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <h3 className="card-title">{weight}kg</h3>
              <p className="card-text">Suas principais habilidades são: 
                {data ? data.abilities.map((value, key) => {
                return (
                  <div key={key}>
                    {value.ability.name}
                  </div>
                )
                }): "Teste"}
              </p>
              <hr></hr>
              <div className='row'>
                <div className='col-sm-6'>
                  <h6 className="card-subtitle mb-2 text-muted">ATQ: {attack}</h6>
                </div>
                <div className='col-sm-6'>
                  <h6 className="card-subtitle mb-2 text-muted">DEF: {defense}</h6>
                </div>
              </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
