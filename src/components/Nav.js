import React from 'react'
import { NavLink } from 'react-router-dom'
function Nav() {
    return (
        <header className="Navbar animY">
            <NavLink to='/'>
                <div className="logo">
                    <img src={require('../assets/corona.svg')} alt='Wait' />
                </div>
            </NavLink>
            <div className='link'>
                <li><NavLink className='current-link' activeclassname='active' exact={true} to='/' className='l1'>Home</NavLink></li>
                <li><NavLink className='currentLink' activeclassname='active' to='/news'>News</NavLink></li>
                <li><NavLink className='currentLink' activeclassname='active' to='/about-corona'>About Corona</NavLink></li>
                {/* <li><a href="mailto:support@covid19app.in?subject=Query">Contact</a></li> */}
                {/* <li><a href='https://www.buymeacoffee.com/covid19app' className='l2'><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style={{ height: 51, width: 217 }} /></a></li> */}
            </div>
        </header>

    )
}

export default Nav
