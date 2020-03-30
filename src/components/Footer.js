import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <div className='footer'>
            <h3>Made with </h3>{<FontAwesomeIcon icon={faHeart} />} <h3> in India</h3>
        </div>
    )
}

export default Footer
