import './navbar.css';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Sidebar() {
    return (
        <div id="header" className="mb-3">
            <div className="logo-title ">
                <Link to="/">
                    <img
                        className="img-logo"
                        src={logo}
                        alt="logo Mundo Sapien"
                    />
                    <h1>
                        MUNDO <br />
                        SAPIEN
                    </h1>
                </Link>
            </div>
            <div className="d-flex flex-grow-1 justify-content-center">
                <Button className="m-3" variant="warning" size="lg">
                    <Link className={`links`} to="/productsTable">
                        Classes
                    </Link>
                </Button>{' '}
                <Button className="m-3" variant="warning" size="lg">
                    <Link className={`links`} to="/usersTable">
                        Users
                    </Link>
                </Button>{' '}
            </div>
            <div className="search ">
                <input
                    type="search"
                    name="main-search"
                    id="main-search"
                    placeholder="Implementar búsqueda"
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div id="background-img-under-search-bar"></div>
        </div>
    );
}
export default Sidebar;
