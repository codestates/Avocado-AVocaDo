import React, { Component } from 'react'
import '../CSS/Wordbook.css';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'

import _ from 'lodash';

class WordAccordion extends Component {
  constructor(props) {
    super(props)

    const sentenceArr = _.values(this.props.sentences);

    this.state = {
      articles: [],
      modalIsOpen: false,
      confirmModalIsOpen: false,
      sentenceFirst: sentenceArr[0],
      sentenceSecond: sentenceArr[1],
      sentenceThird: sentenceArr[2],
      modalWord: this.props.word
    }

    // this.getArticles = this.getArticles.bind(this);
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.mapSentence = this.mapSentence.bind(this);
    // this.saveWordData = this.saveWordData.bind(this);
    // this.handlesentenceFirst = this.handlesentenceFirst.bind(this);
    // this.handlesentenceSecond = this.handlesentenceSecond.bind(this);
    // this.handlesentenceThird = this.handlesentenceThird.bind(this);
    // this.handleModalWord = this.handleModalWord.bind(this);
    // this.createSentences = this.createSentences.bind(this);
    // this.deleteWordCard = this.deleteWordCard.bind(this);
    // this.openConfirmModal = this.openConfirmModal.bind(this);
    // this.closeConfirmModal = this.closeConfirmModal.bind(this);
    // this.renderSentences = this.renderSentences.bind(this);
  }



