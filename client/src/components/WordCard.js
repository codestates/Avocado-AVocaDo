/* eslint-disable */
import React from 'react';
import PropTypes, { func } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Accordion from 'react-bootstrap/Accordion'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import _ from 'lodash';

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

  const [modalWord, setModalWord] = React.useState(word);

  // sentence 가 없을 때 true 로 변경함
  // 확인버튼 눌렀을 때 sentenceIsNull= true 면 새로운 문장을 추가하는 메서드 호출

  function openModal() {
    setModalWord(word);
    // setsentenceFirst(sentenceArr[0]);
    // setsentenceSecond(sentenceArr[1]);
    // setsentenceThird(sentenceArr[2]);
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
  }

  function handleModalWord(e) {
    setModalWord(e.target.value);
  }

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
    closeConfirmModal();
  }

  function openConfirmModal() {
    setconfirmModalOpen(true);
  }
  function closeConfirmModal() {
    setconfirmModalOpen(false);
  }

  function renderSentences() {
    function renderLi(sentence, index) {
      return <li key={index}>{sentence}</li>;
    }
    return _.map(sentences, renderLi);
  }


  // TODO: 단어는 모달에 출력이 되나 문장이 출력되고 있지 않음
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
          <ul className="sentences">{renderSentences()}</ul>
        </div>
      </div>


      {/* 부트스트랩 modal */}

      <Modal show={confirmModalIsOpen} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>단어를 삭제할까요?</Modal.Title>
        </Modal.Header>
        <Modal.Body>확인버튼을 누르면 단어가 삭제됩니다</Modal.Body>
        <Modal.Footer>

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

        </Modal.Footer>
      </Modal>
      {/*부트스트랩 모달  */}

      {/* 필요한 것 form, button */}

      {/*  */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>예문추가</Modal.Title>
        </Modal.Header>
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

            <Accordion defaultActiveKey="0">

              <Form.Group controlId="formGroupPassword">

                <Accordion.Toggle as={Button} variant="link" eventKey="1" className="modal_sentence" > sentence 1 </Accordion.Toggle>

                <Accordion.Collapse eventKey="1">
                  <Form.Control
                    type="text"
                    placeholder="문장"
                    onChange={handlesentenceFirst}
                    value={sentenceFirst ? sentenceFirst : ''}
                  />
                </Accordion.Collapse>

              </Form.Group>

            </Accordion>

            <Accordion defaultActiveKey="0">
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

            </Accordion>

            <Accordion defaultActiveKey="0">
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