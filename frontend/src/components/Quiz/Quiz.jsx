import React, { useEffect, useState } from 'react';
import './Quiz.css';
import { Link } from 'react-router-dom';

function Quiz({ quiz }) {
  const [username, setUsername] = useState('');
  const { topic, MaximumMarks, endDate, createdBy, submissions, index } = quiz;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token=localStorage.getItem('auth-token');
        const res = await fetch(`https://tutortest.onrender.com/api/v1/by-id?createdBy=${createdBy}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        // Set username once data is fetched
        if (data.username) {
          setUsername(data.username);
        } else {
          console.log(quiz);
          setUsername('Unknown'); // Fallback if no username found
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUsername('Error fetching user');
      }
    };

    if (createdBy) fetchUser();
  }, [createdBy]);

  return (
    <div className='quiz-container'>
      <div className='quiz-header'>
        {/* <span>Quiz: {index + 1}</span> */}
        <span>Topic: {topic}</span>
      </div>
      
      <div className='quiz-details'>
        <span> Marks: {MaximumMarks}</span>
        <span>Submissions: {submissions.length}</span>
        <span>Last Date: {new Date(endDate).toLocaleDateString()}</span>
        <span>Created by: {username || 'Loading...'}</span>
      </div>
    </div>
  );
}

export default Quiz;
