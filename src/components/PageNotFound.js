import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className='err404'>
            Page Not Found
            <Link to='/'>Go to Home</Link>
        </div>
    )
}

export default PageNotFound
