import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory

import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';

class App extends React.Component {
  state = {
    isLogin: false,
    userInfo: null,
  };

  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }
  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }

  // getUserData()

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/main" render={() => <Main />} />
          <Route
            path="/"
            render={() => {
              if (this.state.isLogin) {
                return <Redirect to="/main" />;
              }
              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
