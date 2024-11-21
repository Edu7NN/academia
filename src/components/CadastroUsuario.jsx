import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para requisições HTTP

const CadastroUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        plano: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar dados para o backend
            const API_URL = "http://localhost:5000/users"; // URL do endpoint
            await axios.post(API_URL, formData);

            // Exibir mensagem de sucesso
            alert("Usuário cadastrado com sucesso!");

            // Redirecionar para a tela do CRUD
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center">
                            <h4>Cadastro de Usuário</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">
                                        Nome completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        placeholder="Digite seu nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Digite seu e-mail"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="plano" className="form-label">
                                        Plano
                                    </label>
                                    <select
                                        className="form-control"
                                        id="plano"
                                        value={formData.plano}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione um plano
                                        </option>
                                        <option value="basico">Básico</option>
                                        <option value="premium">Premium</option>
                                        <option value="vip">Vip</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-dark w-100">
                                    Cadastrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroUsuario;
