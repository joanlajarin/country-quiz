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


  const [questionsData, setQuestionsData ] = useState([{
    "id": "",
    "question": "",
    "correctAnswer": "",
    "answers": ""
    }
  ])

  const [position, setPosition] = useState(0)
  const questions = [
    'Which country is ${randomCountry.capital} the capital ?',
    'Which country does this flag ${randomCountry.flags.png} belong to?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which regions is ${randomCountry.name.common} the country?',
    'Which currency is ${randomCountry.name.common} the country?',
    'Which country is ${randomCountry.capital} the capital ?',
    'Which country does this flag ${randomCountry.flags.png} belong to?',
    'Which capital is ${randomCountry.name.common} the country ?',
    'Which regions is ${randomCountry.name.common} the country?',
    'Which currency is ${randomCountry.name.common} the country?',
  ]

  useEffect(() => {
    //fetch data api
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let arrayData = []
      let randomCountry = ""
      let randomNumber = ""
      let randomNumber1 = ""
      let randomNumber2 = ""
      let randomNumber3 = ""

      for(let i = 0; i < 10; i++){
        randomNumber = Math.floor(Math.random() * 251)
        randomCountry = data[randomNumber]
        console.log(randomCountry)
        let arrayAnswers = []
        console.log(randomCountry)
       
        // if(questions[i].includes("randomCountry.capital")) {

        // }
        arrayAnswers.push({
          "id" : `${i}-0`,
          "answer" : randomCountry.name.common,
          "selected" : false
        })
          do {
            randomNumber1 = Math.floor(Math.random() * 251)
          } while(randomNumber1 === randomCountry) 
          arrayAnswers.push({
            "id" : `${i}-1`,
            "answer" : data[randomNumber1].name.common,
            "selected" : false
          })

          do {
            randomNumber2 = Math.floor(Math.random() * 251)
          } while(randomNumber2 === randomCountry || randomNumber2 === randomNumber1) 
          arrayAnswers.push({
            "id" : `${i}-2`,
            "answer" : data[randomNumber2].name.common,
            "selected" : false
          })

          do {
            randomNumber3 = Math.floor(Math.random() * 251)
          } while(randomNumber3 === randomCountry || randomNumber3 === randomNumber1 ||randomNumber3 === randomNumber2 ) 
          arrayAnswers.push({
            "id" : `${i}-3`,
            "answer" : data[randomNumber3].name.common,
            "selected" : false
          })
    
        arrayData.push({
          "id": i,
          "question": questions[i].replace('${randomCountry.capital}', randomCountry.capital)
                                  .replace('${randomCountry.flags.png}', randomCountry.flags.png)
                                  .replace('${randomCountry.name.common}', randomCountry.name.common),
          "correctAnswer": randomCountry.name.common,
          "answers": shuffleArray(arrayAnswers),
          "tried": false,
          "correct":false
        })
        console.log(arrayData)
      }
      setQuestionsData(arrayData)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  const handleClickPosition = (position) => {
    setPosition(position)
  }
  
  useEffect(() => {
    console.log("contFinish")
    console.log(contFinish)
  },[contFinish])

  useEffect(() => {
    console.log("contCorrect")
    console.log(contCorrect)
  },[contCorrect])
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
};

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
        <button className='mt-[48px] mb-[62px] bg-gradient-to-r from-[#E65895] to-[#BC6BE8] rounded-xl py-[17px] px-[65px] font-semibold'>
          Play again
        </button>
      </section>
    </div>
  )
}

export default App
