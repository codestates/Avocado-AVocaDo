/* eslint-disable */
import React from 'react';
import PropTypes, { func } from 'prop-types';
<<<<<<< HEAD
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion  from 'react-bootstrap/Accordion'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import _ from 'lodash';
=======
import Modal_bootstrap from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
// npm install react-modal
import '../CSS/WordCard.css';
import '../CSS/Modal_Word.css';

// word card 에서 모달 컴포넌트 호출 및 데이터 전달
/* TODO: 

문제 > 페이지네이션을 하고난 후 모달을 클릭했을 때 페이지네이션으로 변경된
단어와 문장이 반영이 안됨 

현상 : 0~4 까지의 데이터만 반복해서 출력이 된다. 

문제원인 : modalWord, modalSentences 가 변경되지 않는다. 
모달안에서의 상태가 변경이 안됨

해결 => modal open 할때 상태를 변경함 

*/
const wordModalStyles = {
  content: {
    width: '500px',
    height: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #cccccc',
    borderRadius: '6px',
    backgroundColor: '#f5f6f7',
  },
};

<<<<<<< HEAD
=======
const confirmModalStyles = {
  content: {
    width: '300px',
    height: '300px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #cccccc',
    borderRadius: '6px',
    backgroundColor: '#f5f6f7',
  },
};

Modal.setAppElement('#root');

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
// react-modal hooks 를 사용하기 위해 function component 로 변경

