import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreviwe from './preview/EducationalPreviwe'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  
  
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* Personal detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

      {/* Professional Experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>

      {/* Educational detail */}

     <EducationalPreviwe resumeInfo={resumeInfo}/>
      {/* Skils */}
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview