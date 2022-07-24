import './css/BoxComponent.css'

import Login from './Login.js'
import Signup from './Signup.js'
import Users from './Users.js'
import Chat from './Chat.js'

import { useEffect, useState } from 'react'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Component			Main()
  * Description	  This component is at the top of the main page, contains the title, and 
  *               navigation buttons. Though it is quickly becoming the main page
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @see          Login.js
  * @see          Signup.js
  * @see          Users.js
  * @see          BoxComponent.css
  * @see          react
  * @return       Component Main
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Main = () => {
  let [state, setState] = useState({
    chat: null, // <div className='chatDiv'><Chat /></div> // getComponent('chat')
    users: null,
    login: null,
    signup: null,
    navbtns: null,
    activeComponents: [], // 'chat'
    userLoginInfo: { isLoggedOn: false },
  })

  let _activeComponents = state.activeComponents
  let _userLoginInfo = state.userLoginInfo

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * EventHandler			state.buttonsAreActive
    * Description     changes the symbol on the nav btn
    * Author		    Toby Martiny
    * Date		    6/13/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    let expandBtn = document.getElementById('expandBtn')
    state.navbtns != getComponent('navBtns')
      ? (expandBtn.innerText = '-')
      : (expandBtn.innerText = 'V')
  }, [state.navbtns])

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * eventHandler  []
  * Description	  update state imidiately on refresh
  * Author		    Toby Martiny
  * Date			    6/15/2022
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    _activeComponents.push('chat')

    updateState()
    // checkIfLoggedOn()
  }, [])

  useEffect(() => {
    // console.log(state.userLoginInfo)
    checkIfLoggedOn()
  }, [state.userLoginInfo])

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  checkIfLoggedOn()
  * Description	  
  * Author		    Toby Martiny
  * Date			    6/29/2022
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const checkIfLoggedOn = () => {
    if (state.userLoginInfo.isLoggedOn != false) {
      document.getElementById('appTitle').innerText = 'Chat App'
    } else {
      document.getElementById('appTitle').innerText =
        'Chat App - Please signup / login'
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  handleExpandBtn()
  * Description	  if 'navbtns' is inside _activeComponents, call openComponent, otherwise
  *               closeComponent
  * Author		    Toby Martiny
  * Date			    6/15/2022
  * @see          openComponent()
  * @see          closeComponent()
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const handleExpandBtn = () => {
    _activeComponents.indexOf('navbtns') == -1
      ? openComponent('navbtns')
      : closeComponent('navbtns')
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  updateState()
  * Description	  if an element is inside listed in the _activeComponents list, set its 
  *               corrosponding state element to its component form. Otherwise, if it's
  *               not listed in _activeComponents, set it to null. Also set 
  *               state.activeComponents to _activeComponents (_activeComponents will
  *               be lost on the next refresh)
  * Author		    Toby Martiny
  * Date			    6/15/2022
  * @see          getComponent()
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const updateState = () => {
    setState((state) => ({
      chat:
        _activeComponents.indexOf('chat') != -1 ? getComponent('chat') : null,
      users:
        _activeComponents.indexOf('users') != -1 ? getComponent('users') : null, //  || _userLoginInfo.username != undefined
      login:
        _activeComponents.indexOf('login') != -1 ? getComponent('login') : null,
      signup:
        _activeComponents.indexOf('signup') != -1
          ? getComponent('signup')
          : null,
      navbtns:
        _activeComponents.indexOf('navbtns') != -1
          ? getComponent('navbtns')
          : null,
      activeComponents: _activeComponents,
      userLoginInfo: _userLoginInfo,
    }))
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Method			  getComponent()
* Description	  take in the name of the component, return the tag/component
* Author		    Toby Martiny
* Date			    6/15/2022
* @return        component
* @param        String name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const getComponent = (name) => {
    switch (name) {
      case 'chat':
        return (
          <div className="chatDiv">
            <Chat getUserLoginInfo={getUserLoginInfo} />
          </div>
        ) // closeComponent={closeComponent}
      case 'users':
        return (
          <div className="userDiv">
            <Users
              closeComponent={closeComponent}
              getUserLoginInfo={getUserLoginInfo}
            />
          </div>
        )
      case 'login':
        return (
          <Login
            closeComponent={closeComponent}
            sendUserLoginInfo={sendUserLoginInfo}
          />
        )
      case 'signup':
        return (
          <Signup
            closeComponent={closeComponent}
            sendUserLoginInfo={sendUserLoginInfo}
          />
        )
      case 'navbtns':
        return getNavBtns()
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  getNavBtns()
  * Description	  Contains the navigation buttons of the website
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @return       NavBtns tags
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const getNavBtns = () => {
    if (!_userLoginInfo.isLoggedOn) {
      return (
        <div
          className={'buttonList col'}
          style={{
            right: '0',
            marginTop: '',
            // "marginRight": window.screen.width - right,
            borderBottomLeftRadius: '5px',
            border: 'solid steelblue 5px ',
          }}
          id="getNavBtns"
        >
          <button
            className="secondaryBtn fullWidth"
            onClick={() => {
              openComponent('login')
            }}
          >
            Login
          </button>
          <button
            className="secondaryBtn fullWidth"
            onClick={() => {
              openComponent('signup')
            }}
          >
            Signup
          </button>
          <button
            className="secondaryBtn fullWidth"
            onClick={() => {
              openComponent('users')
            }}
          >
            See Users
          </button>
        </div>
      )
    } else if (_userLoginInfo.isLoggedOn) {
      return (
        <div
          className="buttonList col"
          style={{
            right: '0',
            marginTop: '',
            // "marginRight": window.screen.width - right,
            borderBottomLeftRadius: '10px',
            border: 'solid steelblue 5px ',
          }}
          id="getNavBtns"
        >
          <button className="secondaryBtn fullWidth">
            {_userLoginInfo.username}
          </button>
          <button
            className="secondaryBtn fullWidth"
            onClick={() => {
              logoutUser()
            }}
          >
            Logout
          </button>
          <button
            className="secondaryBtn fullWidth"
            onClick={() => {
              openComponent('users')
            }}
          >
            See Users
          </button>
        </div>
      )
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  logoutUser()
  * Description	  updates _userLoginInfo to { isLoggedOn: false }, TODO: make it tell the
  *               database that the user is logged off too
  * Author		    Toby Martiny
  * Date			    6/15/2022
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const logoutUser = () => {
    _userLoginInfo = { isLoggedOn: false }
    updateState()
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  sendUserLoginInfo()--Call Back
  * Description	  Sent to a component as prop. takes in an object with elemnent 'username'
  *               and 'isLoggedOn'. It then updates state.
  * Author		    Toby Martiny
  * Date			    6/15/2022
  * @param        object loginInfo - ie. { username: username, isLoggedOn: isLoggedOn }
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const sendUserLoginInfo = (loginInfo) => {
    _userLoginInfo = loginInfo
    console.log('<Main />: updating state to ' + loginInfo)
    updateState()
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  getUserLoginInfo()--Call Back
  * Description	  Sent to a component as prop. Returns boolean for if the user is logged
  *               on or off.
  * Author		    Toby Martiny
  * Date			    6/15/2022
  * @return       boolean state.userLoginInfo
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const getUserLoginInfo = () => {
    // updateState();
    return _userLoginInfo
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  closeComponent()--Call Back
  * Description	  Sent to a component as prop to let exit button delete itself from the form
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @param        String name
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const closeComponent = (name) => {
    _activeComponents = _activeComponents.filter((comp) => comp != name)
    updateState()
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Method			  openComponent()
  * Description	  loops through state._activeComponents to find if there are any of that 
  *               component already being rendered. It also ensures that Login and Signup
  *               aren't open at the same time. It then creates a new array that meet the 
  *               specifications and returns it.
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @param        String name - ex. "Component"
  * @param        React Component component - ex. <Component />
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const openComponent = (name) => {
    // handle component conflicts
    if (_activeComponents.indexOf(name) != -1) {
      // if component is in the list, do nothing
      console.log('Component already active, cannot render')
    } else {
      // otherwise,
      console.log('Rendering...')
      if (name == 'login')
        // make sure that if its the login or sign up page, that the other isn't open too,
        _activeComponents = _activeComponents.filter((comp) => comp != 'signup')
      else if (name == 'signup')
        _activeComponents = _activeComponents.filter((comp) => comp != 'login')

      _activeComponents.push(name) // then add to the component to the list
    }

    updateState() // and refresh all the components
  }

  return (
    <div className="component fullScreen Column">
      <div className="header" style={{ background: 'steelblue' }}>
        <h3
          style={{
            paddingLeft: '3vh',
            color: 'rgb(24, 26, 27)',
          }}
          id="appTitle"
        >
          Chat App - Please signup / login
        </h3>
        <div style={{ padding: '20px 5vh' }}>
          <button
            className="secondaryBtn"
            id="expandBtn"
            onClick={() => {
              handleExpandBtn()
            }}
          >
            V
          </button>
        </div>
      </div>
      <div className="navbox">{state.navbtns}</div>
      {state.login}
      {state.signup}

      <div
        className="scrollOverflow"
        style={{
          display: 'flex',
          flexFlow: 'row',
          height: '100%',
        }}
      >
        {state.users}
        {state.chat}
      </div>
    </div>
  )
}

export default Main
