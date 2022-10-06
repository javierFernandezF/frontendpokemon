import "./Nav.css"
import BotonAbc from "../BotonAbc/BotonAbc"

const Nav = ({setPokeFiltro, pokemones, pokeData}) => {
    return (
        <div className="nav-container">
            <div className="nav-logo">
                <img src="./img/Pokeball.png" className="nav-img" alt="pokeball"/>
                <div className="nav-h2"><h2>Pokédex</h2></div>
            </div>
            <div>
               <BotonAbc setPokeFiltro={setPokeFiltro} pokemones={pokemones} pokeData={pokeData}/>
            </div>
        </div>
    )
}

export default Nav;