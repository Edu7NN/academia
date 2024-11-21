import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Certifique-se de ter essa linha.
import CadastroUsuario from './components/CadastroUsuario';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Crud from './components/Crud';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crud" element={<Crud />} />
            </Routes>
        </Router>
    );
};

export default App;
