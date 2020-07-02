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
    const { isLogin } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Login isLogin={isLogin} />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => (
              <Main />
              // <WordInput />
              // <WordCard />
              // <WordCardStack />
            )}
          />
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

// #15 클라이언트 라우팅 설계
// react-router-dom 설치했습니다.
// Main.js, Header.js, WordList.js 컴포넌트 생성했습니다.
// index.js, App.js, Main.js, Header.js에 라우팅 구현했습니다.
