import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import WebDevProjects from './pages/WebDevProjects';
import GameDevProjects from './pages/GameDevProjects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">Jonathan Savastano</div>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/web-projects" onClick={() => setMenuOpen(false)}>Web Dev</Link>
            <Link to="/game-projects" onClick={() => setMenuOpen(false)}>Game Dev</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/web-projects" element={<WebDevProjects />} />
            <Route path="/game-projects" element={<GameDevProjects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Jonathan Savastano. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
