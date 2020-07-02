import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// need npm i axios --save
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      mobile: '',
    };
  }

  // Parsing error: Unexpected token =
  // https://roomedia.tistory.com/entry/%EC%9D%B4%EC%8A%88-9-Parsing-error-Unexpected-token-eslint

  handleSignUpInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  postSignUpData() {
    const SignUpData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      mobile: this.state.mobile,
    };

    // url 은 test 를 위해 임의로 지정하였음 => 변경가능
    return axios
      .post('http://localhost:5000/signup', SignUpData)
      .then((response) => {
        if (response.status === 404) {
          alert('이미가입된 아이디입니다.');
        } else {
          // 회원가입 성공시 login page 로 이동
          // 아래 eslint 오류로 주석처리 해놓음
          // 라우터 컴포넌트 추가하면 주석해제해야함
          // 'history' is missing in props validation
          /*  this.props.history.push('/login'); */
        }
      })
      .catch((error) => {
        console.error('postSignUpData ERROR', error);
      });
  }

  render() {
    return (
      <div>
        <h1>A!VOCADO 회원가입</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (this.state.email.length < 1) {
              alert('이메일을 입력해주세요!');
            } else if (this.state.password.length < 1) {
              alert('비밀번호를 입력해주세요!');
            } else if (this.state.username.length < 1) {
              alert('닉네임을 입력해주세요!');
            } else if (this.state.mobile.length < 1) {
              alert('전화번호를 입력해주세요!');
            } else {
              this.postSignUpData();
            }
          }}
        >
          <div>
            <input
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={this.handleSignUpInput('email')}
            ></input>
          </div>
          <div>
            <input
              onChange={this.handleSignUpInput('password')}
              type="password"
              placeholder="비밀번호를 입력 해주세요"
            ></input>
          </div>
          <div>
            <input
              onChange={this.handleSignUpInput('username')}
              placeholder="이름"
            ></input>
            <input
              type="mobile"
              onChange={this.handleSignUpInput('mobile')}
              placeholder="전화번호"
            ></input>
          </div>
          <div>
            <Link to="/login">이미 아이디가 있으신가요?</Link>
          </div>
          <input
            type="submit"
            title="회원가입"
            alt="회원가입"
            value="회원가입"
            className="btn_signUp"
            id="log.signUp"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
