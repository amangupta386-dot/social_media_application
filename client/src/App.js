import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import ProtectedRoute from './appRouter/protectedRoutes';
import routes from './appRouter/routes';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import React from 'react';
import PageNotFound from './pages/PageNotFound';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const getElement = (elementName) => {
    const components = { Login, Register, Dashboard, PageNotFound };
    return React.createElement(components[elementName]);
  };


  const publicRoutes = routes.public.map((route) => (
    <Route key={route.path} path={route.path} element={getElement(route.element)} />
  ));

 
  const privateRoutes = routes.private.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ProtectedRoute>
          {getElement(route.element)}
        </ProtectedRoute>
      }
    />
  ));

  return (
    <Router>
      <Routes>
        {publicRoutes}
        {privateRoutes}
        
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
       
      </Routes>
    </Router>
  );
};

export default App;
