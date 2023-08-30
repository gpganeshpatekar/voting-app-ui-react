import React from 'react'
import BaseLayout from './BaseLayout'
import ElectionVoting from '../components/ElectionVoting'

const VotingPage = () => {
  return (
    <>
            <BaseLayout>
                 <ElectionVoting />
            </BaseLayout>
    </>
  )
}

export default VotingPage