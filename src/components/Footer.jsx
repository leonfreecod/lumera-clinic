import { Link } from "react-router-dom";

import Brand from "./Brand";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="shell footer-grid">
                <div>
                    <Brand />

                    <p>
                        Beleza com intenção, tecnologia e acompanhamento em cada etapa.
                    </p>
                </div>

                <div>
                    <strong>Clínica</strong>

                    <a href="/#tratamentos">
                        Tratamentos
                    </a>

                    <a href="/#equipe">
                        Especialistas
                    </a>

                    <Link to="/agendar">
                        Agendamento
                    </Link>
                </div>

                <div>
                    <strong>Atendimento</strong>

                    <span>
            Segunda a sexta, 9h às 19h
          </span>

                    <span>
            Sábado, 9h às 15h
          </span>

                    <span>
            São Caetano do Sul — SP
          </span>
                </div>
            </div>

            <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Luméra Clinic.
        </span>

                <span>
          Desenvolvido por{" "}
                    <a
                        href="https://leofe.com.br"
                        target="_blank"
                        rel="noreferrer"
                    >
            Leonardo de Paula
          </a>
                    {" "}— Software Developer
        </span>
            </div>
        </footer>
    );
}

export default Footer;