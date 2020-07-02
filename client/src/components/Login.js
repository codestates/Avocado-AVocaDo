import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// need npm i axios --save  
import axios from 'axios';
// 'history' is missing in props validation 해결위해 설치함
import PropTypes from 'prop-types';
// npm i --save react-google-login
import GoogleLogin from "react-google-login";
// import { GoogleLogout } from "react-google-login";
// npm i --save react-facebook-login
import FacebookLogin from "react-facebook-login";
import '../CSS/Login.css';
axios.defaults.withCredentials = true;

class Login extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      password: ''
    };

  }

  responseGoogle(response) {
    console.log(response);
    const googleLoginData = {};
    googleLoginData.loginType = "google";
    googleLoginData.userId = response.googleId;
    // this.setState({ id: response.googleId });

    // axios.post('http://127.0.0.1:8080/users/signin', googleLoginData).
    //     then((response) => {

    //         if (response.status === 404) {
    //             alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.')
    //         }
    //     }).catch((error) => {
    //         console.error('responseGoogle', error);
    //     });

    
    fetch("http://127.0.0.1:8080/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(googleLoginData),
    }).then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        console.log("fail to fetch post");
      }
    });
  }

  responseLogout() {

    // axios.post('http://127.0.0.1:8080/users/logout').
    //     then((response) => {

    //         if (response.status === 404) {
    //             alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.')
    //         }
    //     }).catch((error) => {
    //         console.error('responseGoogle', error);
    //     });

    fetch("http://127.0.0.1:8080/users/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    }).then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        console.log("fail to fetch post");
      }
    });
  }

  click() {
    // fetch("http://127.0.0.1:8080")
    //   // .then((response) => {
    //   //   console.log(response);
    //   //   return response.json();
    //   // })
    //   .then((data) => console.log(data));

    fetch("http://127.0.0.1:8080", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      withCredentials: true,
      credentials: "include",
      body: "117466691779104476701",
    }).then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        console.log("fail to fetch post");
      }
    });
  }
  handleLoginInput = key => e => {

    this.setState({ [key]: e.target.value });
  }

  postLoginData() {

    // axios 주의!

    // const currentUrl = this.props.history.location;
    // axios 로 post 요청하니 서버에서 
    // req.body 가 {} 나옴
    // 원인 : axios 의 data 는 JSON.stringify 해서 보내면 서버에서 데이터가 undefined 가 나온다. 

    const loginData = { email: this.state.email, password: this.state.password };
    // url 은 test 를 위해 임의로 지정하였음 => 변경가능 
    return axios.post('http://localhost:5000/login', loginData).
      then((response) => {
        if (response.status === 404) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        }

        else {
          // App component 로 부터 메서드 받아서 로그인 상태 변경
          // this.props.handleLogin(); isLogin -> true
          // 로그인 성공시 초기 page 로 이동 
          this.props.history.push('/');
        }
      }).catch((error) => {
        console.error('postLoginData ERROR', error);
      });
  }

  render() {

    return (

      <div className="login_wrap">
        {/* head 에 넣어야 함  */}
        {/* <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link> */}
        <div className="login_container">
          <form className="login_form" onSubmit={
            (e) => {
              e.preventDefault();

              if (this.state.email.length < 1) {
                alert('아이디를 입력해주세요!');
              }

              else if (this.state.password.length < 1) {
                alert('비밀번호를 입력해주세요!');
              }

              else {
                this.postLoginData();
              }

            }}>
            <fieldset className="login_fieldset">

              <h1 className="login_logo">A! VOCADO</h1>

              <div className="id_area">

                <div className="input_row">
                  <span className="input_box">
                    <input type="email" id="id" name="id" placeholder="아이디"
                      className="login_input" maxLength="20"
                      onChange={this.handleLoginInput('email')} />
                  </span>

                </div>
                {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
              </div>

              <div className="pw_area">
                <div className="input_row">
                  <span className="input_box">
                    {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
                    <input type="password" id="pw" name="pw" placeholder="비밀번호" maxLength="20"
                      className="login_input" onChange={this.handleLoginInput('password')} />
                  </span>
                </div>
              </div>
              <input type="submit" title="로그인" alt="로그인" value="로그인" className="btn_login" id="log.login" />
            </fieldset>

            {/* <i className="fa fa-camera-retro fa-lg"></i> */}
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
                cookiePolicy={"single_host_origin"}
              />
              <span> </span>
              <FacebookLogin
                appId='1217568225253856'
                textButton="　페이스북 계정으로 로그인"
                autoLoad={true}
                fields='name,email,picture'
                cssClass="facebook_login_btn"
                // onClick={componentClicked}
                icon="fa-facebook-official"
                language='ko_KR'
                callback={this.responseFacebook}
              />
            </div>

            <div className="link_to_signup">
              <Link to="/signup">회원가입</Link>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Login);


