import React from 'react';
// REMOVE: import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import AppRoutes from './routes.jsx';
import './styles/global.css';
import './styles/components.css';

function App() {
  return (
    // Keep AuthProvider to manage state for the whole app
    <AuthProvider>
        {/* REMOVE <Router> tag here, as it's already in main.jsx */}
        <div className="App">
            <Navbar />
            <main className="container">
                <AppRoutes />
            </main>
        </div>
        {/* REMOVE </Router> tag here */}
    </AuthProvider>
  );
}


export default App;