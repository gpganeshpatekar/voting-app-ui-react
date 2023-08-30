import React from 'react'
import Header from '../components/Header'
import TopNavbar from '../components/TopNavbar'
import Footer from '../components/Footer'

const BaseLayout = ({children}) => {
  return (
    <>
        <TopNavbar />
        <Header />
        {children}
        <Footer/>
        
    </>
  )
}

export default BaseLayout