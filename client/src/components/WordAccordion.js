import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import '../CSS/Wordbook.css';

export default class WordAccordion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { word, sentences } = this.props
    return (
      <div className="accordion_area">
        <Accordion
          defaultActiveKey="0">
          <Card className="accordion_card">
            <Card.Header className="card_haeder">
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                {word}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ul className="sentences">
                  {sentences.map((sentence, index) => {
                    return <li key={index}>{sentence}</li>;
                  })}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}
