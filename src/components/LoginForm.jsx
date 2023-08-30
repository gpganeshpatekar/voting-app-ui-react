import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PUBLIC_AXIOS } from '../services/axios-config';
import { doLoggedIn } from '../auth';
import userContext from '../context/userContext';
import { logInUser } from '../services/user-service';

const LoginForm = () => {
  

  const userContextData = useContext(userContext);

  const[logInError, setLogInError] = useState('');
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username:'',
    password:'',
  });

  const handleOnChange = (event,field) => {
    let actualValue = event.target.value;
    setCredentials({
      ...credentials,
      [field]: actualValue,
    });
  };

  const handleLogInForm =  (event) => {
    event.preventDefault();
    console.log(credentials);
    if(credentials.username.trim() === "" || credentials.password.trim() === ""){
      setLogInError("Credentials can not be empty.")
      return 
    }
    logInUser(credentials).then(response => {
      
      doLoggedIn(response, () => {
        console.log("response has been saved to session storage");
        userContextData.setUser({
          data: response.user,
          logIn:true,
        });
        console.log("Login Form ",response);
        if(response.user.roles[0].id === 5001){
            navigate("/user/admin")
        }else{
          navigate("/user/voting")
        }
      });
    }).catch((error)=>{
      console.log(error);
      if(error){
        setLogInError(error.response.data.message)
      }
    });
  }

  const redirectToRegisterUser = () => {
    navigate('/');
  }
  return (
    <div className='container'>
    <div className='reg-log'>
    <form onSubmit={handleLogInForm}>
        <h3>Login Form</h3>
        <div className='content'>
            <input type='text' placeholder='USERNAME' name='username' onChange={(event) => handleOnChange(event,'username')} required />
            <span></span>
            <input type='password' placeholder='PASSWORD' name='password' onChange={(event) => handleOnChange(event,'password')} required />
            <span></span>
            <div className='actions'>
                <button type='submit'>Login</button>
                <button type='button' onClick={redirectToRegisterUser}>Register</button>
            </div>
            <span className='error'>{logInError}</span>
        </div>
    </form>
    </div>
</div>
  )
}

export default LoginForm