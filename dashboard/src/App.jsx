import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { Route, Routes } from 'react-router-dom';
import Choose from './components/Choose';

function App() {
    return (
        <div className="App container-c-fluid">
            <header>
                <Navbar />
            </header>
            <main className="main">
                <div>
                    <Routes>
                        <Route path="/" element={<Choose />} />
                        <Route
                            path="/productsTable"
                            element={
                                <Table
                                    key="tableProducts"
                                    url="http://localhost:3001/api/products/flattened"
                                    initArray={['id', 'title', 'price']}
                                />
                            }
                        />
                        <Route
                            path="/usersTable"
                            element={
                                <Table
                                    key="tableUsers"
                                    url="http://localhost:3001/api/users/flattened"
                                    initArray={['id', 'email', 'profiles.name']}
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