  // 헤드라인에 word를 포함하는 기사를 배열로 리턴합니다. 
  getArticles(word) {
    const apiKey = 'd23a9f96f669464aac9d22621c8bd7d9';
    const url = `https://newsapi.org/v2/everything?q=${word}&apiKey=${apiKey}`
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('data.articles', data.articles[0])
        this.setState({
          articles: data.articles
        })
      })
  };

  openModal = () => {
    this.setState({
      modalWord: this.props.word,
      modalIsOpen: true
    })
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  mapSentence = () => {
    let modalSentence =
      [this.state.sentenceFirst,
      this.state.sentenceSecond,
      this.state.sentenceThird];
    let updateSentenceObj = {};

    let sentenceKey;
    // 초기에 단어만 추가하여 문장이 없을때는 키를 임의로 만들어 보낸다.
    if (!this.props.sentences) {
      modalSentence.map((value, index) => {
        return (updateSentenceObj[`new${index}`] = value);
      });
    } else {
      sentenceKey = Object.keys(this.props.sentences);
    }

    for (let i = 0; i < sentenceKey.length; i++) {
      updateSentenceObj[sentenceKey[i]] = modalSentence[i];
    }

    let WordObject = {
      wordId: this.props.index,
      word: this.state.modalWord,
      sentences: updateSentenceObj,
    };

    return WordObject;
  };

  saveWordData = () => {
    let sentencesLength = Object.keys(this.props.sentences).length;

    if (
      this.state.sentenceFirst.length === 0 &&
      this.state.sentenceSecond.length === 0 &&
      this.state.sentenceThird.length === 0
    ) {
      console.log('입력이없음');
      return this.closeModal();
    } else if (sentencesLength < 1) {
      console.log('sentenceIsNull', sentencesLength);

      return this.createSentences();
    } else {
      console.log('update');

      const mappedWordObj = this.mapSentence();
      this.props.updateWordData(mappedWordObj);
    }
    this.closeModal();
  };

  handlesentenceFirst = (e) => {
    this.setState({
      sentenceFirst: e.target.value
    })
  };

  handlesentenceSecond = (e) => {
    this.setState({
      sentenceSecond: e.target.value
    })
  };

  handlesentenceThird = (e) => {
    this.setState({
      sentenceThird: e.target.value
    })
  };

  handleModalWord = (e) => {
    this.setState({
      modalWord: e.target.value
    })
  };

  createSentences = () => {
    let wordObj = {
      wordId: this.props.index,
      word: this.state.modalWord,
      sentences:
        [this.state.sentenceFirst,
        this.state.sentenceSecond,
        this.state.sentenceThird],
    };
    console.log('createSentences', wordObj);
    this.props.addSentences(wordObj);
  };

  deleteWordCard = () => {
    const mappedWordObj = this.mapSentence();
    this.props.deleteWordData(mappedWordObj);
    this.closeConfirmModal();
  }

  openConfirmModal = () => {
    this.setState({
      confirmModalIsOpen: true
    })
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModalIsOpen: false
    })
  };

  renderSentences = () => {
    function renderLi(sentence, index) {
      return <li key={index}>{sentence}</li>;
    }
    return _.map(this.props.sentences, renderLi);
  };

  render() {
    console.log('WordAccordion', this.props);
    console.log('open', this.state.modalIsOpen)
    // const { word, sentences, index } = this.props
    return (
      <div className="accordion_area" >
        <Accordion
          defaultActiveKey="0">
          <Card className="accordion_card">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div className="accordion_btns">
                  <div className="word_btn_section">
                    <div className="word_btn">
                      {this.props.word}
                    </div>
                  </div>
                  <div className="modal_btn_section">
                    <div
                      className="edit_btn"
                      onClick={this.openModal}>
                      🥑
                    </div>
                    <div className='delete_btn'>
                      <button
                        className="delete_word_btn"
                        onClick={this.openConfirmModal}
                      >X</button>
                    </div>
                  </div>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="sentences-section">
                  <div>
                    <h5>Sentences</h5>
                  </div>
                  <ul className="sentences">
                    {this.renderSentences()}
                  </ul>
                </div>
                <div className="articles-section">
                  <div>
                    <h6>관련 기사를 읽고 단어를 익혀보세요.</h6>
                  </div>
                  <ul className="articles">
                    {/* {this.getArticles(word)} */}
                    {this.state.articles.map((article, index) => {
                      return <li>
                        <a key={index} href={article.url}>{article.title} | {article.source.name}</a>
                      </li>
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* X 버튼 클릭 시 열리는 모달 */}
        <Modal show={this.openConfirmModal} onHide={this.closeConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>단어를 삭제할까요?</Modal.Title>
          </Modal.Header>
          <Modal.Body>확인버튼을 누르면 단어가 삭제됩니다</Modal.Body>
          <Modal.Footer>
            <div className="btn_modal_confirm">
              <Button variant="secondary" block onClick={this.closeConfirmModal}>
                취소
            </Button>
            </div>
            <div className="btn_modal_confirm">
              <Button variant="secondary" block onClick={this.deleteWordCard}>
                확인
            </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* 아보카도 클릭 시 열리는 모달 */}
        <Modal show={this.openModal} onHide={this.closeModal}>
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
                  value={this.state.modalWord}
                  onChange={this.handleModalWord}
                />
              </Form.Group>

              <Accordion defaultActiveKey="0">
                <Form.Group controlId="formGroupPassword">
                  <Accordion.Toggle as={Button} variant="link" eventKey="1" className="modal_sentence" > sentence 1 </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Form.Control
                      type="text"
                      placeholder="문장"
                      onChange={this.handlesentenceFirst}
                      value={this.state.sentenceFirst ? this.state.sentenceFirst : ''}
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
                      onChange={this.handlesentenceSecond}
                      value={this.state.sentenceSecond ? this.state.sentenceSecond : ''}
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
                      onChange={this.handlesentenceThird}
                      value={this.state.sentenceThird ? this.state.sentenceThird : ''}
                    />
                  </Accordion.Collapse>
                </Form.Group>
              </Accordion>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn_modal_confirm">
              <Button variant="secondary" block onClick={this.closeModal}>
                취소
            </Button>
            </div>
            <div className="btn_modal_confirm">
              <Button variant="secondary" block onClick={this.saveWordData}>
                확인
            </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div >
    )
  }
}

export default WordAccordion;