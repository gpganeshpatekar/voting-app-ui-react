import React, { useContext, useEffect, useState } from 'react'
import '../css/ElectionVotingStats.css'
import { ElectionList } from '../context/ElectionContext'
import { fetchElections } from '../services/user-service';
import { PRIVATE_AXIOS, PRIVATE_AXIOS_JWT, PUBLIC_AXIOS } from '../services/axios-config';

const ElectionStats = () => {

// const {elections,setElections} = useContext(ElectionList);

const [elections,setElections] = useState([]);

useEffect(()=>{
    fetchAllElections();
},[])

console.log(elections);

const fetchAllElections = async () => {

    try {
        const response = await PUBLIC_AXIOS.get('/elections/elections-info');
        setElections(response.data);
    } catch (error) {
        console.log(error);
    }
    
}

  return (
    <div className='container'>
         <div className='election-voting'>
         <div className='stats'>
            <h3>BMC ELECTION 2017</h3>
            <div className='candidate-list'>
            <ul>
                <li>
                   <span>Candidate Name</span><span className='votes'>Votes</span>
                </li>
                {
                    elections[0]?.candidates.map((e,index) => {
                        return <>
                            <li key={index}>
                        <span>{e.name}</span><span className='votes'>{e.votes}</span>
                     </li>
                        </>
                    })
                }
                {/* <li>
                   <span>Sudha Shambhunath Singh</span><span className='votes'>100000</span>
                </li>
                <li>
                    <span>Vanita Kailash Marucha</span><span className='votes'>5</span>
                    
                </li>
                <li>
                    <span>Prachi Parab</span><span className='votes'>6</span>
                    
                </li>
                <li>
                    <span>Radhika Armugam Udaiyar</span><span className='votes'>7</span> 
                </li> */}
            </ul>
            </div>
        </div>
        </div>        
    </div>
  )
}

export default ElectionStats;