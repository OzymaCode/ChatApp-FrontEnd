import './css/BoxComponent.css'
import React, { useEffect, useState } from 'react'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Component	  Users()
  * Description	  Renders a list of each user name
  * Author		    Toby Martiny
  * Date			    6/13/2022
  * @param        props
  * @see          Login.js
  * @see          Signup.js
  * @see          Users.js
  * @see          BoxComponent.css
  * @see          react
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Users = (props) => {
  useEffect(() => {
    getUsers()
  }, [])

  const [state, setState] = useState({
    users: [],
    newUser: false,
  })
  let _newUser = false

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * updateState	updateState()
    * Description	updates state with what ever new users are added through the parameter
    *               and stores the _newUser variable for the future (because its going to
    *               be deleted when the state changes)
    * Author		Toby Martiny
    * Date	        6/13/2022
    * @param        array _users - of user.username's
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const updateState = (_users) => {
    setState((state) => ({
      users: _users,
      newUser: _newUser,
    }))
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * eventHandler	props.getUserLoginInfo().username
    * Description	update the userlist any time there is a new user signed up.
    * Author		Toby Martiny
    * Date	        6/13/2022
    * @see          getUsers()
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    if (props.getUserLoginInfo().username != undefined && _newUser == false) {
      // if a user is logged in but not stored in the _newUser variable, update the users component
      _newUser = true
      getUsers()
    } else if (
      props.getUserLoginInfo().username == undefined &&
      _newUser != false
    ) {
      // if a user is not logged in but a user is stored in the _newUser variable, update the users component
      _newUser = false
    }
  }, [props.getUserLoginInfo().username])

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method		getUsers()-async
    * Description	make api call to server and receive json of users. pass users to state
    * Author		Toby Martiny
    * Date	        6/13/2022
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const getUsers = async () => {
    const res = await fetch(
      'https://chatapp-backend-c.herokuapp.com/users',
    ).then((res) => res.json())

    const resMap = await res.map((user) => {
      return user.username
    })

    updateState(resMap)
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method		formatUsers()
    * Description	formats users into html so they can be rendered into the page
    * Author		Toby Martiny
    * Date	        6/13/2022
    * @return       formattedUsers tags
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const formatUsers = () => {
    if (state.users == null) {
      return <h1>No Users...</h1>
    } else {
      let formattedUsers = state.users.map((user, i) => {
        return <li key={i}>{user}</li>
      })

      return formattedUsers
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Method		clearUsers()-async
    * Description	clears user list by making a call to the server
    * Author		Toby Martiny
    * Date	        6/13/2022
    * @return       formattedUsers tags
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const clearUsers = async () => {
    let res = await fetch('https://chatapp-backend-c.herokuapp.com/clear')
    getUsers()
  }

  return (
    <div
      className="  "
      onClick={() => {
        getUsers()
      }}
    >
      <div className="  fullScreen">
        <div className="">
          <h1 style={{ margin: '20px' }}>Users:</h1>
          <div className="flexRow ">
            {/* <button
              className="secondaryBtn"
              id="clearUsersBtn"
              onClick={() => {
                clearUsers()
              }}
            >
              Clear Users
            </button> */}
            <button
              className="secondaryBtn"
              onClick={() => {
                props.closeComponent('users')
              }}
            >
              X
            </button>
          </div>
        </div>
        <br />
        <ul className="userList">{formatUsers()}</ul>
      </div>
    </div>
  )
}
export default Users
