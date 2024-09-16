import { useState } from "react"
import { loginUser, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  });
  const {email, password} = formData;
  useEffect(() => {
    if(isSuccess){
      navigate("/dashboard")
      dispatch(reset());
    }
  },[isSuccess,user,dispatch,navigate])
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };
    dispatch(loginUser(dataToSubmit))
  };
  return (
    <div className="container">
      <h1 className="heading center">Login</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" placeholder="Enter your email" value={email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder="Enter password " value={password} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login

