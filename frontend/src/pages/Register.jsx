import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../slices/AuthSlice";
import { useDispatch, useSelector } from 'react-redux'


function Register() {
   const dispatch = useDispatch();
   const { isLoggedIn } = useSelector((state) => state.auth);
  const redirect = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
     // Redirect to home if user is logged in
     if (isLoggedIn) {
       redirect("/");
     }
   }, [isLoggedIn, redirect]);



  const [credential, setCredential] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { name, username, email, password } = credential;

  const handleFieldChange = (e) => {
    setCredential((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.toLowerCase(),
    }));
  };

  const handleSubmitedForm = (e) => {
    e.preventDefault();
    dispatch(registerUser(credential));
  };

  const handleEye = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='form-container'>
      <form className="col-sm-6" onSubmit={handleSubmitedForm}>
        <h3 className="text-center">Register</h3>

        <div className="input-group my-3">
          <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-user-alt"></i></span></div>
          <input type="text" id="name" className="form-control search-form" placeholder='Name' value={name} onChange={handleFieldChange} />
        </div>

        <div className="input-group my-3">
          <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-user"></i></span></div>
          <input type="text" id="username" className="form-control search-form" placeholder='Username' value={username} onChange={handleFieldChange} />
        </div>

        <div className="input-group my-3">
          <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-envelope"></i></span></div>
          <input type="text" id="email" className="form-control search-form" placeholder='Email' value={email} onChange={handleFieldChange} />
        </div>
        
        <div className="input-group">
          <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-lock"></i></span></div>
          <input type={`${showPassword ? "text" : "password"}`} id="password" className="form-control search-form" placeholder='Password' value={password} onChange={handleFieldChange} />
          <div onClick={handleEye} className="input-group-append"><span className="input-group-text"><i className={`fa fa-eye${showPassword ? "" :'-slash'}`}></i></span></div>
        </div>

        <button className="btn btn-dark btn-block my-3" type="submit">Register</button>
        <div className="d-flex">
          <p className="mr-2">Already have an account?</p> <Link to="/user/login/">Login</Link>
        </div>
      </form>
    
    </div>
  );
}

export default Register