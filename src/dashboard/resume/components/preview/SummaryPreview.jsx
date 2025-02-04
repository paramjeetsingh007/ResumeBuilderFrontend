
import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
   <p className='text-[15px] ' >
      {resumeInfo?.summery}
   </p>
  )
}

export default SummaryPreview