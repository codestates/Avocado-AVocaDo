/* eslint-disable */
import React, { Component } from 'react';
import '../CSS/Wordbook.css';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import _ from 'lodash';

class WordAccordion extends Component {
  constructor(props) {
    super(props);

    this.sentenceArr = _.values(this.props.sentences);
    this.state = {
      articles: [],
      showHide: false,
      confirmShowHide: false,
      sentences: this.props.sentences,
      sentenceFirst: this.sentenceArr[0], // this.props.sentences[0],
      sentenceSecond: this.sentenceArr[1],
      sentenceThird: this.sentenceArr[2],
      modalWord: this.props.word,
    };
  }

  // 헤드라인에 word를 포함하는 기사를 배열로 리턴합니다.
  getArticles(word) {
    const apiKey = '3ad2644b610c4673979e45d6c17303dd';
    const url = `https://newsapi.org/v2/everything?q=${word}&apiKey=${apiKey}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      });
  }

  handleModalShowHide = () => {
    // TODO: 모달창 열때 상태변경해줌
    let sentenceArr = _.values(this.props.sentences);
    this.setState({
      modalWord: this.props.word,
      sentenceFirst: sentenceArr[0],
      sentenceSecond: sentenceArr[1],
      sentenceThird: sentenceArr[2],
    });

    this.setState({ showHide: !this.state.showHide });
  };

  handleConfirmShowHide = () => {
    this.setState({ confirmShowHide: !this.state.confirmShowHide });
  };

  handleSentences(sentenceArr) {
    let wordObj = {
      wordId: this.props.index,
      word: this.state.modalWord,
      sentences: _.values(sentenceArr),
    };
    this.props.addSentences(wordObj);
  }

  mapSentence = () => {
    let modalSentence = [
      this.state.sentenceFirst,
      this.state.sentenceSecond,
      this.state.sentenceThird,
    ];
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
    // let sentencesLength = Object.keys(this.props.sentences).length;
    let sentencesLength;
    if (this.props.sentences) {
      sentencesLength = Object.keys(this.props.sentences).length;
    } else {
      sentencesLength = 0;
    }
    if (
      !this.state.sentenceFirst &&
      !this.state.sentenceSecond &&
      !this.state.sentenceThird
    ) {
      // this.handleModalShowHide();
      return this.handleModalShowHide();
    } else if (sentencesLength < 1) {
      this.createSentences();
      return this.handleModalShowHide();
    } else {
      let sentenceKey = Object.keys(this.props.sentences);
      if (sentenceKey.length === 1) {
        // 2,3 을 새로보내기
        this.handleSentences([
          this.state.sentenceSecond,
          this.state.sentenceThird,
        ]);
      } else if (sentenceKey.length === 2) {
        // 3을 새로보내기
        this.handleSentences([this.state.sentenceThird]);
      }
      const mappedWordObj = this.mapSentence();
      this.props.updateWordData(mappedWordObj);
      return this.handleModalShowHide();
    }
  };

  handlesentenceFirst = (e) => {
    this.setState({
      sentenceFirst: e.target.value,
    });
  };
  handlesentenceSecond = (e) => {
    this.setState({
      sentenceSecond: e.target.value,
    });
  };
  handlesentenceThird = (e) => {
    this.setState({
      sentenceThird: e.target.value,
    });
  };
  handleModalWord = (e) => {
    this.setState({
      modalWord: e.target.value,
    });
  };

  createSentences = () => {
    let wordObj = {
      wordId: this.props.index,
      word: this.state.modalWord,
      sentences: [
        this.state.sentenceFirst,
        this.state.sentenceSecond,
        this.state.sentenceThird,
      ],
    };
    this.props.addSentences(wordObj);
  };

  deleteWordCard = () => {
    const mappedWordObj = this.mapSentence();
    this.props.deleteWordData(mappedWordObj);
    this.closeConfirmModal();
  };

  openConfirmModal = () => {
    this.setState({
      confirmModalIsOpen: true,
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModalIsOpen: false,
    });
  };

  renderSentences = () => {
    function renderLi(sentence, index) {
      return <li key={index}>• {sentence}</li>;
    }
    return _.map(this.props.sentences, renderLi);
  };

  componentDidMount() {}

  render() {
    // const { word, sentences, index } = this.props
    return (
      <div className="accordion_area">
        <Accordion defaultActiveKey="0">
          <Card className="accordion_card">
            <Card.Header>
              <div className="toggle_section">
                <div className="word_btn_section">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    onClick={() => {
                      this.getArticles(this.props.word);
                    }}
                  >
                    <div className="word_btn">{this.props.word}</div>
                  </Accordion.Toggle>
                </div>
                <div className="modal_btn_section">
                  <div className="edit_btn">
                    <button
                      className="edit_word_btn"
                      onClick={this.handleModalShowHide}
                    >
                      🥑
                    </button>
                  </div>
                  <div className="delete_btn">
                    <button
                      className="delete_word_btn"
                      onClick={this.handleConfirmShowHide}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="sentences-section">
                  <div className="my-sentences">
                    <ul className="sentences">{this.renderSentences()}</ul>
                  </div>
                </div>
                <p></p>
                <p></p>
                <div className="articles-section">
                  <div>
                    <h6>관련 기사를 읽고 단어를 익혀보세요.</h6>
                  </div>
                  <ul className="articles">
                    {/* {this.getArticles(this.props.word)} */}
                    {this.state.articles
                      .map((article, index) => {
                        return (
                          <li>
                            <a key={index} href={article.url}>
                              ▸ {article.title} | <b>{article.source.name}</b>
                            </a>
                          </li>
                        );
                      })
                      .slice(0, 9)}
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* 아보카도 클릭 시 열리는 모달 */}
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={this.handleModalShowHide}>
            <Modal.Title>예문 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Word</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="단어 추가"
                  value={this.state.modalWord}
                  onChange={this.handleModalWord}
                />
              </Form.Group>

              <Accordion defaultActiveKey="0">
                <Form.Group controlId="formGroupPassword">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    className="modal_sentence"
                  >
                    {' '}
                    sentence 1{' '}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Form.Control
                      type="text"
                      placeholder="문장"
                      onChange={this.handlesentenceFirst}
                      value={
                        this.state.sentenceFirst ? this.state.sentenceFirst : ''
                      }
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
                      value={
                        this.state.sentenceSecond
                          ? this.state.sentenceSecond
                          : ''
                      }
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
                      value={
                        this.state.sentenceThird ? this.state.sentenceThird : ''
                      }
                    />
                  </Accordion.Collapse>
                </Form.Group>
              </Accordion>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn_modal_confirm">
              <Button
                variant="secondary"
                block
                onClick={this.handleModalShowHide}
              >
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

        {/* X 버튼 클릭 시 열리는 모달 */}
        <Modal show={this.state.confirmShowHide}>
          <Modal.Header closeButton onClick={this.handleConfirmShowHide}>
            <Modal.Title>단어를 삭제할까요?</Modal.Title>
          </Modal.Header>
          <Modal.Body>확인 버튼을 누르면 단어가 삭제됩니다.</Modal.Body>
          <Modal.Footer>
            <div className="btn_modal_confirm">
              <Button
                variant="secondary"
                block
                onClick={this.closeConfirmModal}
              >
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
      </div>
    );
  }
}

export default WordAccordion;
