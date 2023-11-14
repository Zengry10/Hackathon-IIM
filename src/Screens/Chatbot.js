import React, { useState } from 'react';
import '../Style/chatbot.css';

export default function ChatBot() {
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstQuestion, setIsFirstQuestion] = useState('Bonjour, posez-moi vos questions !');
  const [isFirstQuestionDisplay, setIsFirstQuestionDisplay] = useState(false);

  function SendDataOrder() {
    // Définir isLoading à true au début de la requête
    setIsLoading(true)
    setIsFirstQuestionDisplay(true)
    setIsFirstQuestion(userInput)
    console.log(isFirstQuestion + 'test')
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'access-control-allow-origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userInput
          }
        ]
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Réponse réseau non valide');
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setResponse(json.choices[0].message.content);
        setUserInput('')
        
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // Définir isLoading à false une fois la requête terminée (que ce soit avec succès ou en erreur)
        setIsLoading(false);
      });
  }

  return (
    <div className='container__chat-box'>
      <p className='container__chat-box__title'>Posez nous vos questions !</p>
      <div className='container__chat-box__soucontainer'>
        <div className='container__chat-box__soucontainer__response-height'>

        <div className='container__chat-box__soucontainer__question-container'>
           <p className='container__chat-box__soucontainer__response-container__reel-question'>{isFirstQuestion}</p>
        </div>

        <div className='container__chat-box__soucontainer__response-container'>
          {isLoading && <p className='container__chat-box__soucontainer__response-container__reel-response'>Laisse-moi réfléchir un peu...</p>}
          {!isLoading && <p className='container__chat-box__soucontainer__response-container__reel-response'>{response}</p>}
        </div>

      </div>




        <div className='container__chat-box__container-input-button' >
            <div className='container__chat-box__container-input-button_souscontainer'>
                <input
                    type="text"
                    name="chatbot"
                    id="chatbot"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className='container__chat-box__input'
                    placeholder='Votre question ici'
                />
                <svg onClick={SendDataOrder} className='buttonSend' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fe5656" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z"></path></svg>
            </div>
        </div>
      </div>

    </div>
  );

}


