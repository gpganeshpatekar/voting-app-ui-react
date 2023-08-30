import React, { useContext, useEffect, useState } from 'react'
import '../css/ElectionVoting.css'
import { PRIVATE_AXIOS, PUBLIC_AXIOS } from '../services/axios-config';
import userContext from '../context/userContext';

const ElectionVoting = () => {

    const {user} = useContext(userContext);

    const [elections,setElections] = useState([]);
    const [voted,setVoted] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');

    // const isVoted = () => {
    //     let userId = user.data?.id;
    //     elections.voters.map((v) => {
    //         if(v.id === userId){
    //             return true;
    //         }
    //         return false;
    //     })
    //     return false;
    // }





    const [vote, setVote] = useState({
        electionId: 0,
        voterId: user.data?.id,
        candidateId:0
    })

   

    useEffect(()=>{
        fetchAllElections();
    },[])

    const mytoken = sessionStorage.getItem('data').token;
    console.log(mytoken);

    
    const fetchAllElections = async () => {
    
        try {
            const response = await PUBLIC_AXIOS.get('/elections/elections-info');
            setElections(response.data);
            setVote(prevVote => ({
                ...prevVote,
                electionId: response.data[0].id // Set election ID from the first election
              }));
        } catch (error) {
            console.log(error);
           
            
        }
    }

    const handleSubmitVote = async (e) => {
        e.preventDefault();
        console.log("vote details",vote)
        try {
            const response = await PRIVATE_AXIOS.post('vote', vote);
            console.log('Vote submitted:', response);
            setVote({...vote,'candidateId':0})
            setVoted(true)
            setSuccessMessage('You have successfully voted.')
            // You can perform any additional actions here, such as showing a success message
          } catch (error) {
            console.error('Error submitting vote:', error);
            // You can show an error message or perform other error handling
          }


    }

    console.log(elections);
    const isVoted = elections.some(election => election.voters.some(v => v.id === user.data?.id));
    console.log("is voted : ",isVoted);

  return (
    <div className='container'>
         <div className='election-voting'>
         <form onSubmit={handleSubmitVote}>
            <h3>BMC ELECTION 2017</h3>
            {
                (isVoted == false)?
                <>
                <div className='candidate-list'>
                
                <ul>
                    {
                        elections[0]?.candidates.map((e) => {
                            return <>
                                <li key={e.id}>
                                <input type='radio' name='candidateId' value={e.id}
                                    onChange={() => {
                                        setVote(prevVote => ({
                                            ...prevVote,
                                            candidateId: e.id,
                                        }))
                                    }}
                                />&nbsp;{e.name}
                        </li>
                            </>
                        })
                    }
                </ul>
                </div>
                <div className='vote-candidate'>
                    <button type='submit' disabled={voted === true}>Vote</button>
                    {
                        (voted === true) ?
                        <span>{successMessage}</span> : ''
                    }
                </div>
            </>
                :
                <div className='voted-done'>
                <h3>You already Voted</h3>
                </div>
            }
            
        </form>
        </div>        
    </div>
  )
}

export default ElectionVoting