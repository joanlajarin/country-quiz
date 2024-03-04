import { useState, useEffect } from "react"
import Answer from "./Answer"

export default function Question({questionData, onClickTried, onClickHandleSetSelect}) {
    console.log(questionData)

    const [questionAnswered, setQuestionAnswered] = useState(false)

    const handleClickAnswer = (correct = false) => {
        onClickTried(questionData.id,correct) 
    }

    const handleSetSelect = (key) => {
        onClickHandleSetSelect(questionData.id, key)
    }

    useEffect(() => {
        setQuestionAnswered(questionData.tried)
    },[questionData])
    
    return (
        <div>
            <h1 className='text-[20px] mb-[40px] flex gap-[5px] items-center'>
            {
                questionData.question.split(/(https?:\/\/\S+\.png)/).map((part, index) => {
                if (part.match(/(https?:\/\/\S+\.png)/)) {
                    return <img className="w-[30px] h-[20px] rounded" key={index} src={part} alt="Flag" />
                } else {
                    return <span key={index}>{part}</span>
                }
                })
            }
            </h1>
            <div className='grid grid-cols-2 gap-[24px] w-[500px]'> 
                {
                    questionData.answers && (
                        questionData.answers.map((answer, index) => 
                                <Answer key={answer.id} 
                                    id={answer.id} 
                                    answer={answer.answer} 
                                    answerCorrect={questionData.correctAnswer} 
                                    questionAnswered={questionData.tried} 
                                    stopClick={handleClickAnswer} 
                                    selectedElement={answer.selected}
                                    onSetSelect={() => handleSetSelect(answer.id)}
                                    />                                  
                        )
                    )   
                }
            </div>
        </div>
    )    
}