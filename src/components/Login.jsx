import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para requisições HTTP
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, email } = formData;

    try {
      // Envia os dados para o backend para autenticação
      const response = await axios.post("http://localhost:5000/auth/login", {
        nome,
        email,
      });

      if (response.status === 200) {
        // Login bem-sucedido
        alert(`Bem-vindo, ${nome}!`);
        navigate("/crud"); // Redireciona para a página CRUD
      }
    } catch (error) {
      // Exibe mensagem de erro em caso de falha
      if (error.response && error.response.status === 401) {
        setError("Nome ou e-mail inválido. Verifique suas credenciais.");
      } else {
        setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      }
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Por favor, digite seu nome e e-mail!
                  </p>

                  {/* Exibe mensagem de erro */}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Formulário de login */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="form-control form-control-lg"
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="nome">
                        Nome
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        E-mail
                      </label>
                    </div>

                    {/* Botão de login */}
                    <button type="submit" className="btn btn-outline-light btn-lg px-5">
                      Login
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Não tem conta?{" "}
                    <a href="./cadastro" className="text-white-50 fw-bold">
                      Inscrever-se
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
