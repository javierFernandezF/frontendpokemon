import { useState } from "react";
import "./botonAbc.css"

const BotonAbc = ({setPokeFiltro, pokemones, pokeData}) => {
    const [order, setOrder] = useState(true)
    const pokeOrden = () => {
        if (order === true){
        let alfaArray = [...pokemones].sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        setPokeFiltro(alfaArray);
        setOrder(false)
    } else if (order === false){
        let alfaArray = [...pokemones].sort(function (a, b) {
            if (a.id < b.id) { return -1; }
            if (a.id > b.id) { return 1; }
            return 0;
        })
        setPokeFiltro(alfaArray)
        setOrder(true)
    }}
    return ( 
        <button onClick={pokeOrden} className="nav-button">{order?
        <div>
        <img className="nav-button-az" src ='./img/unknown.png'/>
        <img src="./img/Arrow.svg" alt="arrow"/>
        </div>: 
         <div>
         <img className="nav-button-tateti" src ='./img/numeral.png'/>
         <img src="./img/Arrow.svg" alt="arrow"/>
         </div>}
        </button>
    )
}

export default BotonAbc;