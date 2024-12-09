import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import ProtectedRoute from './appRouter/protectedRoutes';
import routes from './appRouter/routes';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import React, { createElement, useEffect } from 'react';
import PageNotFound from './pages/PageNotFound';
import { loadUser }  from './features/auth/authActions';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const getElement = (elementName) => {
    const components = { Login, Register, Dashboard, PageNotFound };
    return createElement(components[elementName] || PageNotFound);
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
