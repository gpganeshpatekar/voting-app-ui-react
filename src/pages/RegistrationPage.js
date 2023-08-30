import React from 'react'
import UserRegistrationForm from '../components/UserRegistrationForm'
import BaseLayout from './BaseLayout'

const RegistrationPage = () => {
    return (
        <>
            <BaseLayout>
                    <main>  
                        <UserRegistrationForm />
                    </main>
            </BaseLayout>
        </>
    )
}

export default RegistrationPage