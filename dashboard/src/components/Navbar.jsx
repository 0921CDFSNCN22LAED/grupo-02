import './navbar.css';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Search from './Search';

function Navbar(props) {
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
                <Link className={`links`} to="/productsTable">
                    <Button className="m-3" variant="warning" size="lg">
                        Clases
                    </Button>
                </Link>{' '}
                <Link className={`links`} to="/usersTable">
                    <Button className="m-3" variant="warning" size="lg">
                        Usuarios
                    </Button>
                </Link>{' '}
            </div>
            <Search setSearch={props.setSearch} />
        </div>
    );
}
export default Navbar;
