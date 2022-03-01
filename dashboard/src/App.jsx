import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { Route, Routes } from 'react-router-dom';
import Info from './components/Info';

function App() {
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
                <Navbar />
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
                                    initArray={['title', 'subject', 'grades']}
                                />
                            }
                        />
                        <Route
                            path="/usersTable"
                            element={
                                <Table
                                    key="tableUsers"
                                    url="http://localhost:3001/api/users/flattened"
                                    initArray={['id', 'email', 'name']}
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
