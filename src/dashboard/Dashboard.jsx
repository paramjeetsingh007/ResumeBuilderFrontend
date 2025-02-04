import React, { useState, useEffect } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCarditem from './components/ResumeCarditem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      getResumesList();
    }
  }, [user]);

  const getResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        // Log and check the API response structure
        console.log('Resumes API response:', resp.data.data);

        // Ensure that we have an array before setting the state
        if (Array.isArray(resp.data.data)) {
          setResumeList(resp.data.data);
        } else {
          console.warn('Unexpected response structure, setting resumeList to empty array.');
          setResumeList([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching resumes:', error);
        setResumeList([]); // Fallback to an empty array on error
      });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resumes for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList && resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCarditem 
              resume={resume} 
              key={index} 
              refreshData={getResumesList} 
            />
          ))
        ) : (
          // Fallback skeleton components when no data is available
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
