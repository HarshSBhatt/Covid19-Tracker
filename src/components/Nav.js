import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <header className="Navbar animY">
            <Link to='/'>
                <div className="logo">
                    <img src={require('../assets/corona.svg')} alt='Wait' />
                </div>
            </Link>
            <div className='link'>
                <li><Link exact='true' to='/' className='l1'>Home</Link></li>
                <li><Link to='/about-corona'>About Corona</Link></li>
                {/* <li><a href='https://www.buymeacoffee.com/covid19app' className='l2'><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style={{ height: 51, width: 217 }} /></a></li> */}
            </div>
        </header>
    )
}

export default Nav
