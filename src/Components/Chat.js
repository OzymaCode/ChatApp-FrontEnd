import './css/BoxComponent.css'

import React, { createRef, useState, useEffect, useRef } from 'react'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Component	  Chat()
  * Description	  lets users type text, and enter it into the servers message database,
  *               where it is then displayed along with all the other messages in a 
  *               list
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @see          BoxComponent.css
  * @see          react
  * @return       Component Chat 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Chat = (props) => {
  let messageInputText = createRef()
  let chatRef = useRef()

  let [messages, setMessages] = useState([])
  let [isDisabled, setIsDisabled] = useState(true)
  let _messages = []

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * EventHandler	[]
    * Description	Checks if the user is logged in or not and disables or enables the message
    *               textarea acordingly. Also makes the ENTER key submit input messages
    * Author		Toby Martiny
    * Date	        6/14/2022
    * History       6/13/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    // makes enter key submit message
    let input = document.getElementById('messageInput')
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        document.getElementById('messagePostBtn').click()
      }
    })

    console.log('a')
    fillMessages()
  }, [])

  useEffect(() => {
    const messageList = document.getElementById('messageList')
    messageList.scrollTop = messageList.scrollHeight
  }, [messages])

  const updateState = (type) => {
    switch (type) {
      case 'newMessage':
        console.log([_messages])
        setMessages((messages) => [...messages, _messages])
        break
      case 'startUp':
        console.log([..._messages])
        setMessages((messages) => [..._messages])
        break
    }
  }

  const fillMessages = async () => {
    // fill messages array with messages stored in database
    try {
      await fetch('/users/post', {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          _messages = res
          updateState('startUp')
        })
    } catch (error) {
      console.log(error)
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method    	    chatClicked()
    * Description	    sets focus on click
    * Author		    Toby Martiny
    * Date			    6/15/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const chatClicked = () => {
    // when the chat is clicked
    let chatComponent = document.getElementById('chatComponent')
    let messageInputArea = document.getElementById('messageInput')
    chatComponent.focus() // select the chat
    messageInputArea.disabled = !props.getUserLoginInfo().isLoggedOn // if the user is logged on, enable the input area. otherwise disable it
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * EventListener	    keypress
    * Description	    Scrolls to the bottom of the message list and selects the textArea
    *                   every time a key is pressed
    * Author		    Toby Martiny
    * Date			    6/15/2022
    * History           6/14/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  document.addEventListener('keypress', (e) => {
    // on key press
    let chatComponent = document.getElementById('chatComponent')
    if (chatComponent === document.activeElement) {
      let messageInputArea = document.getElementById('messageInput')
      messageInputArea.focus() // and select the input area

      // if the chat component is selected
      const messageList = document.getElementById('messageList')
      messageList.scrollTop = messageList.scrollHeight // scroll to bottom of page
    }
  })

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method      	post()--async
    * Description	sends the message to the server, fills the message list with old messages 
    *               and the users latest one, updates the text field to empty
    * Author		Toby Martiny
    * Date	        6/13/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const post = async () => {
    let messageJson = JSON.stringify({
      username: props.getUserLoginInfo().username,
      message: messageInputText.current.value,
    })

    document.getElementById('messageInput').value = ''

    let result = await fetch('/users/post', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: messageJson,
    })
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        let lastOutput = result[result.length - 1]
        _messages = lastOutput
        updateState('newMessage')
      })
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method      	formatMessages()
    * Description	arranges all the messages into an array of li tags
    * Author		Toby Martiny
    * Date	        6/13/2022
    * @return       tag messages
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const formatMessages = () => {
    return messages.map((mes, i) => {
      return (
        <div key={i} className="messageLi">
          {mes.username}: {mes.message}
        </div>
      )
    })
  }

  return (
    <div
      className="component fullScreen Column"
      id="chatComponent"
      tabIndex="0"
      ref={chatRef}
      onClick={() => {
        chatClicked()
      }}
    >
      <h1 className="margin" id="messagesTitle">
        Messages
      </h1>

      <div className="component fullScreen Column scrollOverflow messageList">
        <div className="messageInputArea">
          <textarea
            type="text"
            id="messageInput"
            className="messageInput"
            disabled={isDisabled}
            ref={messageInputText}
          />
          <button
            className="primaryBtn smallBtn"
            id="messagePostBtn"
            onClick={() => {
              post()
            }}
          >
            Send
          </button>
        </div>
        <div className="colReverse">
          <div className="messageListb scrollOverflow" id="messageList">
            {formatMessages()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
