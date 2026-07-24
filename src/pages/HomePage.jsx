import { Link } from "react-router-dom";

import CancelAppointment from "../components/CancelAppointment";
import Footer from "../components/Footer";
import Header from "../components/Header";

import {
    professionals,
    services,
    testimonials,
} from "../data/clinic";

const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function formatSpecialties(specialties) {
    if (Array.isArray(specialties)) {
        return specialties.join(" • ");
    }

    return specialties;
}

function HomePage({ onCancel }) {
    return (
        <>
            <Header />

            <main>
                <section className="hero">
                    <div className="shell hero-grid">
                        <div className="hero-copy">
              <span className="eyebrow light">
                Estética avançada em São Caetano
              </span>

                            <h1>
                                Cuidado de alta performance com resultados que preservam{" "}
                                <em>a sua identidade.</em>
                            </h1>

                            <p>
                                Protocolos personalizados, tecnologia e acompanhamento próximo
                                para tratamentos faciais, corporais, capilares e a laser.
                            </p>

                            <div className="hero-actions">
                                <Link
                                    className="button button-gold"
                                    to="/agendar"
                                >
                                    Agendar avaliação
                                </Link>

                                <a
                                    className="button button-ghost"
                                    href="#tratamentos"
                                >
                                    Conhecer tratamentos
                                </a>
                            </div>

                            <div className="hero-trust">
                                <div>
                                    <strong>4,9</strong>
                                    <span>avaliação média</span>
                                </div>

                                <div>
                                    <strong>+8 mil</strong>
                                    <span>atendimentos</span>
                                </div>

                                <div>
                                    <strong>12 anos</strong>
                                    <span>de experiência</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-photo" />

                            <div className="floating-card top">
                                <span>✦</span>

                                <div>
                                    <strong>Avaliação personalizada</strong>
                                    <small>Plano construído para você</small>
                                </div>
                            </div>

                            <div className="floating-card bottom">
                                <span>01</span>

                                <div>
                                    <strong>Tecnologia + precisão</strong>
                                    <small>Protocolos seguros e responsáveis</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-strip">
                        <span>Harmonização natural</span>
                        <span>Bioestimuladores</span>
                        <span>Laser</span>
                        <span>Estética corporal</span>
                        <span>Terapia capilar</span>
                    </div>
                </section>

                <section
                    className="section intro"
                    id="experiencia"
                >
                    <div className="shell intro-grid">
                        <div>
              <span className="eyebrow">
                A experiência Luméra
              </span>

                            <h2>
                                Antes de qualquer procedimento, existe uma conversa.
                            </h2>
                        </div>

                        <div>
                            <p className="lead">
                                Nossa abordagem começa pela compreensão da sua rotina,
                                objetivos e histórico. A partir disso, combinamos técnicas,
                                tecnologias e acompanhamento.
                            </p>

                            <div className="principles">
                                <article>
                                    <span>01</span>

                                    <div>
                                        <h3>Diagnóstico cuidadoso</h3>

                                        <p>
                                            Avaliação criteriosa e expectativas alinhadas.
                                        </p>
                                    </div>
                                </article>

                                <article>
                                    <span>02</span>

                                    <div>
                                        <h3>Plano individual</h3>

                                        <p>
                                            Protocolos ajustados à anatomia e ao momento de cada
                                            pessoa.
                                        </p>
                                    </div>
                                </article>

                                <article>
                                    <span>03</span>

                                    <div>
                                        <h3>Acompanhamento</h3>

                                        <p>
                                            Evolução registrada e decisões orientadas por resposta
                                            clínica.
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="section section-soft"
                    id="tratamentos"
                >
                    <div className="shell">
                        <div className="section-heading">
                            <div>
                <span className="eyebrow">
                  Tratamentos
                </span>

                                <h2>
                                    Protocolos que unem ciência, técnica e refinamento.
                                </h2>
                            </div>

                            <Link
                                className="text-link"
                                to="/agendar"
                            >
                                Ver agenda disponível →
                            </Link>
                        </div>

                        <div className="services-grid">
                            {services.map((service) => (
                                <article
                                    className="service-card"
                                    key={service.id}
                                >
                                    <div
                                        className="service-image"
                                        style={{
                                            backgroundImage: `url("${service.image}")`,
                                        }}
                                    >
                                        <span>{service.category}</span>
                                    </div>

                                    <div className="service-content">
                                        <div>
                                            <h3>{service.name}</h3>
                                            <p>{service.description}</p>
                                        </div>

                                        <div className="service-meta">
                                            <span>{service.duration} min</span>

                                            <strong>
                                                A partir de {currency.format(service.price)}
                                            </strong>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section technology">
                    <div className="shell technology-grid">
                        <div className="technology-photo" />

                        <div>
              <span className="eyebrow light">
                Tecnologia com propósito
              </span>

                            <h2>
                                Equipamentos avançados. Decisões humanas.
                            </h2>

                            <p>
                                Cada tecnologia é escolhida pelo que pode oferecer ao seu
                                plano. A indicação parte da avaliação e respeita segurança,
                                tempo de recuperação e resultado esperado.
                            </p>

                            <div className="technology-list">
                                <div>
                                    <strong>Diagnóstico integrado</strong>

                                    <span>
                    Registro de histórico, objetivos e evolução.
                  </span>
                                </div>

                                <div>
                                    <strong>Protocolos combinados</strong>

                                    <span>
                    Técnicas complementares em uma jornada organizada.
                  </span>
                                </div>

                                <div>
                                    <strong>Seguimento pós-atendimento</strong>

                                    <span>
                    Orientações e retornos previstos desde o início.
                  </span>
                                </div>
                            </div>

                            <Link
                                className="button button-gold"
                                to="/agendar"
                            >
                                Agendar minha avaliação
                            </Link>
                        </div>
                    </div>
                </section>

                <section
                    className="section"
                    id="equipe"
                >
                    <div className="shell">
                        <div className="section-heading centered">
                            <div>
                <span className="eyebrow">
                  Especialistas
                </span>

                                <h2>
                                    Uma equipe preparada para cuidar de cada detalhe.
                                </h2>
                            </div>
                        </div>

                        <div className="team-grid">
                            {professionals.map((professional) => (
                                <article
                                    className="team-card"
                                    key={professional.id}
                                >
                                    <div
                                        className="team-photo"
                                        style={{
                                            backgroundImage: `url("${professional.image}")`,
                                        }}
                                    />

                                    <div className="team-content">
                                        <h3>{professional.name}</h3>
                                        <p>{professional.role}</p>

                                        <span>
                      {formatSpecialties(professional.specialties)}
                    </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section testimonials">
                    <div className="shell">
                        <div className="section-heading">
                            <div>
                <span className="eyebrow light">
                  Experiências
                </span>

                                <h2>
                                    Resultados também são sobre como você se sente no processo.
                                </h2>
                            </div>
                        </div>

                        <div className="testimonials-grid">
                            {testimonials.map((testimonial) => (
                                <blockquote
                                    key={testimonial.id ?? testimonial.author}
                                >
                                    <b>“</b>
                                    <p>{testimonial.text}</p>
                                    <cite>{testimonial.author}</cite>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="section booking-section"
                    id="contato"
                >
                    <div className="shell booking-grid">
                        <div>
              <span className="eyebrow">
                Sua jornada começa aqui
              </span>

                            <h2>
                                Agende uma avaliação e receba um plano pensado para você.
                            </h2>

                            <p className="lead">
                                Escolha tratamento, especialista, data e horário em poucos
                                passos. Neste MVP, os dados ficam armazenados no navegador.
                            </p>

                            <Link
                                className="button button-primary"
                                to="/agendar"
                            >
                                Iniciar agendamento
                            </Link>
                        </div>

                        <CancelAppointment onCancel={onCancel} />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default HomePage;