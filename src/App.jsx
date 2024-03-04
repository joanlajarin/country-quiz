import './App.css'
import { useState, useEffect } from 'react'
import Number from './components/Numbers'
import Question from './components/Question'
import congrats from './images/congrats.svg'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]] // Swap elements at indices i and j
  }
  return array
}

function App() {

  const [contFinish, setContFinish] = useState(0)
  const [contCorrect, setContCorrect] = useState(0)
  const [position, setPosition] = useState(0)

  const [questionsData, setQuestionsData ] = useState([{
    "id": "",
    "question": "",
    "correctAnswer": "",
    "answers": ""
    }
  ])    
  
  const [countLoadQuestions, setCountLoadQuestions] = useState(0)
  const [loadQuestions, setLoadQuestions] = useState(false)


  const questions = [
    'Which country is ${randomCountry.capital} the capital ?',
    'Which country does this flag ${randomCountry.flags.png} belong to?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which country is ${randomCountry.capital} the capital ?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which country is ${randomCountry.capital} the capital ?',
    'Which country does this flag ${randomCountry.flags.png} belong to?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which country does this flag ${randomCountry.flags.png} belong to?',
  ]


  const fetchApi = () => {
 //fetch data api
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      let arrayData = []
      for(let i = 0; i < 10; i++){
        let arrayAnswers = []
        let option = questions[i].includes("randomCountry.name.common") ? "capital" : "name.common" 
        const numbers = new Set()

        while (numbers.size < 4) {
            const randomNumber = Math.floor(Math.random() * 251)
            numbers.add(randomNumber)
        }
        const randomNumbersArray = Array.from(numbers);
      
        for(let j = 0; j < 4;j++) {
            arrayAnswers.push({
            "id" : `${i}-${j}`,
            "answer" : option.replace("name.common", data[randomNumbersArray[j]]?.name.common)
                             .replace("capital", data[randomNumbersArray[j]]?.capital),
            "selected" : false
          })
        }
        arrayData.push({
          "id": i,
          "question": questions[i].replace('${randomCountry.capital}', data[randomNumbersArray[0]]?.capital)
                                  .replace('${randomCountry.flags.png}', data[randomNumbersArray[0]]?.flags.png)
                                  .replace('${randomCountry.name.common}', data[randomNumbersArray[0]]?.name.common),
          "correctAnswer": option.replace("name.common", data[randomNumbersArray[0]]?.name.common)
                                  .replace("capital", data[randomNumbersArray[0]]?.capital),
          "answers": shuffleArray(arrayAnswers),
          "tried": false,
          "correct":false
        })
      }
      setQuestionsData(arrayData)
      setCountLoadQuestions(prevCount => prevCount + 1)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {

    if(countLoadQuestions > 1) {
      setLoadQuestions(true)
    }
  },[countLoadQuestions])

  useEffect(() => {
    fetchApi()
  },[])

  const handleClickPosition = (position) => {
    setPosition(position)
  }
  
  const handleTried = (index, correct) => {

    setQuestionsData(prevQuestionsData => {
      const updatedQuestionsData = [...prevQuestionsData]
      updatedQuestionsData[index] = {
          ...updatedQuestionsData[index],
          tried: true,
          correct: correct
      }
      return updatedQuestionsData    
   })
   setContFinish(contFinish + 1)

   if(correct) {
      setContCorrect(contCorrect + 1)
    }
  }

  const handleSetSelect = (questionId, answerId) => {
    // Create a copy of the questionsData array
    const updatedQuestionsData = [...questionsData];
    // Find the question object in the array by its id
    const questionIndex = updatedQuestionsData.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
        // Find the answer object within the question's answers array by its id
        const answerIndex = updatedQuestionsData[questionIndex].answers.findIndex(answer => answer.id === answerId);
        if (answerIndex !== -1) {
            // Update the selected property of the answer object to true
            updatedQuestionsData[questionIndex].answers[answerIndex].selected = true;

            // Update the state with the modified array
            setQuestionsData(updatedQuestionsData);
        }
    }
}

  const handlePlayAgain = () => {
      
      setLoadQuestions(false)
      setPosition(0)
      setContFinish(0)
      setContCorrect(0) 
  }

  useEffect(() => {
    if(contFinish > 9) {
      fetchApi()
    } 
  },[contFinish])

  return (
    <div className='h-full w-full flex flex-col justify-center items-center '>
      <section className={`${contFinish !== 10 ? 'block' : 'hidden' } bg-[#343964] max-w-[820px] pt-[36px] pb-[62px] px-[140px] rounded-xl flex flex-col items-center`}>
        <h3 className='text-[#8B8EAB] text-[14px] font-semibold mb-[16px]'>Country Quiz</h3>
        <section className='flex mb-[32px] gap-[15px]'>
        {
          questionsData && (questionsData.map( question => (
            <Number key={question.id} id={question.id} check={question.tried} handleOnClick={handleClickPosition}/>
          )))
        }
        </section>
        <section className='flex flex-col items-center'>
          <Question 
            questionData={questionsData[position]}
            onClickTried={handleTried} 
            onClickHandleSetSelect={handleSetSelect}
          />
        </section>
      </section>
      <section  
        className={`${contFinish === 10 ? 'block' : 'hidden' } bg-[#343964] rounded-xl flex flex-col pt-[20px] px-[20px] items-center`}
      >
        <img src={congrats} className='w-full'></img>
        <h2 className='mt-[12px] text-[24px]'>Congrats! You completed the quiz.</h2>
        <h3 className='mt-[16px] text-[16px]'>You answer {contCorrect}/10 correctly</h3>
        <button 
          className={`mt-[48px] mb-[62px] rounded-xl py-[17px] px-[65px] font-semibold ${ loadQuestions ? ' bg-gradient-to-r from-[#E65895] to-[#BC6BE8]' : 'bg-[#808080]'}`}
          onClick={handlePlayAgain}
          >
          Play again
        </button>
      </section>
    </div>
  )
}

export default App
