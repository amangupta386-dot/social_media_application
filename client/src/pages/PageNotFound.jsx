import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteName } from '../utils/routesConstants';

function PageNotFound() {
    const navigate = useNavigate()
    const navigateLoginPage =()=> {
        navigate(RouteName.initialRoute);
    }
  return (
    <>
    <div>404 PageNotFound</div>
    <button onClick={navigateLoginPage}>Go To Login Page</button>
    </>

  )
}

export default PageNotFound