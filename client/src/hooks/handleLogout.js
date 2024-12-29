import { logout } from "../features/auth/authSlice"
import { RouteName } from "../utils/routesConstants";

export const handleLogout = (navigate, dispatch) => {
    dispatch(logout())
    navigate(RouteName.login)
  }