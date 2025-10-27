import React from 'react'
import LoginPage from "./screen/LoginPage"
import Home  from './screen/Home'
import {Routes,Route} from "react-router-dom"
import RegisterationForm from "./screen/Registeration"
import UsersList from './screen/UserList'
const App = () => {
  return (
    <div>
 <Routes> 
  
  <Route path='/' element={<Home/>} />
   <Route path='/login' element={ <LoginPage />} />
    <Route path='register' element={ <RegisterationForm />} />
    <Route path='UserList' element={ <UsersList />} />
      
  </Routes>
    </div>
  )
}

export default App