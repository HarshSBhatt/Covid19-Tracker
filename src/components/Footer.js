import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <div className='footer'>
            <p>Source : Johns Hopkins University, MOHFW & Crowd sourced with verification</p>
            <h3>Made with{' '}{<FontAwesomeIcon icon={faHeart} />}{' '}in India</h3>
            <p>For any query regarding this site contact us at: <a href="mailto:support@covid19app.in?subject=Query">support@covid19app.in</a></p>
            <p>Developed By <a href='https://www.linkedin.com/in/harsh-bhatt-a2771b161/' target='_blank'>Harsh Bhatt</a></p>
        </div>
    )
}

export default Footer
