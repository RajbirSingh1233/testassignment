import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FavoritesPage from './pages/Favorites';
import UniversitySearchPage from './pages/UniversitySearchPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={<UniversitySearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
