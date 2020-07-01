import React from 'react';
import { withRouter } from 'react-router-dom';
// need npm i axios --save
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  // Parsing error: Unexpected token =
  // https://roomedia.tistory.com/entry/%EC%9D%B4%EC%8A%88-9-Parsing-error-Unexpected-token-eslint

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
      email: this.state.email,
      password: this.state.password,
    };
    // url 은 test 를 위해 임의로 지정하였음 => 변경가능
    return axios
      .post('http://localhost:5000/login', loginData)
      .then((response) => {
        if (response.status === 404) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        } else {
          // App component 로 부터 메서드 받아서 로그인 상태 변경
          // this.props.handleLogin(); isLogin -> true
          // 로그인 성공시 초기 page 로 이동
          // 아래 eslint 오류로 주석처리 해놓음
          // 라우터 컴포넌트 추가하면 주석해제해야함
          // 'history' is missing in props validation
          /* this.props.history.push('/'); */
        }
      })
      .catch((error) => {
        console.error('postLoginData ERROR', error);
      });
  }

  render() {
    return (
      <form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();

          if (this.state.email.length < 1) {
            alert('아이디를 입력해주세요!');
          } else if (this.state.password.length < 1) {
            alert('비밀번호를 입력해주세요!');
          } else {
            this.postLoginData();
          }
        }}
      >
        <fieldset className="login_fieldset">
          <div className="id_area">
            <span className="input_box">
              <input
                type="email"
                id="id"
                name="id"
                placeholder="아이디"
                className="int"
                onChange={this.handleLoginInput('email')}
              />
            </span>
            {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
          </div>

          <div className="pw_area">
            <span className="input_box">
              {/*input 이 공란인 상태로 로그인 버튼 눌렀을 때 표시됨 */}
              <input
                type="password"
                id="pw"
                name="pw"
                placeholder="비밀번호"
                className="int"
                onChange={this.handleLoginInput('password')}
              />
            </span>
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
      </form>
    );
  }
}

export default withRouter(Login);
