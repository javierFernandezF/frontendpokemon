import "./Buscador.css";

const Buscador = ({ pokemones, setPokeFiltro, pokeFetch = { pokeFetch } }) => {
  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setPokeFiltro(pokeFetch);
    } else {
      const pokeFiltrado = pokeFetch.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setPokeFiltro(pokeFiltrado);
    }
  };

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar"
        className="buscador-input"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Buscador;
