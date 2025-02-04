import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"


function PersonalDetail({enabledNext}) {

    const params= useParams()

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [formData,setFormData]=useState()
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      console.log(params);
      
      
    },[])

    const handleInputChange=(e)=>{
      enabledNext(false)
       const {name,value}=e.target;

       setFormData({
        ...formData,[name]:value
       })
       setResumeInfo({
        ...resumeInfo,
        [name]:value
       })
    }
    const onSave=(e)=>{
      e.preventDefault();
      setLoading(true)
      const data={
        data:formData
      }
      GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
           console.log(resp);
           enabledNext(true)
           setLoading(false)
           toast("Details updated")

      },(error)=>{
        setLoading(false)

      })
     
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Personal Detail</h2>
        <p>Get Started With the basic information</p>
        <form onSubmit={onSave}>
          <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
              <label className='text-sm'> First Name</label>
              <Input name='firstName' onChange={handleInputChange} required defaultValue={resumeInfo?.firstName}/>
            </div>
            <div>
              <label className='text-sm'> Last Name</label>
              <Input name='lastName' onChange={handleInputChange} required defaultValue={resumeInfo?.lastName}/>
            </div>
            <div className='col-span-2'> 
              <label className='text-sm'>Job Title</label>
              <Input name='jobTitle' onChange={handleInputChange} required defaultValue={resumeInfo?.jobTitle}/>
            </div>
            <div className='col-span-2'> 
              <label className='text-sm'>Address</label>
              <Input name='address' onChange={handleInputChange} required defaultValue={resumeInfo?.address}/>
            </div>
            <div> 
              <label className='text-sm'>Phone</label>
              <Input name='phone' onChange={handleInputChange} required defaultValue={resumeInfo?.phone}/>
            </div>
            <div > 
              <label className='text-sm'>Email</label>
              <Input name='email' onChange={handleInputChange} required defaultValue={resumeInfo?.email}/>
            </div>
          </div>
          <div className='mt-3 flex justify-end'>
            <Button type='submit' disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'} </Button>
          </div>
        </form>
     </div>
  )
}

export default PersonalDetail