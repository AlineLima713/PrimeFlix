import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link to="/">Voltar para página inicial</Link>
    </div>
  )
}

export default Error;