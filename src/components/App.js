import React, { useContext, createContext } from "react"
import Signup from "./authentication/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./authentication/Profile"
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"
import Dashboard from "./google-drive/Dashboard"
const UserContext = createContext();
function App(props) {
  const tsData = 'lauasndas';
  if (props.disableUpdateProfiles) {



    return (
      <>
        <UserContext.Provider value={props.dragMode}>
          <Router>
            <AuthProvider>
              <Switch>
                {/* Drive */}
                <PrivateRoute exact path="/" testData='test data' component={Dashboard} />
                <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

                {/* Auth */}
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </UserContext.Provider>
      </>

    )
  }
  if (!props.disableUpdateProfiles) {
    return (
      <>

        <UserContext.Provider value={props.dragMode}>
          <Router>
            <AuthProvider>
              <Switch>
                {/* Drive */}
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

                {/* Profile */}
                <PrivateRoute path="/user" component={Profile} />

                <PrivateRoute path="/update-profile" component={UpdateProfile} />

                {/* Auth */}
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>

          </Router>

        </UserContext.Provider>


      </>

    )
  }

}

export default App;
export { UserContext };
