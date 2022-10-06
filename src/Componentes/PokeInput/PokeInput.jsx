import "../PokeInput/PokeInput.css";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PokeInput = ({ numberOfPokemon }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [movimiento1, setMovimiento1] = useState("");
  const [movimiento2, setMovimiento2] = useState("");
  const [peso, setPeso] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(numberOfPokemon + 1);
  const [altura, setAltura] = useState("");

  const [imagen, setImagen] = useState("");
  const [mostrarImagen, setMostrarImagen] = useState(false);

  const onClickMostrarImagen = () => setMostrarImagen(true);
  const onClickVolverACargar = () => setMostrarImagen(false);

  const inputName = (e) => setName(e.target.value);
  const inputMovimiento1 = (e) => setMovimiento1(e.target.value);
  const inputMovimiento2 = (e) => setMovimiento2(e.target.value);
  const inputPeso = (e) => setPeso(e.target.value);
  const inputDescription = (e) => setDescription(e.target.value);
  // const inputNumber = (e) => setNumber(e.target.value);
  const inputAltura = (e) => setAltura(e.target.value);
  const inputImagen = (e) => setImagen(e.target.value);

  //Estado para que la pokebola aparezca y desaparezca

  const [pokebolaAppears, setPokebolaAppears] = useState(false);

  //type1 y type2 corresponden a los valores de bckcolor1 y bckcolor2 respectivamente

  const [type1, setType1] = useState("grey");
  const [type2, setType2] = useState("grey");

  //tipo1 y tipo2 corresponden a los valores de tipo de pokemon

  const [tipo1, setTipo1] = useState("");
  const [tipo2, setTipo2] = useState("");

  const [hp, setHp] = useState();
  const [atk, setAtk] = useState();
  const [def, setDef] = useState();
  const [spatk, setSpatk] = useState();
  const [spdef, setSpdef] = useState();
  const [spd, setSpd] = useState();

  //Estados que sirven para insertar el error que viene del back en el front

  const [datosIncompletos, setDatosIncompletos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputHp = (e) => setHp(e.target.value);
  const inputAtk = (e) => setAtk(e.target.value);
  const inputDef = (e) => setDef(e.target.value);
  const inputSpatk = (e) => setSpatk(e.target.value);
  const inputSpdef = (e) => setSpdef(e.target.value);
  const inputSpd = (e) => setSpd(e.target.value);

  // const verificarContenidoDeInput = () => {
  //   if (
  //     name != "" &&
  //     movimiento1 != "" &&
  //     movimiento2 != " " &&
  //     peso != "" &&
  //     description != "" &&
  //     number != "" &&
  //     altura != "" &&
  //     imagen != "" &&
  //     type1 != "" &&
  //     hp != "" &&
  //     atk != "" &&
  //     def != "" &&
  //     spatk != "" &&
  //     spdef != "" &&
  //     spd != ""
  //   ) {
  //     cargarPokemon();
  //     setDatosIncompletos(false);
  //   } else {
  //     setDatosIncompletos(true);
  //   }
  // };
  const cargarPokemon = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/pokemones/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          idpokemon: number,
          name: name,
          img: imagen,
          type: tipo1,
          type2: tipo2,
          weight: peso,
          height: altura,
          description: description,
          hp: hp,
          atk: atk,
          def: def,
          satk: spatk,
          sdef: spdef,
          spd: spd,
          bckcolor: type1,
          bckcolor2: type2,
          move1: movimiento1,
          move2: movimiento2,
        }),
      });

      const auth = await respuesta.json();

      console.log(auth);
      setPokebolaAppears(true);

      setTimeout(() => {
        setPokebolaAppears(false);
        console.log("Esto se esta ejecutando");
      }, 1500);

      if (!auth.success) {
        setErrorMessage(auth.message);
        return;
      }

      navigate("/main");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const bgc = [
    { name: "rock", color: "#869E31" },
    { name: "ghost", color: "#70559B" },
    { name: "steel", color: "#8789D0" },
    { name: "water", color: "#6493EB" },
    { name: "grass", color: "#74CB4B" },
    { name: "psychic", color: "#FB5584" },
    { name: "ice", color: "#9AD6DF" },
    { name: "dark", color: "#75574C" },
    { name: "fairy", color: "#E69EAC" },
    { name: "normal", color: "#AAA67F" },
    { name: "fighting", color: "#C12239" },
    { name: "flying", color: "#A891EC" },
    { name: "poison", color: "#A43E9E" },
    { name: "ground", color: "#DEC16B" },
    { name: "bug", color: "#A78723" },
    { name: "fire", color: "#F57D31" },
    { name: "electric", color: "#F9CF30" },
    { name: "dragon", color: "#7037FF" },
  ];
  const firstType = (e) => {
    const type = bgc.find((type) => type.name === e.target.value);
    setType1(type.color);
    setTipo1(type.name);
  };
  const secondType = (e) => {
    const type = bgc.find((type) => type.name === e.target.value);
    setType2(type.color);
    setTipo2(type.name);
  };

  const volverAlMain = () => {
    navigate("/main");
  };

  return (
    <div className="container" style={{ background: type1 }}>
      {pokebolaAppears ? (
        <div class="wrapper">
          <div class="pokeball"></div>
        </div>
      ) : null}

      <div className="cargarPoke">
        <button onClick={cargarPokemon} className="CargarPokemon">
          Cargar Pokemon
        </button>
      </div>
      {errorMessage ? <div className="faltanDatos">{errorMessage}</div> : null}
      <div className="main">
        <nav>
          <div>
            <div className="linkImg" onClick={volverAlMain}>
              <img className="flechaImg" src="../img/arrowicon.png" alt="1" />
            </div>
            <h1>
              <input onChange={inputName} className="inputName"></input>
            </h1>
          </div>
          <p>
            <div className="inputNumber">#{number}</div>
          </p>
        </nav>
        <div className="pokebola">
          <img src="../img/pokebola-blanca.png" />
        </div>
        {!mostrarImagen ? (
          <div className="espacio">
            <input className="espacio2" onChange={inputImagen}></input>
            <button
              style={{ background: type1 }}
              className="botonDeLaImg"
              onClick={onClickMostrarImagen}
            >
              Mostar Imagen
            </button>
          </div>
        ) : (
          <>
            <div className="pokemon">
              <img className="pokemonimg" src={imagen} />
            </div>
            <div className="Cualquiera">
              <button
                className="botonDeImg"
                onClick={onClickVolverACargar}
                style={{ background: type1 }}
              >
                Volver a cargar
              </button>
            </div>
          </>
        )}
        <div className="info">
          <div className="pokemontype">
            <p style={{ background: type1 }}>
              <select onChange={firstType} style={{ background: type1 }}>
                <option value=""></option>
                <option value="rock"> Rock</option>
                <option value="ghost"> Ghost</option>
                <option value="steel"> Steel</option>
                <option value="water"> Water</option>
                <option value="grass"> Grass</option>
                <option value="psychic"> Psychic</option>
                <option value="ice"> Ice</option>
                <option value="dark"> Dark</option>
                <option value="fairy"> Fairy</option>
                <option value="normal"> Normal</option>
                <option value="fighting"> Fighting</option>
                <option value="flying"> Flying</option>
                <option value="poison"> Poison</option>
                <option value="ground"> Ground</option>
                <option value="bug"> Bug</option>
                <option value="fire"> Fire</option>
                <option value="electric"> Electric</option>
                <option value="dragon"> Dragon</option>
              </select>
            </p>

            <p style={{ background: type2 }}>
              <select onChange={secondType} style={{ background: type2 }}>
                <option value=""></option>
                <option value="rock"> Rock</option>
                <option value="ghost"> Ghost</option>
                <option value="steel"> Steel</option>
                <option value="water"> Water</option>
                <option value="grass"> Grass</option>
                <option value="psychic"> Psychic</option>
                <option value="ice"> Ice</option>
                <option value="dark"> Dark</option>
                <option value="fairy"> Fairy</option>
                <option value="normal"> Normal</option>
                <option value="fighting"> Fighting</option>
                <option value="flying"> Flying</option>
                <option value="poison"> Poison</option>
                <option value="ground"> Ground</option>
                <option value="bug"> Bug</option>
                <option value="fire"> Fire</option>
                <option value="electric"> Electric</option>
                <option value="dragon"> Dragon</option>
              </select>
            </p>
          </div>
          <h2 className="pokemoninfo" style={{ color: type1 }}>
            Info
          </h2>
          <div className="properties">
            <div className="properties-container">
              <div className="properties-one">
                <img src="../img/Weight.svg" />
                <p>
                  <input onChange={inputPeso}></input>
                </p>
              </div>
              <p className="properties-p">Peso</p>
            </div>
            <div className="properties-container properties-container-center">
              <div className="properties-two">
                <img src="../img/Height.svg" />
                <p>
                  <input onChange={inputAltura}></input>
                </p>
              </div>
              <p className="properties-p">Altura</p>
            </div>
            <div className="properties-three properties-container">
              <p className="pokemon-moves">
                <input onChange={inputMovimiento1} className="moves"></input>
              </p>
              <p className="pokemon-moves">
                <input onChange={inputMovimiento2} className="moves"></input>
              </p>
              <p className="properties-p">Movimientos</p>
            </div>
          </div>
          <p className="pokemon-description">
            <input
              onChange={inputDescription}
              className="inputDescription"
              placeholder="Escribir descripcion del pokemon.."
            ></input>
          </p>
          <h2 className="pokemoninfo" style={{ color: type1 }}>
            Estadísticas base
          </h2>
          <div className="progress">
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                HP
              </div>
              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputHp}
                ></input>
              </div>
              <ProgressBar
                maxCompleted={200}
                completed={hp}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                ATK
              </div>
              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputAtk}
                ></input>
              </div>
              <ProgressBar
                maxCompleted={200}
                completed={atk}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                DEF
              </div>
              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputDef}
                ></input>
              </div>
              <ProgressBar
                maxCompleted={200}
                completed={def}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                SPATK
              </div>

              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputSpatk}
                ></input>
              </div>
              <ProgressBar
                maxCompleted={200}
                completed={spatk}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                SPDEF
              </div>
              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputSpdef}
                ></input>
              </div>
              <ProgressBar
                maxCompleted={200}
                completed={spdef}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
            <div className="progress-item">
              <div className="progress-item-string" style={{ color: type1 }}>
                SPD
              </div>
              <div className="progress-item-props">
                <input
                  style={{ color: type1, borderColor: type1 }}
                  onChange={inputSpd}
                ></input>
              </div>

              <ProgressBar
                maxCompleted={200}
                completed={spd}
                bgColor={type1}
                height={5}
                labelSize={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeInput;
