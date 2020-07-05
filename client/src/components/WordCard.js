/* eslint-disable */
import React from 'react';
import PropTypes, { func } from 'prop-types';
import Modal from 'react-modal';

// npm install react-modal
import '../CSS/WordCard.css';
import '../CSS/Modal_Word.css';

// word card 에서 모달 컴포넌트 호출 및 데이터 전달

const customStyles = {
  content: {
    width: '500px',
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
    updateWordData,
    handleSentenceData,
    index,
  } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalSentences, setModalSentences] = React.useState(
    sentences.join('')
  );
  const [modalWord, setModalWord] = React.useState(word);

  function openModal() {
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
        // onAfterOpen={afterOpenModal}
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
        {/* HTML <dl> 요소는 설명 목록을 나타냅니다. 
        <dl>은 <dt>로 표기한 용어와 
        <dd> 요소로 표기한 설명 그룹의 목록을 감싸서 설명 목록을 생성합니다. */}

        {/* dl -> ul  */}
        {/* dt -> title  */}
        {/* dd -> li  */}

        <div className="modal_container">
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
