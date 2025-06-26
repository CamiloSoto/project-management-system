import {Outlet, Link} from "react-router-dom"
import useAuth from "../hooks/useAuth";

const AppLayout = () => {

    const {logout} = useAuth();

    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/app/projects">📋 Gestor de Proyectos</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/projects">Proyectos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/users">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={logout}>Cerrar sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container mt-4">
                <Outlet/>
            </main>
        </>
    );
};

export default AppLayout;
