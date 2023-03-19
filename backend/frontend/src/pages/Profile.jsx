import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../slices/AuthSlice';

 
import {useDispatch} from 'react-redux'

function Profile() {
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const redirect = useNavigate()
  const [edit, setEdit] = useState(true)
  const dispatch = useDispatch()

  // password states
  const [passwords, setPasswords] = useState(({
    password1: '',
    password2: '',
    feedback: {
      type: '',
      message: ''
    }
  }))

  const [profileDetails, setProfileDetails] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    token: user.token
  })

  
  useEffect(() => {
  // Redirect to home if user is logged in
  if (!isLoggedIn) {
    redirect('/user/login/')
  }

},[isLoggedIn, redirect])
  
  const { name, username, email } = profileDetails;
  const { password1, password2, feedback } = passwords;
  
  const editProfile = (e) => {
    setEdit(prev => (!prev))
  }

  const handleProfileForm = (e) => {

    setProfileDetails((prev => (
      {
        ...prev,
        [e.target.id]: e.target.value,
      }
    )))
  }

  const handlePassword = (e) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.id] : e.target.value,
    }))
  }
  
  useEffect(() => {
    if (password1 === '' && password2 === '') {
      setPasswords(prev => ({ ...prev, feedback: { type: "", message: '' } }))
    
    } else if (password1 === password2) {
      setProfileDetails(prev => ({
        ...prev,
        password: password1
      })) 
      setPasswords (prev => ({...prev, feedback: {type: "valid", message: 'Passwords match'}}))
    } else if (password1 !== '' && password1 !== '') {
      setProfileDetails((prev) => ({
        ...prev,
        password: "",
      }));
      setPasswords (prev => ({...prev, feedback: {type: "invalid", message: "'Passwords don't match"}}))
    }

  }, [password1, password2])


  const handleFormSubmit = (e) => {
    e.preventDefault()

    
    dispatch(updateUserProfile(profileDetails))
    
    
    if (password1 !== '' && (password1 === password2)) {
      setPasswords((prev) => ({ ...prev, password1: "", password2: "" }));

    } else  {
      setPasswords((prev) => ({
        ...prev,
        feedback: {
          type: "invalid",
          message: "Password not updated (passwords don't match)",
        },
      }));
    }

    }

  
    return (
      <>
        {
          user && 
      <div className='container'>
        <div className="row mt-5">
          <div className="col-sm-6">
            <h2 className="text-center">My Profile</h2>
             <div className="my-4 text-dark d-flex justify-content-end"><button onClick={editProfile} className='btn btn-dark'><i style={{fontSize: '1.4rem'}} className="fa fa-edit"></i></button></div> 
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="input-group">
                  <input type="text" id="name" onChange={handleProfileForm} className='form-control search-form' value={name} disabled={ edit } />
                    
                  </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Email</label>
                  <div className="input-group">
                  <input type="text" id="email" onChange={handleProfileForm} className='form-control search-form' value={email} disabled={ edit } />
                    
                  </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Username</label>
                  <div className="input-group">
                  <input type="text" id="username" onChange={handleProfileForm} className='form-control search-form' value={username} disabled={ edit } />
                    
                  </div>
              </div>
              
                  <h4>Change Password</h4>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Password</label>
                  <input type="password" id="password1"  className={`form-control search-form is-${feedback.type}`} value={password1} onChange={handlePassword} disabled={edit}/>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Confirm password</label>
                    <input type="password" id="password2" className={`form-control search-form is-${feedback.type}`} value={password2} onChange={handlePassword} disabled={edit} />
                    <div className={`${feedback.type}-feedback`}>{ feedback.message }</div>
              </div>
              <button type="submit" className="btn btn-dark mb-4" disabled={edit}>Update</button>
            </form>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </div>
      }
    </>
  )
}

export default Profile