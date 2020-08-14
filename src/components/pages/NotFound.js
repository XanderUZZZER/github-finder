import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p className='lead'>The page you are looking for does not exist</p>
      <h2>
        <Link to="/">
          <i className="fas fa-home" /> Back home
        </Link>
      </h2>
    </div>
  )
}

export default NotFound
