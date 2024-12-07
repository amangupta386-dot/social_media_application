import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
    const navigateLoginPage =()=> {
        navigate('/');
    }
  return (
    <>
    <div>404 PageNotFound</div>
    <button onClick={navigateLoginPage}>Go To Login Page</button>
    </>

  )
}

export default PageNotFound