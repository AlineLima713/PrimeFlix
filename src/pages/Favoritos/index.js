import React from "react";
import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from 'react-router-dom';

function Favoritos() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {

    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || [])
  }, [])


  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <spam>{item.title}</spam>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;