import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { Route, Routes } from 'react-router-dom';
import Info from './components/Info';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
    const [search, setSearch] = useState('');
    return (
        <div
            className="App container-c-fluid"
            style={{
                backgroundImage: 'url(/img/school.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }}
        >
            <header>
                <Navbar setSearch={setSearch} />
            </header>
            <main className="main">
                <div id="main">
                    <Routes>
                        <Route path="/" element={<Info />} />
                        <Route
                            path="/productsTable"
                            element={
                                <Table
                                    key="tableProducts"
                                    url="http://localhost:3001/api/products/flattened"
                                    initArray={['Título', 'Materia', 'Grado']}
                                />
                            }
                        />
                        <Route
                            path="/usersTable"
                            element={
                                <Table
                                    key="tableUsers"
                                    url="http://localhost:3001/api/users/flattened"
                                    initArray={[
                                        'Nombre',
                                        'Correo Electrónico',
                                        'Rol',
                                    ]}
                                />
                            }
                        />
                        <Route
                            path="/searchTable"
                            element={
                                <Table
                                    key="tableSearch"
                                    url={`http://localhost:3001/api/products/search?search=${search}`}
                                    initArray={[
                                        'Título',
                                        'Materia',
                                        'Grado',
                                        'Maestro',
                                    ]}
                                />
                            }
                        />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
