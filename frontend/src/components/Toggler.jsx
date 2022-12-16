import React from 'react'
import { useState } from 'react'

function Toggler() {
  const [toggle, setToggle ] = useState(false)
  const handleToggler = () => { 
    setToggle((prevState)=>(!prevState))
  }

  return (
    <button onClick={handleToggler}  data-toggle="collapse" data-target ="#navigation" className='navbar-toggler bg-transparent border-0 text-light'>
    <i className={`${toggle && 'fa-rotate-90 fa-times'} transit-1 fa fa-bars`} style={{fontSize:'1.5rem'}}></i>
    </button>
  )
}

export default Toggler