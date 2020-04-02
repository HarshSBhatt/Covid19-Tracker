import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function PageNotFound() {
    return (
        <React.Fragment>
            <div className='err404'>
                Page Not Found
            <Link to='/'>Go to Home</Link>
            </div>
            <Footer />
        </React.Fragment>

    )
}

export default PageNotFound
