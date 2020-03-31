import React from 'react'
import { Link } from 'react-router-dom'
function Navigation() {
    return (
        <header className="Navbar anim">
            <div className="logo">
                <img src={require('../assets/corona.svg')} alt='Wait' />
            </div>
            <div className='link'>
                <Link exact='true' to='/' className='l1'>Home</Link>
                <a href='https://www.buymeacoffee.com/covid19app' className='l2'><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style={{ height: 51, width: 217 }} /></a>
            </div>
        </header>
    )
}

export default Navigation
