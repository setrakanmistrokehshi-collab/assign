import React from 'react'
import LoginPage from "./screen/LoginPage"
import Home  from './screen/Home'
import {Routes,Route} from "react-router-dom"
import Registeration from "./screen/Registeration"
import UsersList from './screen/UserList'
import EditUser from "../src/screen/EditUser"
import GetUser from "../src/screen/GetUser"
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  return (
    <div>
      <AuthProvider>
 <Routes> 
  
  <Route path='/' element={<Home/>} />
   <Route path='/login' element={ <LoginPage />} />
    <Route path='/register' element={ <Registeration />} />
    <Route path='/UserList' element={ <UsersList />} />
    <Route path='/User/:id' element={ <GetUser />} />
    <Route path='/User/edit/:id' element={ <EditUser />} />
    
      
  </Routes>
  </AuthProvider>
    </div>
  )
}

export default App