import './Nav.css'
import {Link} from "react-router-dom"

const Nav = () => {
  return (
      <div className='nav'>
        <div  className="logo">
          <strong>SETRAKAN</strong>
        </div>
        
        <div className="links">
          <Link to ="/">Home</Link>
          <Link to="/UserList">users</Link>
          <Link to="/Login">Login</Link>
          <Link to="/register">Sign up</Link>
          <Link to="/User">  Userlist </Link>
          <Link  to="/User/Edit/:id"> EditUser </Link>
        </div>
      </div>
   
    
  )
}

export default Nav
