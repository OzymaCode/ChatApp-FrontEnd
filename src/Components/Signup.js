import './css/BoxComponent.css'
import React, { createRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Component			  Signup()
  * Description	  This component lets a user sign up with a username and password and 
  *               store it in the servers database.
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @param		    props
  * @return       Signup form
  * @see          react
  * @see          react-router-dom
  * @see          ./css/BoxComponent.css
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Signup = (props) => {
  let usernameInput = createRef()
  let passwordInput = createRef()

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    * EventListener	    []
    * Description	      auto selectes the username field when a key is pressed
    * Author		    Toby Martiny
    * Date			      6/15/2022
    * History           6/14/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    let messageInputArea = document.getElementById('signupUsernameInput')
    messageInputArea.focus()
  }, [])

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      * EventListener	    keypress
      * Description	      makes focus move to the next element if Enter is clicked
      * Author		    Toby Martiny
      * Date			    6/15/2022
      * History           6/14/2022
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  document.addEventListener('keypress', (e) => {
    // on key press
    // console.log(e.key)
    if (e.key === 'Enter') {
      if (
        document.activeElement ===
        document.getElementById('signupUsernameInput')
      ) {
        document.getElementById('signupPasswordInput').focus()
      } else if (
        document.activeElement ===
        document.getElementById('signupPasswordInput')
      ) {
        document.getElementById('signupSubmitBtn').click()
      }
    }
  })

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  handleSubmit()-async
  * Description	  Makes a post request to the server to store new user. it then closes the
  *               form
  * Author		    Toby Martiny
  * Date			    6/13/2022
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const handleSubmit = async (e) => {
    let userValidation = true // later add regex to test if user is valid and available
    if (userValidation) {
      // user information (in json format)
      let user = JSON.stringify({
        username: usernameInput.current.value,
        password: passwordInput.current.value,
      })

      console.log('a')
      // Send user to server
      let result = await fetch(
        'https://chatapp-backend-c.herokuapp.com/users/signup',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: user,
        },
      ).then((res) => {
        return res.json()
      })

      console.log(result)

      // console.log(result)

      if (result.status == null) {
        props.sendUserLoginInfo({
          username: result.username, // usernameInput.current.value,
          isLoggedOn: true,
        }) // tell main page that the user is logged in/signed up
        props.closeComponent('signup') // close signup form
      } else {
        alert('User already exists')
      }
    }
  }

  return (
    <div className="Container fullScreen absoluteCenter tintedBackground roundedEdges">
      <div className="component absoluteCenter padded roundedEdges">
        <div className="header">
          <h1 id="title">Sign Up</h1>
          <button
            className="secondaryBtn"
            id="signupExitBtn"
            onClick={() => {
              props.closeComponent('signup')
            }}
          >
            X
          </button>
        </div>

        <br />
        <input
          type="text"
          className="username roundedEdges"
          name="username"
          placeholder="Username"
          id="signupUsernameInput"
          ref={usernameInput}
        />
        <br />
        <input
          type="text"
          className="password roundedEdges"
          name="password"
          placeholder="Password"
          id="signupPasswordInput"
          ref={passwordInput}
        />
        <br />
        <button
          className="largeBtn primaryBtn"
          id="signupSubmitBtn"
          onClick={() => {
            handleSubmit()
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Signup
