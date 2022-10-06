import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Pokecard from "../Pokecard/Pokecard";
import App from "../../App";
import Login from "../Login/Login";
import Error from "../Error/Error";
import { useState, useEffect } from "react";
import PokeInput from "../PokeInput/PokeInput";

const RoutesApp = () => {
  const [pokeFiltro, setPokeFiltro] = useState([]);
  const [pokeFetch, setPokeFetch] = useState([]);
  const [numberOfPokemon, setNumberOfPokemon] = useState("");

  //Estado para que la pokebola aparezca y desaparezca

  const [pokebolaAppears, setPokebolaAppears] = useState(false);

  const token = localStorage.getItem("token");
  const getpokemones = async () => {
    setPokebolaAppears(true);
    const allpokemones = await axios(
      "http://localhost:3000/pokemones/obtener",
      {
        headers: {
          "auth-token": token,
        },
      }
    ).then((res) => res.data);
    setPokeFiltro(allpokemones.data);
    setPokeFetch(allpokemones.data);
    setNumberOfPokemon(allpokemones.data.length);
    setTimeout(() => {
      setPokebolaAppears(false);
    }, 1000);
  };

  useEffect(() => {
    getpokemones();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              pokebolaAppears={pokebolaAppears}
              setPokebolaAppears={setPokebolaAppears}
            />
          }
        />
        <Route
          path="/main"
          element={
            <App
              pokeFiltro={pokeFiltro}
              setPokeFiltro={setPokeFiltro}
              pokeFetch={pokeFetch}
              setPokeFetch={setPokeFetch}
              pokebolaAppears={pokebolaAppears}
              numberOfPokemon={numberOfPokemon}
            />
          }
        />
        <Route
          path="Pokecard/PokeInput"
          element={<PokeInput numberOfPokemon={numberOfPokemon} />}
        ></Route>
        <Route
          path="/Pokecard/:nombre"
          element={
            <Pokecard
              pokemones={pokeFiltro}
              pokeFetch={pokeFetch}
              setPokeFiltro={setPokeFiltro}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default RoutesApp;
