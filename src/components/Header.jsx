import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
        <nav className="nav-section">
            <Link to="/">Home</Link>
            <Link to="/topics">Topics</Link>
        </nav>
        <h1> Welcome to NC News!!!</h1>
        </>
    )
}

export default Header