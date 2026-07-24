import { Link } from "react-router-dom";

import Brand from "./Brand";

function Header() {
    return (
        <header className="site-header">
            <div className="shell header-inner">
                <Link to="/" aria-label="Ir para a página inicial">
                    <Brand />
                </Link>

                <nav className="desktop-nav" aria-label="Navegação principal">
                    <a href="/#tratamentos">
                        Tratamentos
                    </a>

                    <a href="/#experiencia">
                        Experiência
                    </a>

                    <a href="/#equipe">
                        Equipe
                    </a>

                    <a href="/#contato">
                        Contato
                    </a>
                </nav>

                <div className="header-actions">
                    <Link className="link-admin" to="/admin">
                        Painel demo
                    </Link>

                    <Link
                        className="button button-small button-primary"
                        to="/agendar"
                    >
                        Agendar avaliação
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;