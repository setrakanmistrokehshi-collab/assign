import React from 'react'
import LoginPage from "./screen/LoginPage"
import Home  from './screen/Home'
import {Routes,Route} from "react-router-dom"
import RegisterationForm from "./screen/Registeration"
import UsersList from './screen/UserList'
import EditUser from "../src/screen/EditUser"
import GetUser from "../src/screen/GetUser"
const App = () => {
  return (
    <div>
 <Routes> 
  
  <Route path='/' element={<Home/>} />
   <Route path='/login' element={ <LoginPage />} />
    <Route path='/register' element={ <RegisterationForm />} />
    <Route path='/UserList' element={ <UsersList />} />
    <Route path='/User/:id' element={ <GetUser />} />
    <Route path='/User/edit/:id' element={ <EditUser />} />
    
      
  </Routes>
    </div>
  )
}

export default App