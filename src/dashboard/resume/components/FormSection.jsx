import React,{useState} from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1)
  const [enabledNext,setEnabledNext]=useState(false)
  const {resumeId}=useParams();
  return (
    <div>
      <div className='flex items-start justify-between'>
        {/* <Button variant='outline' size='sm' className='flex gap-2' > <LayoutGrid/>Theme</Button> */}
        <div className='flex gap-5'>
            <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
         
          </div>
        <div className='flex gap-2'>
          {
            activeFormIndex>1&&< Button size='sm' onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>
          }
        <Button disabled={enabledNext} className='flex gap-2' size='sm' onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next<ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}

      {activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==2? <Summery enabledNext={(v)=>setEnabledNext(v)}/>
        :activeFormIndex===3?
      <Experience />:activeFormIndex===4? <Education/>:activeFormIndex==5?<Skills/>
      :activeFormIndex === 6 ? 
        <Navigate to={'/my-resume/'+resumeId+'/view'} />
      : null}
    


      
   
     

       
      {/* Summery */}


      {/* Experience */}

      {/*  Educational Detail*/}

      {/* skills */}
    </div>
  )
}

export default FormSection