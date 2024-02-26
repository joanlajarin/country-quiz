import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {

  const [questions, setQuestions ] = useState([
    'Which country is Kuala Lumpur the capital ?',
    'Which country is Kuala Lumpur the capital ?',
    'Which capital is "Country" the country ?',
    'Which capital is "Country" the country ?',
    'Which regions is "Country" the country?',
    'Which regions is "Country" the country?',
    'Which currency is "Country" the country?',
    'Which currency is "Country" the country?',
    'Which subregions is "Country" the country?',
    'Which subregions is "Country" the country?'
  ])

  useEffect(() => {
    //fetch data api
  },[])
  return (
      <section className="bg-[#393F6E]">
        <h3 className='text-[#8B8EAB] text-[14px] font-semibold'>Country Quiz</h3>
        <section className='flex'>

        </section>
        <section className='flex flex-col'>
          <h1>Which country is Kuala Lumpur the capital?</h1>
        <div className='grid grid-cols-2'> 
          <div className='bg-[#343964] rounded-md'>
            <span>Sweden</span>
          </div>
          <div className='bg-[#343964] rounded-md'>
            <span>Vietnam</span>
          </div>          
          <div className='bg-[#343964] rounded-md'>
            <span>Malasya</span>
          </div>          
          <div className='bg-[#343964] rounded-md'>
            <span>Austria</span>
          </div>
        </div>
        </section>
      </section>
  )
}

export default App
