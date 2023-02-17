import React from 'react'
import { Link } from 'react-router-dom'

function ProgessBar({page}) {
  
  
  return (
    <div className='my-4 border'>
      <ul className='nav nav-pills justify-content-between'>
        <li className="nav-item "><Link className={`nav-link ${page === 'shipping' && 'bg-dark'} font-weight-bold disabled`}>STEP 1</Link></li>
        <li className="nav-item "><Link className={`nav-link ${page === 'payment' && 'bg-dark'} font-weight-bold disabled`}>STEP 2</Link></li>
        <li className="nav-item "><Link className={`nav-link ${page === 'order' && 'bg-dark'} font-weight-bold disabled`}>STEP 3</Link></li>
      </ul>
    </div>
  )
}

export default ProgessBar