function WordCard(props) {
  const {
    word,
    sentences,
    index,
    postInputWord,
    addWordData,
    deleteWordData,
    handleInput,
    updateWordData,
    handleSentenceData,
<<<<<<< HEAD
    addSentences,
  } = props;

  /* TODO: 
  너무 빨라서 open 할 때 data 를 반영하지 못한다. 
  */

  const sentenceArr = _.values(sentences);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [confirmModalIsOpen, setconfirmModalOpen] = React.useState(false);

  // 문장 state 관리
  const [sentenceFirst, setsentenceFirst] = React.useState(sentenceArr[0]);
  const [sentenceSecond, setsentenceSecond] = React.useState(sentenceArr[1]);
  const [sentenceThird, setsentenceThird] = React.useState(sentenceArr[2]);
  const [sentenceIsNull, setIsSentence] = React.useState(false);

  const [modalWord, setModalWord] = React.useState(word);

  // sentence 가 없을 때 true 로 변경함
  // 확인버튼 눌렀을 때 sentenceIsNull= true 면 새로운 문장을 추가하는 메서드 호출

  function openModal() {
    setModalWord(word);
    // setsentenceFirst(sentenceArr[0]);
    // setsentenceSecond(sentenceArr[1]);
    // setsentenceThird(sentenceArr[2]);
=======
    handleWordCardLength,
  } = props;

  console.log(`index=${index}, word=${word}`);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [confirmModalIsOpen, setconfirmModalOpen] = React.useState(false);
  const [modalSentences, setModalSentences] = React.useState(
    sentences.join('\n')
  );
  const [modalWord, setModalWord] = React.useState(word);

  function openModal() {
    setModalWord(word);
    setModalSentences(sentences.join('\n'));
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // Modal 안의 Title
  //   // subtitle.style.color = '#000';
  // }
  function closeModal() {
    setIsOpen(false);
  }

<<<<<<< HEAD
  function mapSentence() {
    let modalSentence = [sentenceFirst, sentenceSecond, sentenceThird];
    let updateSentenceObj = {};

    // sentence key 와 모달 문장을 mapping 한 객체를 서버에 보낸다.
    // 만약 단어만 있는 상태라면??

    // 문장은 undifiend 일 거고
    //
    let sentenceKey;
    // 초기에 단어만 추가하여 문장이 없을때는 키를 임의로 만들어 보낸다.
    if (!sentences) {
      modalSentence.map((value, index) => {
        return (updateSentenceObj[`new${index}`] = value);
      });
    } else {
      sentenceKey = Object.keys(sentences);
    }

    for (let i = 0; i < sentenceKey.length; i++) {
      updateSentenceObj[sentenceKey[i]] = modalSentence[i];
    }

    let WordObject = {
      wordId: index,
      word: modalWord,
      sentences: updateSentenceObj,
    };

    return WordObject;
  }
  function saveWordData() {
    
    let sentencesLength = Object.keys(sentences).length;

    if (
      sentenceFirst.length === 0 &&
      sentenceSecond.length === 0 &&
      sentenceThird.length === 0
    ) {
      console.log('입력이없음');
      return closeModal();
    } else if (sentencesLength < 1) {
      console.log('sentenceIsNull', sentencesLength);

      return createSentences();
    } else {
      console.log('update');
      // textarea 에 들어있는 문장을 enter 단위로 분해하여 배열에 저장

      // 저장한 배열로 전체 단어 data 상태 변화
      // put??
      // 서버로 뭘 보내줘야 하나?
      // 단어와 바뀐 문장전체

      // sentences 에 키마다 문장1,문장2,문장3 으로 대체하고 싶어
      // 모달에서의 문장배열을 보내려는 문장배열에 mapping 시키고 싶다.

      const mappedWordObj = mapSentence();
      updateWordData(mappedWordObj);
    }
    closeModal();
  }

  function handlesentenceFirst(e) {
    setsentenceFirst(e.target.value);
  }

  function handlesentenceSecond(e) {
    setsentenceSecond(e.target.value);
  }

  function handlesentenceThird(e) {
    setsentenceThird(e.target.value);
=======
  function saveWordData(e) {
    e.preventDefault();
    // textarea 에 들어있는 문장을 enter 단위로 분해하여 배열에 저장

    const splitSentences = modalSentences.split('\n');
    // 저장한 배열로 전체 단어 data 상태 변화
    handleSentenceData(modalWord, splitSentences, index);
    // put??
    // 서버로 뭘 보내줘야 하나?
    // 단어와 바뀐 문장전체
    updateWordData(modalWord, splitSentences);

    closeModal();
  }

  function handleModalSentences(e) {
    setModalSentences(e.target.value);
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
  }

  function handleModalWord(e) {
    setModalWord(e.target.value);
  }

<<<<<<< HEAD
  // TODO: 처음 문장이 없었을 때만 호출하여야 함
  function createSentences() {

    let wordObj = {
      wordId: index,
      word: modalWord,
      sentences: [sentenceFirst, sentenceSecond, sentenceThird],
    };

    console.log('createSentences', wordObj);
    addSentences(wordObj);
  }

  function deleteWordCard() {
    const mappedWordObj = mapSentence();
    deleteWordData(mappedWordObj);
=======
  function deleteWordCard() {
    deleteWordData(index);
    handleWordCardLength();
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
    closeConfirmModal();
  }

  function openConfirmModal() {
    setconfirmModalOpen(true);
  }
  function closeConfirmModal() {
    setconfirmModalOpen(false);
<<<<<<< HEAD
  }

  function renderSentences() {
    function renderLi(sentence, index) {
      return <li key={index}>{sentence}</li>;
    }
    return _.map(sentences, renderLi);
  }


  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );

    const btnstyle = {


    }
  
    return (

      <Button variant="secondary"  onClick={decoratedOnClick} >
      예문
    </Button>
      // <button
      //   type="button"
      //   style={{ backgroundColor: 'green' }}
      //   onClick={decoratedOnClick}
      // >
      //   {children}
      // </button>
    );
  }
  
  // TODO: 단어는 모달에 출력이 되나 문장이 출력되고 있지 않음
=======
  }

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
  return (
    <div>
      {/* 클릭했을 때의 단어를 반영 */}
      {/* X 버튼을 클릭했을 때 
      배열에서 데이터를 삭제하고 삭제한 배열을 반영하여
      state 를 변경한다. 
      */}

      <div className="wordcard">
        <button
          className="btn_delete_wordcard"
          onClick={openConfirmModal}
        ></button>
        <div className="wordcard-content" onClick={openModal}>
          <div className="word">{word}</div>
<<<<<<< HEAD
          <ul className="sentences">{renderSentences()}</ul>
=======
          <ul className="sentences">
            {sentences.map((sentence, index) => {
              // 카드 내에 출력되는 예문이 일정 길이를 넘어가면 줄임말로 생략합니다. 
              if (sentence.length > 20) {
                return <li key={index}>{sentence.slice(0, 20)}...</li>;
              } else {
                return <li key={index}>{sentence}</li>;
              }
            })}
          </ul>
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
        </div>
      </div>

      {/* 부트스트랩 modal */}

<<<<<<< HEAD
      <Modal show={confirmModalIsOpen} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>단어를 삭제할까요?</Modal.Title>
        </Modal.Header>
        <Modal.Body>확인버튼을 누르면 단어가 삭제됩니다</Modal.Body>
        <Modal.Footer>
=======
      <Modal_bootstrap show={confirmModalIsOpen} onHide={closeConfirmModal}>
        <Modal_bootstrap.Header closeButton>
          <Modal_bootstrap.Title>단어를 삭제할까요?</Modal_bootstrap.Title>
        </Modal_bootstrap.Header>
        <Modal_bootstrap.Body>
          확인버튼을 누르면 단어가 삭제됩니다
        </Modal_bootstrap.Body>
        <Modal_bootstrap.Footer>
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
          <div className="btn_modal_confirm">
            <Button variant="secondary" block onClick={closeConfirmModal}>
              취소
            </Button>
          </div>
          <div className="btn_modal_confirm">
            <Button variant="secondary" block onClick={deleteWordCard}>
              확인
            </Button>
          </div>
<<<<<<< HEAD
        </Modal.Footer>
      </Modal>
=======
        </Modal_bootstrap.Footer>
      </Modal_bootstrap>
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
      {/*부트스트랩 모달  */}

      {/* 필요한 것 form, button */}

      {/*  */}
<<<<<<< HEAD
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>예문추가</Modal.Title>
        </Modal.Header>
=======
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={wordModalStyles}
        contentLabel="A! VOCADO"
      >
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
        {/* HTML <dl> 요소는 설명 목록을 나타냅니다. 
        <dl>은 <dt>로 표기한 용어와 
        <dd> 요소로 표기한 설명 그룹의 목록을 감싸서 설명 목록을 생성합니다. */}

        {/* dl -> ul  */}
        {/* dt -> title  */}
        {/* dd -> content */}
<<<<<<< HEAD
        <Modal.Body>

          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Word</Form.Label>
              <Form.Control
                type="text"
                placeholder="단어추가"
                value={modalWord}
                onChange={handleModalWord}
              />
            </Form.Group>

            <Accordion defaultActiveKey="1">

              <Form.Group controlId="formGroupPassword">

              <Accordion.Toggle as={Button} variant="link" eventKey="1">    sentence 1 </Accordion.Toggle>

                <Accordion.Collapse eventKey="1">
                  <Form.Control
                    type="text"
                    placeholder="문장"
                    onChange={handlesentenceFirst}
                    value={sentenceFirst ? sentenceFirst : ''}
                  />
                </Accordion.Collapse>

              </Form.Group>

              <Form.Group controlId="formGroupPassword">

                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  sentence 2
             </Accordion.Toggle>

                <Accordion.Collapse eventKey="2">

                  <Form.Control
                    type="text"
                    placeholder="문장"
                    onChange={handlesentenceSecond}
                    value={sentenceSecond ? sentenceSecond : ''}
                  />

                </Accordion.Collapse>

              </Form.Group>

              <Form.Group controlId="formGroupPassword">


                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  sentence 3
             </Accordion.Toggle>

                <Accordion.Collapse eventKey="3">
                  <Form.Control
                    type="text"
                    placeholder="문장"
                    onChange={handlesentenceThird}
                    value={sentenceThird ? sentenceThird : ''}
                  />    
                  </Accordion.Collapse>



              </Form.Group>

            </Accordion>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <div className="btn_modal_confirm">
            <Button variant="secondary" block onClick={closeModal}>
              취소
            </Button>
          </div>
          <div className="btn_modal_confirm">
            <Button variant="secondary" block onClick={saveWordData}>
              확인
            </Button>
          </div>
        </Modal.Footer>
=======

        <div className="modal_container">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Word</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Sentence</Form.Label>
              <Form.Control type="text" placeholder="Password" />
            </Form.Group>
          </Form>
          <form className="modal_word_form" onSubmit={saveWordData}>
            <h1 className="modal_heading">Create Sentences</h1>

            <dl className="modal_form_group">
              <dt>
                <label>{'Word'}</label>
              </dt>

              <dd>
                <input
                  className="modal_input"
                  value={modalWord}
                  onChange={handleModalWord}
                ></input>
              </dd>
            </dl>

            <dl className="modal_form_group">
              <dt>
                <label>{'Sentences'}</label>
              </dt>

              <dd>
                <textarea
                  className="modal_textarea"
                  value={modalSentences}
                  onChange={handleModalSentences}
                ></textarea>
              </dd>
            </dl>

            <div className="modal_btn_area">
              <input
                type="submit"
                title="저장"
                alt="저장"
                value="저장"
                className="btn_modal btn_modal_save"
              />
              <button
                className="btn_modal btn_modal_cancel"
                value="취소"
                onClick={closeModal}
              >
                취소
              </button>
            </div>
          </form>
        </div>
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
      </Modal>
    </div>
  );
}
// class WordCard extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const { word,sentences,postInputWord } = this.props;
//     // postInputWord, updateWordData, deleteWordData
//     return (
// <div className="word_card" style={{ cursor: 'pointer' }}>
//   <div className="word">{word}</div>
//   <ul className="sentences">
//     {sentences.map((sentence, index) => {
//       return <li key={index}>{sentence}</li>;
//     })}
//   </ul>
// </div>
//     );
//   }
// }

export default WordCard;
