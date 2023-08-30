import React, { useState } from 'react'
import '../css/RegistrationAndLoginForm.css'
import { PUBLIC_AXIOS } from '../services/axios-config';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
const UserRegistrationForm = () => {

  const navigate = useNavigate();

  const [data,setData] = useState({
      username:'',
      email:'',
      password:'',
      phoneno:'',
  });

  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isPhoneNumberExist, setIsPhoneNumberExist] = useState(false);

  const [isUserNameExistMsg, setIsUserNameExistMsg] = useState('');
  const [isEmailExistMsg, setIsEmailExistMsg] = useState('');
  const [isPhoneNumberExistMsg, setIsPhoneNumberExistMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOnChange = (event) => {
    setData({...data,[event.target.name]:event.target.value});
  }

  const onChangeUsernameExist = async (event) => {
      const username = event.target.value;
      if(username.length === 0){
        return;
      }
      const response = await PUBLIC_AXIOS.post(`/users/check-username/${username}`);
      const result = await  response.data;
      console.log('Username Check API Response : ',result);
      setData({...data,username:event.target.value});
      if(response.data === false && username.length > 0){
        setIsUserNameExistMsg("Username is already exist");
        setIsUserNameExist(false);
      }else{
        setIsUserNameExistMsg("");
        setIsUserNameExist(true);
      }
  }

  const onChangeEmailExist = async (event) => {
    const email = event.target.value;
    if(email.length === 0){
      return;
    }
    const response = await PUBLIC_AXIOS.post(`/users/check-email/${email}`);
    const result = await  response.data;
    console.log('Email Check API Response : ',result);
    setData({...data,email:event.target.value});
    if(response.data === false && email.length > 0){
      setIsEmailExistMsg("Email is already exist");
      setIsEmailExist(false);
    }else{
      setIsEmailExistMsg("");
      setIsEmailExist(true);
    }
}
const onChangePhoneNumberExist = async (event) => {
  const phoneno = event.target.value;
  if(phoneno.length === 0){
    return;
  }
  const response = await PUBLIC_AXIOS.post(`/users/check-phone/${phoneno}`);
  const result = await  response.data;
  console.log('Phone Number Check API Response : ',result);
  setData({...data,phoneno:event.target.value});
  if(response.data === false && phoneno.length > 0){
    setIsPhoneNumberExistMsg("Phone Number is already exist");
    setIsPhoneNumberExist(false);
  }else{
    setIsPhoneNumberExistMsg("");
    setIsPhoneNumberExist(true);
  }
}

  const handleRegisterUser = async(event) => {
    event.preventDefault();
    
    try{
      console.log(isUserNameExist,isEmailExist,isPhoneNumberExist);
      if(isUserNameExist === true && isEmailExist === true && isPhoneNumberExist === true){
        console.log(isUserNameExist,isEmailExist,isPhoneNumberExist);
        const response = await PUBLIC_AXIOS.post(`/users/register`,data);
        console.log("register : ",response);
        setData({
          username:'',
          email:'',
          password:'',
          phoneno:''
        });
        setSuccessMessage('You have successfully registered.');
      }else{
          console.log("error")
      }

    }catch(error){

    }

  }

  const redirectToLogin = () => {
    navigate('/login');
  }

  return (
    <div className='container'>
        <div className='reg-log'>
        <form onSubmit={handleRegisterUser}>
            <h3>Registration Form</h3>
            <div className='content'>
                <DebounceInput
                  id='username'
                  name='username'
                  minLength={2}
                  type="text"
                  placeholder="USERNAME"
                  value={data.username}
                  debounceTimeout={1000}
                  onChange={onChangeUsernameExist}
                  required />
                <span>{isUserNameExistMsg}</span>
                <input type='password' placeholder='PASSWORD' name='password' value={data.password} onChange={handleOnChange} />
                <span></span>
                <DebounceInput
                  id='email'
                  name='email'
                  minLength={2}
                  type="email"
                  placeholder="EMAIL"
                  value={data.email}
                  debounceTimeout={1000}
                  onChange={onChangeEmailExist}
                  required />
                <span>{isEmailExistMsg}</span>
                <DebounceInput
                  id='phoneno'
                  name='phoneno'
                  minLength={2}
                  type="number"
                  placeholder="PHONE NUMBER"
                  value={data.phoneno}
                  debounceTimeout={1000}
                  onChange={onChangePhoneNumberExist}
                  required />
                <span>{isPhoneNumberExistMsg}</span>
                <div className='actions'>
                    <button type='button' onClick={redirectToLogin}>Login</button>
                    <button type='submit'>Register</button>
                </div>
                <span className='success'>{successMessage}</span>
            </div>
        </form>
        </div>
    </div>
  )
}

export default UserRegistrationForm;