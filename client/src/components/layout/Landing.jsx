import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">IPF-Developers</h1>
                    <p className="lead">
                        crea tu propio portfolio/perfil, comparte con otr@s developers y conecta con la comunidad
                    </p>
                    <div className="buttons round-buttons">
                        <Link to="/register" className="btn btn-primary round-buttons">Registrarse</Link>
                        <Link to="/login" className="btn btn-light">Entrar</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing