/* eslint-disable */
import React from 'react';
import PropTypes, { func } from 'prop-types';
import Modal from 'react-modal';

// npm install react-modal
import '../CSS/WordCard.css';

// word card 에서 모달 컴포넌트 호출 및 데이터 전달

const customStyles = {
  content: {
    width: '50%',
    height: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

// react-modal hooks 를 사용하기 위해 function component 로 변경

function WordCard(props) {
  const {
    word,
    sentences,
    postInputWord,
    addWordData,
    handleInput,
    handleSentenseData,
    index,
  } = props;

  console.log('WordCard 키', props);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalSentences, setModalSentences] = React.useState(
    sentences.join('')
  );
  const [modalWord, setModalWord] = React.useState(word);

  function openModal() {
    // modalIsOpen -> true 로 변경
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // Modal 안의 Title
    // subtitle.style.color = '#000';
  }
  function closeModal() {
    // modalIsOpen -> false 로 변경
    setIsOpen(false);
  }

  function saveWordData(e) {
    e.preventDefault();
    handleSentenseData(modalSentences, word, index);
    console.log('key확인', index);

    closeModal();
  }

  function handleModalSentences(e) {
    setModalSentences(e.target.value);
  }

  function handleModalWord(e) {
    setModalWord(e.target.value);
  }

  return (
    <div>
      {/* 클릭했을 때의 단어를 반영 */}
      <div className="wordcard" onClick={openModal}>
        <div className="word">{word}</div>
        <ul className="sentences">
          {sentences.map((sentence, index) => {
            return <li key={index}>{sentence}</li>;
          })}
        </ul>
      </div>

      <Modal
        /* Boolean describing if the modal should be shown or not. Defaults to false. */
        // modal 이 보여질지 안보여질지 설정
        isOpen={modalIsOpen}
        /* Function that will be run after the modal has opened. */
        // modal 이 열리고 나서의 기능 설정
        onAfterOpen={afterOpenModal}
        /* Function that will be run when the modal is requested to be closed, prior to actually closing. */
        // modal 이 닫히고 나서의 기능 설정
        onRequestClose={closeModal}
        // modal comp css 설정
        /* Object indicating styles to be used for the modal, divided into overlay and content styles. */
        // modal css 설정
        style={customStyles}
        // 스크린 리더에 어떻게 읽히는지 설정 -> 시각 장애인을 위한 기능
        contentLabel="A! VOCADO"
      >
        <form className="modal_word_form" onSubmit={saveWordData}>
          <h3>단어 수정</h3>
          <div>
            <input value={modalWord} onChange={handleModalWord}></input>
            <textarea
              className="modal-textarea"
              value={modalSentences}
              onChange={handleModalSentences}
            ></textarea>
            <input
              type="submit"
              title="저장"
              alt="저장"
              value="저장"
              className="btn_modal_save"
            />
            <button className="modal-btn" onClick={closeModal}>
              취소
            </button>
          </div>
        </form>
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
