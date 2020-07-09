import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
// 'history' is missing in props validation 해결위해 설치함
import PropTypes from 'prop-types';
// npm i --save react-google-login
import GoogleLogin from 'react-google-login';
// npm i --save react-facebook-login
import FacebookLogin from 'react-facebook-login';
import '../CSS/Login.css';
axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      password: '',
    };

    // state 사용위해 Login 클래스의 this 를 bind 함
    this.postLoginData = this.postLoginData.bind(this);
    this.handleCustomLogin = this.handleCustomLogin.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    console.log(this.props);
  }

  responseGoogle(response) {
    /* {
      loginType : google/facebook/custom, 
      userId : '000000',  (custom일 경우 email을 그대로 입력)
       tokenId : '000000'(social login일때만 입력), 
      password : customId일때만 입력
} */
    // 구글에서 로그인 하고 나서의 응답 처리
    const { tokenId, googleId } = response;
    const { name, email } = response.profileObj;
    const googleLoginData = {
      loginType: 'google',
      userId: googleId,
      tokenId: tokenId,
      userName: name,
      email,
    };

    axios
      .post('http://54.180.104.184:8080/users/signin', googleLoginData)
      .then((response) => {
        if (response.status >= 200 && response.status <= 204) {
          this.props.handleLogin();
        } else {
          console.log('fail to fetch post');
        }
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        alert('구글 로그인 인증에 실패했습니다.');
        // console.error('responseGoogle', error);
      });
  }

  responseFacebook(response) {
    /* App Not Setup: This app is still in development mode, 
    and you don't have access to it. 
    Switch to a registered test user or ask an app admin for permissions. */
    // => facebook 계정문제로 보임
    console.log('Facebook res', response);

    const { accessToken, id, name, email } = response;
    const facebookLoginData = {
      loginType: 'facebook',
      userId: id,
      tokenId: accessToken,
      userName: name,
      email,
    };
    console.log(facebookLoginData);

    axios
      .post('http://54.180.104.184:8080/users/signin', facebookLoginData)
      .then((response) => {
        if (response.status >= 200 && response.status <= 204) {
          this.props.handleLogin();
        } else {
          console.log('fail to fetch post');
        }
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        alert('페이스북 로그인 인증에 실패했습니다.');
        // console.error('responseFacebook', error);
      });
  }

  responseLogout() {
    fetch('http://54.180.104.184:8080/users/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
    }).then((res) => {
      // console.log(res);
      if (res.status >= 200 && res.status <= 204) {
        this.props.handleLogout();
        this.props.history.push('/');
        //여기에서 메인페이지로 리다이렉션 필요?
      } else {
        console.log('fail to fetch post');
      }
    });
  }

  handleLoginInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  postLoginData() {
    // axios 주의!

    // const currentUrl = this.props.history.location;
    // axios 로 post 요청하니 서버에서
    // req.body 가 {} 나옴
    // 원인 : axios 의 data 는 JSON.stringify 해서 보내면 서버에서 데이터가 undefined 가 나온다.

    const loginData = {
      loginType: 'custom',
      userId: this.state.email,
      password: this.state.password,
    };
    // url 은 test 를 위해 임의로 지정하였음 => 변경가능
    return axios
      .post('http://54.180.104.184:8080/users/signin', loginData)
      .then((response) => {
        if (response.status >= 200 && response.status <= 204) {
          this.props.handleLogin();
        } else {
          // App component 로 부터 메서드 받아서 로그인 상태 변경
          // this.props.handleLogin(); isLogin -> true
          // 로그인 성공시 초기 page 로 이동
          // console.log('상태확인', response.status);

          // console.log('axios', this.props);
          console.log('fail to fetch post');
        }
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        // console.error('postLoginData ERROR', error);
      });
  }

  handleCustomLogin(e) {
    e.preventDefault();

    if (this.state.email.length < 1) {
      alert('아이디를 입력해주세요!');
    } else if (this.state.password.length < 1) {
      alert('비밀번호를 입력해주세요!');
    } else {
      this.postLoginData();
      // this.props.history.push('/');
    }
  }

  render() {
    console.log('render', this.props);
    return (
      <div className="login_wrap">
        <div className="login_container">
          <form className="login_form" onSubmit={this.handleCustomLogin}>
            <fieldset className="login_fieldset">
              <h1 className="login_logo">A! VOCADO</h1>

              <div className="id_area">
                <div className="input_row">
                  <span className="input_box">
                    <input
                      type="email"
                      id="id"
                      name="id"
                      placeholder="아이디"
                      className="login_input"
                      maxLength="20"
                      onChange={this.handleLoginInput('email')}
                    />
                  </span>
                </div>
                {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
              </div>

              <div className="pw_area">
                <div className="input_row">
                  <span className="input_box">
                    {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
                    <input
                      type="password"
                      id="pw"
                      name="pw"
                      placeholder="비밀번호"
                      maxLength="20"
                      className="login_input"
                      onChange={this.handleLoginInput('password')}
                    />
                  </span>
                </div>
              </div>
              <input
                type="submit"
                title="로그인"
                alt="로그인"
                value="로그인"
                className="btn_login"
                id="log.login"
              />
            </fieldset>

            <div className="social_login-box">
              <GoogleLogin
                clientId="811632505516-b1tg07ri7qbimr6jivnp9plrif1eufg2.apps.googleusercontent.com"
                // render={(renderProps) => (
                //   <button
                //     className="btn"
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}
                //   >
                //     This is my custom Google button
                //   </button>
                // )}
                className="google_login_btn"
                buttonText="구글 계정으로 로그인"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <FacebookLogin
                // 1088597931155576
                // origin : 1217568225253856
                appId="1217568225253856"
                textButton="　페이스북 계정으로 로그인"
                // 새로고침하면 자동으로 popup 되는 문제 해결
                autoLoad={false}
                fields="name,email,picture"
                cssClass="facebook_login_btn"
                // onClick={componentClicked}
                icon="fa-facebook-official"
                language="ko_KR"
                callback={this.responseFacebook}
              />
            </div>

            <div className="link_to_signup">
              <Link to="/signup" className="signup_link_text">
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default withRouter(Login);
