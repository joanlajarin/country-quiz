import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {

  const [questions, setQuestions ] = useState([
    'Which country is Kuala Lumpur the capital ?',
    'Which country does this flag ${flag} belong to?',
    'Which country is Kuala Lumpur the capital ?',
    'Which capital is "Country" the country ?',
    'Which capital is "Country" the country ?',
    'Which regions is "Country" the country?',
    'Which regions is "Country" the country?',
    'Which currency is "Country" the country?',
    'Which currency is "Country" the country?',
    'Which subregions is "Country" the country?',
  ])

  useEffect(() => {
    //fetch data api
  },[])
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <section className="bg-[#393F6E] max-w-[820px] pt-[36px] pb-[62px] px-[140px] rounded-xl flex flex-col items-center">
        <h3 className='text-[#8B8EAB] text-[14px] font-semibold mb-[16px]'>Country Quiz</h3>
        <section className='flex mb-[32px]'>
        <div className='bg-gradient-to-r from-[#E65895] to-[#BC6BE8] size-[40px] rounded-full flex justify-center items-center'>
          <span>1</span>
        </div>
        </section>
        <section className='flex flex-col items-center'>
          <h1 className='text-[20px] mb-[40px]'>Which country is Kuala Lumpur the capital?</h1>
        <div className='grid grid-cols-2 gap-[24px] w-[450px]'> 
          <div className='bg-[#343964] rounded-xl py-[15px] px-[35px] flex justify-center'>
            <span className='text-[16px] font-semibold'>Sweden</span>
          </div>
          <div className='bg-gradient-to-r from-[#E65895] to-[#BC6BE8] rounded-xl py-[15px] px-[35px] flex justify-center'>
            <span className='text-[16px] font-semibold'>Vietnam</span>
          </div>          
          <div className='bg-[#343964] rounded-xl py-[15px] px-[35px] flex justify-center'>
            <span className='text-[16px] font-semibold'>Malasya</span>
          </div>          
          <div className='bg-[#343964] rounded-xl py-[15px] px-[35px] flex justify-center'>
            <span className='text-[16px] font-semibold'>Austria</span>
          </div>
        </div>
        </section>
      </section>
    </div>
  )
}

export default App
