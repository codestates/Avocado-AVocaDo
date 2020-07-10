import React from 'react';
import { withRouter } from 'react-router-dom';
// need npm i axios --save
import axios from 'axios';
// 'history' is missing in props validation 해결위해 설치함
import PropTypes from 'prop-types';
import '../CSS/SignUp.css';
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  handleSignUpInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  postSignUpData() {
    const SignUpData = {
      userId: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };

    // url 은 test 를 위해 임의로 지정하였음 => 변경가능
    return (
      axios
        // .post('http://localhost:8080/users/signup', SignUpData)
        .post('http://54.180.104.184:8080/users/signup', SignUpData)
        .then((response) => {
          if (response.status >= 200 && response.status <= 204) {
            alert('회원 가입이 완료되었습니다.');
            this.props.history.push('/');
          }
        })
        .catch(() => {
          alert('이미 가입된 아이디입니다.');
        })
    );
  }

  render() {
    return (
      <div className="signup_wraper">
        <div className="signup_container">
          <form
            className="signup_form"
            onSubmit={(e) => {
              e.preventDefault();

              if (this.state.email.length < 1) {
                alert('이메일을 입력해주세요!');
              } else if (this.state.password.length < 1) {
                alert('비밀번호를 입력해주세요!');
              } else if (this.state.username.length < 1) {
                alert('이름을 입력해주세요!');
              } else {
                this.postSignUpData();
              }
            }}
          >
            <fieldset className="signup_fieldset">
              <h1>A! VOCADO</h1>
              <div className="id_area">
                <h5>이메일</h5>

                <div className="input_row">
                  <span className="input_box">
                    <input
                      className="signup_input"
                      type="email"
                      placeholder="이메일을 입력 해주세요"
                      maxLength="30"
                      onChange={this.handleSignUpInput('email')}
                    ></input>
                  </span>
                </div>
              </div>
              <div className="password_area">
                <h5>비밀번호</h5>
                <div className="input_row">
                  <span className="input_box">
                    <input
                      className="signup_input"
                      type="password"
                      placeholder="비밀번호를 입력 해주세요"
                      maxLength="20"
                      onChange={this.handleSignUpInput('password')}
                    ></input>
                  </span>
                </div>
              </div>

              <div className="username_area">
                <h5>이름</h5>
                <div className="input_row">
                  <span className="input_box">
                    <input
                      className="signup_input"
                      type="text"
                      placeholder="이름을 입력 해주세요"
                      maxLength="20"
                      onChange={this.handleSignUpInput('username')}
                    ></input>
                  </span>
                </div>
              </div>
              <input
                type="submit"
                title="회원가입"
                alt="가입하기"
                value="가입하기"
                className="btn_signup"
                id="log.signup"
              />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};
export default withRouter(SignUp);
