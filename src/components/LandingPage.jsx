import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div>
      {/* Cabeçalho */}
      <header
        style={{
          backgroundImage: `url('/assets/img/img02.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          opacity: "0.9"
        }}
        className="hero-section d-flex align-items-center"
      >
        <div className="container text-center text-white">
          <h1 className="display-4 ">Academia Fitness</h1>
          <p className="lead">
            Transforme-se em sua melhor versão com nossos treinamentos
            personalizados
          </p>
          <Link to="/CadastroUsuario" className="btn btn-primary btn-lg mt-4">
            Acesse agora
          </Link>
        </div>
      </header>

      {/* Seção Sobre Nós */}
      <section id="sobre" className="py-5" style={{ backgroundColor: "#000" }}>
        <div className="container text-center">
          <h2 style={{ color: "#d60708", fontWeight: "bold" }}>Sobre a Academia</h2>
          <p style={{ color: "#fff" }}>
            Oferecemos equipamentos de última geração e uma equipe de
            profissionais para ajudar você a atingir seus objetivos.
          </p>
        </div>
      </section>

      {/* Seção Planos */}
      <section id="planos" className="py-5" style={{ backgroundColor: "#37322f" }}>
        <div className="container text-center">
          <h2 style={{ color: "#d60708" }}>Nossos Planos</h2>
          <div className="row">
            {[
              { title: "Plano Básico", text: "Acesso livre à academia em horário comercial.", price: "R$ 99,00/mês" },
              { title: "Plano Premium", text: "Acesso 24 horas, acompanhamento e aulas em grupo.", price: "R$ 149,00/mês" },
              { title: "Plano VIP", text: "Acesso total e personal trainer exclusivo.", price: "R$ 199,00/mês" },
            ].map((plan, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{plan.title}</h5>
                    <p className="card-text">{plan.text}</p>
                    <p className="price" style={{ color: "#d60708", fontSize: "1.2rem" }}>{plan.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="py-5" style={{ backgroundColor: "#000" }}>
        <div className="container text-center">
          <h2 style={{ color: "#fff" }}>Entre em Contato</h2>
          <p style={{ color: "#fff" }}>Estamos prontos para ajudar você a alcançar seus objetivos!</p>
          <a href="mailto:contato@academiafitness.com" className="btn btn-secondary btn-lg">
            contato@academiafitness.com
          </a>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="text-center py-3 text-white" style={{ backgroundColor: "#37322f" }}>
        <p>&copy; 2024 Academia Fitness. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
