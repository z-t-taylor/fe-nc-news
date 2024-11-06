import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

const Header = () => {
  const {isSignedIn, toggleLogin} = useContext(UserContext)
  
  return (
    <header className='header'>
        <Link to="/" id='header_home_link'><h1 id='main_header'>^NC News</h1></Link>
        <nav>
            <Link to="/" className='nav_elements'>Home</Link>
            <Link to="/articles" className='nav_elements'>Articles</Link>
            <button id="sign_in_btn" onClick={toggleLogin}>{isSignedIn ? "Sign out" : "Sign in"}</button>
        </nav>
    </header>
  )
}

export default Header
