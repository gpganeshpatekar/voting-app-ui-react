import React from 'react'
import '../css/RegistrationAndLoginForm.css'

const AdminRegistrationForm = () => {

  
  return (
    <div className='container'>
        <div className='reg-log'>
        <form>
            <h3>Admin Registration Form</h3>
            <div className='content'>
                <input type='text' placeholder='USERNAME' />
                <span></span>
                <input type='password' placeholder='PASSWORD' />
                <span></span>
                <input type='email' placeholder='EMAIL' />
                <span></span>
                <input type='text' placeholder='PHONE NO.' />
                <span></span>
                <div className='actions'>
                    <button>Login</button>
                    <button>Register</button>
                </div>
                <span></span>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AdminRegistrationForm;