import { RouteName } from "../utils/routesConstants";

const routes = {
  public: [
    { path: RouteName.login, element: 'Login', title: 'Login Page' },
    { path: RouteName.register, element: 'Register', title: 'Register Page' },
    { path: RouteName.pageNotFound, element: 'PageNotFound', title:'Page Not Found'}
  ],
  private: [
    { path: RouteName.dashboard, element: 'Dashboard', title: 'Dashboard' },
    { path: RouteName.profile, element: 'Profile', title: 'Profile Page', roles: ['user', 'admin'] },
  
  ],
};

export default routes;
