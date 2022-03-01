import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Search(props) {
    const searchInput = useRef();
    const startSearch = () => {
        props.setSearch(searchInput.current.value);
    };
    return (
        <div className="search">
            <input
                type="search"
                name="main-search"
                id="main-search"
                placeholder="Buscá clases, grados, materias o maestros"
                ref={searchInput}
            />
            <Link className={`links`} to="/searchTable">
                <button onClick={() => startSearch()}>
                    <i
                        className="fas fa-search"
                        style={{ fontSize: '16px' }}
                    ></i>
                </button>
            </Link>{' '}
        </div>
    );
}
