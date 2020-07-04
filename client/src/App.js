import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory

import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Wordbook from './components/Wordbook';

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
    const { isLogin } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                isLogin={isLogin}
                handleLogin={this.handleLogin.bind(this)}
              />
            )}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => <Main handleLogout={this.handleLogout.bind(this)} />}
          />
          <Route exact path="/wordbook" render={() => <Wordbook />} />
          <Route
            exact
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
