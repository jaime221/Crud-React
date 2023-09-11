import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Roles from '../components/Rol/ContentRol';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;
