import React from "react";
import { useState } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=81c6884b55184bebaa2120104231703&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data)
        setWeatherForecast(data);
      });
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
              Previsão do Tempo
        </a>
      </nav>
      <main className="container">
        <div className="jumbotron">
          <h1>Verifique a previsão do tempo</h1>
          <p className="lead">Digite o nome da cidade no campo abaixo</p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                className="form-control"
                onChange={handleChange}
                value={city}
              />
            </div>
          </div>
          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>
          {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src= {weatherForecast.current.condition.icon}/>
                </div>
                <div>
                  <h3>
                    Hoje o dia esta: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c} ºC
                  </p>
                  <p className="lead">
                    Umidade do ar: {weatherForecast.current.humidity}%
                  </p>
                  <p className="lead">
                    Sensação térmica: {weatherForecast.current.feelslike_c} ºC
                  </p>
                  <p className="lead">
                    País: {weatherForecast.location.country}
                  </p>
                  <p className="lead">
                    Estado: {weatherForecast.location.region}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;

