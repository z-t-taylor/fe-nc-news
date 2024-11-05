import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <Link to="/" id='header_home_link'><h1 id='main_header'>^NC News</h1></Link>
        <nav>
            <Link to="/" className='nav_elements'>Home</Link>
            <Link to="/articles" className='nav_elements'>Articles</Link>
        </nav>
    </header>
  )
}

export default Header
