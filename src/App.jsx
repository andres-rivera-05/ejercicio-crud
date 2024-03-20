import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Usuarios } from './components/Usuarios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Usuarios/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
