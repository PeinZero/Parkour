import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { useIonRouter } from "@ionic/react";
import { Redirect, Route, withRouter } from 'react-router-dom'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from './components/Menu/Menu'
import ParkerHome from './pages/Parker/ParkerHome'
import Login from './pages/AuthPages/Login'
import Signup from './pages/AuthPages/Signup'


const App: React.FC = (props) => {
  const [userID, setUserID] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  const router = useIonRouter();

  useEffect(() => {
    const token = localStorage.getItem('token')
    const expiryDate = localStorage.getItem('expiryDate')

    if (!token || !expiryDate) {
      return
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler()
      return;
    }

    const userID = localStorage.getItem('userID')
    const remainingTimeInMs =
      new Date(expiryDate).getTime() - new Date().getTime()

    setIsAuth(true)
    setToken(token)
    setUserID(userID)
    setAutoLogout(remainingTimeInMs)
  })

  const loginHandler = (event, authData) => {
    event.preventDefault()
    axios.post('http://localhost:5000/auth/login', {
      phone: authData.phone,
      password: authData.password, 
    })
      .then((res) => {
        console.log(res)

        setIsAuth(true)
        setToken(res.data.token)
        setUserID(res.data.userID)

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userID', res.data.userID)

        const remainingTimeInMs = 60 * 60 * 1000
        const expiryDate = new Date(new Date().getTime() + remainingTimeInMs)

        localStorage.setItem('expiryDate', expiryDate.toISOString())
        setAutoLogout(remainingTimeInMs)
        // set Auto-Logout Here
      })
      .catch((err) => {
        // Validation Check.
        if (err.response.status === 422) {
          console.log('Validation Failed')
        }

        // Authentication Check.
        if (err.response.status !== 200 && err.response.status != 201) {
          console.log('Could not authenticate you!')
        }
        setIsAuth(false)
      })
  }

  const signupHandler = (event, authData) => {
    event.preventDefault()

    axios.post('http://localhost:5000/auth/signup', {
      username: authData.username,
      phone: authData.phone,
      email: authData.email,
      password: authData.password
    })
    .then( res => {
      setIsAuth(false);

    })
    .catch((err) => {
      if (err.response.status === 422){
       console.log("Validation Failed!")
      }

      if (err.response.status != 200 && err.response.status !== 201){
        console.log("Creating a user failed!")
      }
      setIsAuth(false)
    })
  }

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          {/* <Menu /> */}
          <IonRouterOutlet id='main'>
            <Route path='/' exact={true}>
              {isAuth ? <div><h1>Successfully Logged In</h1><br /><button onClick={logoutHandler}>Logout</button></div> : <Redirect to='/page/login' /> }
            </Route>
            <Route path='/page/login' exact={true} render={props => (
              <Login {...props} onLogin={loginHandler} />
            )}/>
            <Route path='/page/signup' exact={true} render={props => (
              <Signup {...props} onSignup={signupHandler} />
            )}/>
            <Redirect to="/" /> 
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
