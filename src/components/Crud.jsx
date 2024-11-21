import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/users";

const Crud = () => {
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({ id: null, nome: "", email: "", plano: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setModalData({ ...modalData, [id]: value });
    };

    const openModal = (item = { id: null, nome: "", email: "", plano: "" }) => {
        setModalData(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData({ id: null, nome: "", email: "", plano: "" });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (modalData.id) {
                await axios.put(`${API_URL}/${modalData.id}`, {
                    nome: modalData.nome,
                    email: modalData.email,
                    plano: modalData.plano,
                });
            } else {
                const response = await axios.post(API_URL, {
                    nome: modalData.nome,
                    email: modalData.email,
                    plano: modalData.plano,
                });
                setData([...data, response.data]);
            }
            fetchData();
            closeModal();
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchData();
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 style={{ color: "#fff" }}>Cadastro de Usuários</h2>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    Incluir
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Plano</th>
                            <th className="text-center">Editar</th>
                            <th className="text-center">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.plano}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                openModal({
                                                    id: item._id,
                                                    nome: item.nome,
                                                    email: item.email,
                                                    plano: item.plano,
                                                })
                                            }
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div
                        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalData.id ? "Editar Usuário" : "Cadastrar Usuário"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSave}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">
                                            Nome
                                        </label>
                                        <input
                                            id="nome"
                                            type="text"
                                            className="form-control"
                                            value={modalData.nome}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            E-mail
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            value={modalData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="plano" className="form-label">
                                            Plano
                                        </label>
                                        <select
                                            id="plano"
                                            className="form-control"
                                            value={modalData.plano}
                                            onChange={handleInputChange}
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
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={closeModal}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crud;
