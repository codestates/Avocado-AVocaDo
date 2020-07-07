import React, { Component } from 'react'
import '../CSS/Wordbook.css';
import axios from 'axios';

import Modal_bootstrap from 'react-bootstrap/Modal';
import Modal from 'react-modal';

import { Accordion, Card, Button } from
  'react-bootstrap';
// Accordion 사용하려면 부트스트랩 다운그레이드 해야 합니다. 
// npm uninstall react-bootstrap
// npm install react-bootstrap@1.0.1

const API_KEY = 'AIzaSyBG6LBMPxrFJC48KMQcO8R04igj - KknE_g';
const ENGINE_ID = '002602307990519608607:hij8aj8dveo';

export default class WordAccordion extends Component {
  constructor(props) {
    super(props)
    this.getGoogleImages = this.getGoogleImages.bind(this);
  }

  //async, await
  getGoogleImages(word) {
    axios
      .get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${word}`)
      .then((res) => {
        console.log('--------', res)
        return res.data
      })
  }

  render() {
    const { word, sentences } = this.props
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
                  {sentences.map((sentence, index) => {
                    return <li key={index}>{sentence}</li>;
                  })}
                </ul>
                <div>
                  구글 이미지 또는 기사
                  {this.getGoogleImages()}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}
