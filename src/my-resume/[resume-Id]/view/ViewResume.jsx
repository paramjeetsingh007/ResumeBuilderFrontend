import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo,setResumeInfo]=useState()
    const {resumeId}=useParams()

    useEffect(()=>{
        GetResumeInfo()
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
            
        })
    }
    const HandleDownload=()=>{
        window.print()
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id='no-print'>

       
        <Header/>
         <div >
            <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generate Resume is ready</h2>
            <p className='text-center text-gray-800'>Now You are ready to download your resume and you can  share unique resume url with your friends and family</p>
            <div className='flex justify-between px-44 my-19 mb-3'>
                <Button onClick={HandleDownload}>Download</Button>
                <RWebShare
        data={{
          text: "Hello,Everyone , This is my resume please open url to see ",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+'/view',
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume "
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Share</Button>
      </RWebShare>
                
            </div>
         </div>
        
         </div>
       
         <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreview/>
         </div>
       
      
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume