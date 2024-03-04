import { useState } from "react"
import checkRound from '../images/Check_round_fill.svg'
import closeRound from '../images/Close_round_fill.svg'
import { useEffect } from "react"

export default function Answer({answer, answerCorrect, questionAnswered, stopClick, selectedElement, onSetSelect}) {
    
    const [selected, setSelected] = useState(false)
    const [correct,setCorrect] = useState("")
    const [showCorrect,setShowCorrect] = useState(false)
    const [stopSelecting, setStopSelection] = useState(false)

     const handleClickAnswer = () => {
         if(!stopSelecting) {
            setShowCorrect(true)
            setStopSelection(true)
            setSelected(true) 
            onSetSelect() 
            stopClick(correct)
         }
     }

      useEffect(() => {
          setStopSelection(questionAnswered)
          if (correct) {
            setShowCorrect(true)
          }

      },[questionAnswered])

      useEffect(() => {
        setShowCorrect(questionAnswered && correct)
      },[correct])

     useEffect(() => {
        if(selectedElement) {
            setSelected(true)
        }
        setCorrect(answerCorrect === answer )
     },[answer])
     
    return (
        <button 
            className={`${ selected ? 'bg-gradient-to-r from-[#E65895] to-[#BC6BE8]' : 'bg-[#393F6E]'} rounded-xl py-[15px] px-[30px] flex justify-center items-center`}
            onClick={handleClickAnswer}
        >
            <span className='text-[16px] font-semibold w-[150px]'>{answer}</span>
            <div className="relative flex w-[16px] h-[16px]">
                <img 
                    id={`img-${answer.id}`}
                    src={correct ? checkRound : closeRound}
                    className={`size-[16px] absolute ${showCorrect ? 'block' : 'hidden'}`}
                ></img>
            </div>
        </button>
    )
}