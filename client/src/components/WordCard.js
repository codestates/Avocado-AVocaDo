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
    border: '2px solid #cccccc',
    borderRadius: '6px',
    backgroundColor: '#f5f6f7',
  },
};

Modal.setAppElement('#root');

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
    checkOverlapWord,
  } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalSentences, setModalSentences] = React.useState(
    sentences.join('\n')
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

    // 단어 따로 문장 따로 ?

    // 초기 단어정보인 word 와 sentences 를 받는다.
    // 저장 버튼을 누르기 전까지는 변하지 않느다.
    // 왜냐면 input 과 textarea value 상태를 WordCard 에서 따로 관리하기 때문
    // 저장버튼을 눌렀을 때만 변경사항이 반영된다.

    // 받아온 즉시 값을 const 변수로 받아놓는다. => word, sentences
    // 저장버튼을 눌렀을 때
    // 단어만 변했으면 단어만 put 요청을 보내고
    // 문장만 변했으면 문장만 put 요청을 보낸다.
    // 둘다 변했으면 둘다 put 요청을 보낸다.

    // console.log(word, sentences);
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

  function deleteWordCard() {
    deleteWordData(index);
  }

  return (
    <div>
      {/* 클릭했을 때의 단어를 반영 */}
      {/* X 버튼을 클릭했을 때 
      배열에서 데이터를 삭제하고 삭제한 배열을 반영하여
      state 를 변경한다. 
      */}

      <div className="wordcard" onClick={openModal}>
        <button
          className="btn_delete_wordcard"
          onClick={deleteWordCard}
        ></button>
        <div className="word">{word}</div>
        <ul className="sentences">
          {sentences.map((sentence, index) => {
            return <li key={index}>{sentence}</li>;
          })}
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="A! VOCADO"
      >
        {/* HTML <dl> 요소는 설명 목록을 나타냅니다. 
        <dl>은 <dt>로 표기한 용어와 
        <dd> 요소로 표기한 설명 그룹의 목록을 감싸서 설명 목록을 생성합니다. */}

        {/* dl -> ul  */}
        {/* dt -> title  */}
        {/* dd -> content */}

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
