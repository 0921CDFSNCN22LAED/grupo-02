import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { Route, Routes } from 'react-router-dom';
import Empty from './components/Empty';

function App() {
    return (
        <div className="App container-c-fluid">
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={Empty} />
                    <Route
                        path="/productsTable"
                        element={
                            <Table url="http://localhost:3001/api/products/flattened" />
                        }
                    />
                    <Route
                        path="/usersTable"
                        element={
                            <Table url="http://localhost:3001/api/users/flattened" />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
