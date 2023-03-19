import React from "react"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [hasFilm, setHasFilm] = useState(false);


  function getList() {
    const minhaLista = localStorage.getItem("@primeflix");
    const filmesSalvos = JSON.parse(minhaLista) || [];
    return filmesSalvos;

  }

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
        .then((response) => {

          setHasFilm(getList().some((filmeSalvo) => filmeSalvo.id === filme.id))

          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        })
    }

    loadFilme();

  }, [id, navigate, filme.id])

  function excluirFilme(filmesSalvos, id) {
    let filtroFilmes = filmesSalvos.filter((item) => {
      return (item.id !== id)
    })

    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    toast.info("Filme removido dos favoritos!")
  }


  function salvarFilme(filmesSalvos) {
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  const handleClick = () => {
    const filmesSalvos = getList();

    const Film = filmesSalvos.find((filmeSalvo) => filmeSalvo.id === filme.id)

    if (Film) {
      excluirFilme(filmesSalvos, Film.id);
    } else {
      salvarFilme(filmesSalvos);
    }
    setHasFilm(!hasFilm)
  }


  function handleImgLoad() {
    setImgLoading(false);
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme?.title}</h1>

      {imgLoading && <div className="carregando-img"> <span>Carregando imagem...</span> </div>}
      <img
        src={`https://image.tmdb.org/t/p/original/${filme?.backdrop_path}`}
        alt={filme?.title}
        onLoad={handleImgLoad}
      />

      <h3>Sinopse</h3>
      <span>{filme?.overview}</span>
      <strong>Avaliação: {filme?.vote_average?.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button className={`button ${hasFilm ? 'salvo' : ''}`} onClick={handleClick}>{hasFilm ? "Salvo" : "Salvar"}</button>
        <button>
          <a target="blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div >
  )
}

export default Filme;