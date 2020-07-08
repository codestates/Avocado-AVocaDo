import React, { Component } from 'react'
import '../CSS/Wordbook.css';
import _ from 'lodash';
import Modal_bootstrap from 'react-bootstrap/Modal';
import Modal from 'react-modal';

import { Accordion, Card, Button } from
  'react-bootstrap';
// Accordion 사용하려면 부트스트랩 다운그레이드 해야 합니다. 
// npm uninstall react-bootstrap
// npm install react-bootstrap@1.0.1

export default class WordAccordion extends Component {
  constructor(props) {
    super(props)
  }

  renderSentences(sentences) {
    function renderLi(sentence, index) {
      return <li key={index}>{sentence}</li>;
    }
    return _.map(sentences, renderLi);
  }

  render() {
    console.log('WordAccordion', this.props);
    const { word, sentences,index } = this.props
    return (
      <div className="accordion_area">
        <Accordion
          defaultActiveKey="0">
          <Card className="accordion_card">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div className="word_btn">
                  {word}
                </div>
              </Accordion.Toggle>
              <div className="edit_btn">
                🥑
                </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ul className="sentences">
                  {this.renderSentences(sentences)}
                </ul>
                <div>
                  구글 이미지 또는 기사
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}
