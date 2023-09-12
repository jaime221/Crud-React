import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Roles from '../components/Rol/ContentRol';
import Users from '../components/User/ContentUser';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;
