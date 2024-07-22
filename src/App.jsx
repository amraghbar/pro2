import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './assets/components/Login';
import Dash from './assets/components/Dash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dash />} />

      </Routes>
    </Router>
  );
}

export default App;
