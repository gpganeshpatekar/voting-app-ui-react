import React from 'react'
import BaseLayout from './BaseLayout'
import ElectionStats from '../components/ElectionStats'

const AdminHomePage = () => {
  return (
    <>
        <BaseLayout>
                <main>
                    <ElectionStats />
                </main>
        </BaseLayout>
    </>
  )
}

export default AdminHomePage