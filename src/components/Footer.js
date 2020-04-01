import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <div className='footer'>
            <p>Source : Johns Hopkins University, MOHFW & Crowd sourced with verification</p>
            <h3>Made with{' '}{<FontAwesomeIcon icon={faHeart} />}{' '}in India</h3>
        </div>
    )
}

export default Footer
