import './css/BoxComponent.css';
import React, { createRef, useEffect } from 'react';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Component			  Login()
  * Description	  This component lets a user log in to the server if they provide the
  *               correct username and password. 
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @param		    props
  * @return       Login form
  * @see          react
  * @see          react-router-dom
  * @see          ./css/BoxComponent.css
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Login = (props) => {

  let usernameInput = createRef();
  let passwordInput = createRef();




  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    * EventListener	    []
    * Description	      auto selectes the username field when a key is pressed
    * Author		    Toby Martiny
    * Date			      6/15/2022
    * History           6/14/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    let messageInputArea = document.getElementById("loginUsernameInput")
    messageInputArea.focus()
  }, [])


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * EventListener	    keypress
    * Description	      makes focus move to the next element if Enter is clicked
    * Author		    Toby Martiny
    * Date			    6/15/2022
    * History           6/14/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  document.addEventListener("keypress", (e) => {   // on key press
    if (e.key === "Enter") {
      if (document.activeElement === document.getElementById("loginUsernameInput")) {
        document.getElementById("loginPasswordInput").focus();
      } else if (document.activeElement === document.getElementById("loginPasswordInput")) {
        document.getElementById("loginSubmitBtn").click();
      }
    } 
    // else if (e.key === "Escape") {
    //   console.log('exscape')
    //   document.getElementById("loginExitBtn").click();
    // }
  })


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  loginUser()
  * Description	  Makes a post request to the server with the username and password in the
  *               body. if successful, will redirect to the main page with the user now
  *               logged on. Otherwise shows an error message
  * Author		    Toby Martiny
  * Date			    6/13/2022
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  let loginUser = async () => {
    let user = JSON.stringify({               // put the user information in json format
      username: usernameInput.current.value,
      password: passwordInput.current.value
    })

    let result = await fetch('/users/login', {    // sends request to server with the user
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: user
    }).then(res => res.json())



    switch (result.statusCode) {
      case 1: // if successful, return to home page
        props.sendUserLoginInfo({ username: usernameInput.current.value, isLoggedOn: true });    // tell main page that the user is logged in
        props.closeComponent('login');     // close login form
        break;
      case 0: 
        // document.getElementById('title').innerText = "Login"
        alert("Incorrect Password");
        break;
      case -1:
        alert("User Not Found");
        break;
    }




    if (result.statusCode == 1) {   // if successful, return to home page
      console.log("<Login />: user logged in")
      
    } 
  }

  return (
    <div className="Container fullScreen absoluteCenter tintedBackground roundedEdges">
      <div className="component absoluteCenter padded roundedEdges">
        <div className="header">
          <h1 id="title">Login</h1>
          <div>
            <button className="secondaryBtn" tabIndex='0' id="loginExitBtn" onClick={() => { props.closeComponent('login') }}>X</button>
          </div>
        </div>

        <br />
        <input type="text" className="username roundedEdges" tabIndex='0' name="username" placeholder="Username" id='loginUsernameInput' ref={usernameInput} /><br />
        <input type="text" className="password roundedEdges" tabIndex='0' name="password" placeholder="Password" id='loginPasswordInput' ref={passwordInput} /><br />
        <button className="largeBtn primaryBtn" tabIndex='0' id="loginSubmitBtn" onClick={() => { loginUser() }}>Login In</button>
      </div>
    </div>
  )
}

export default Login;
