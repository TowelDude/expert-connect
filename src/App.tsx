import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExpertMatches } from './pages/ExpertMatches';
import { Chat } from './pages/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experts" element={<ExpertMatches />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;