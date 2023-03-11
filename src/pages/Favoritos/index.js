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

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
  }


  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

    {filmes.length === 0 && <span>Você ainda não possui filmes salvos :( </span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <spam>{item.title}</spam>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;