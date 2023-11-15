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
                    placeholder='Posez moi une question !'
                />
                <svg onClick={SendDataOrder} className='buttonSend' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fe5656" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z"></path></svg>
            </div>
            <div className='container-microphone'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="#000000" d="M128 174a46.06 46.06 0 0 0 46-46V64a46 46 0 0 0-92 0v64a46.06 46.06 0 0 0 46 46ZM94 64a34 34 0 0 1 68 0v64a34 34 0 0 1-68 0Zm40 141.75V232a6 6 0 0 1-12 0v-26.25A78.09 78.09 0 0 1 50 128a6 6 0 0 1 12 0a66 66 0 0 0 132 0a6 6 0 0 1 12 0a78.09 78.09 0 0 1-72 77.75Z"></path></svg>
            </div>
            <div className='container-camera'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#ffffff" fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"></path></svg>
            </div>

        </div>
      </div>

    </div>
  );

}


