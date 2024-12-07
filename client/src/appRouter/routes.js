const routes = {
  public: [
    { path: '/login', element: 'Login', title: 'Login Page' },
    { path: '/register', element: 'Register', title: 'Register Page' },
    { path: '*', element: 'PageNotFound', title:'Page Not Found'}
  ],
  private: [
    { path: '/dashboard', element: 'Dashboard', title: 'Dashboard' },
    { path: '/profile', element: 'Profile', title: 'Profile Page', roles: ['user', 'admin'] },
  
  ],
};

export default routes;
