import React, { Component, Fragment } from 'react'
//import '../styles/App.css'
import '../../styles/ContactUs.css'
import { Card,Container,Row,Col} from 'react-bootstrap';

export default class ContactDetails extends Component {
    render() {
        return (
            <Fragment>
            <Container>
            <Row>
                <Col>
                <div className="contact-details">
                <Card className="text-center">
                <Card.Header><h4>Company information</h4></Card.Header>
                <Card.Body>
                    <Card.Text>
                    <p>Cooperate Fashionz (Pvt) Ltd<br/>
                    Trending Bella's Stores<br/>
                    Reg Number 2478698</p>
                    <h5>info@bellafashions.lk</h5>
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </Col>

                <Col>
                <div className="contact-details">
                <Card className="text-center">
                <Card.Header><h4>Customer Care Hotline</h4></Card.Header>
                <Card.Body>
                    <Card.Text>
                    <p>+11 2 770 554 </p>
                    </Card.Text>
                </Card.Body>
                </Card>
                <Card className="text-center">
                <Card.Header><h4>Online Orders</h4></Card.Header>
                <Card.Body>
                    <Card.Text>
                    <p>+11 2 880 554</p>
                    </Card.Text>
                </Card.Body>
                </Card>
            </div>
                </Col>

                <Col>
                <div className="contact-details">
            <Card className="text-center">
            <Card.Header><h4>Outlet 01</h4><h5>Bella's Store, Colombo 05</h5></Card.Header>
            <Card.Body>
                <Card.Text>
                <p>
                    576 Galle Rd, Colombo 00500, 
                    Sri Lanka.</p>
                <h5>+94 708 556 441</h5>
                </Card.Text>
            </Card.Body>
            </Card></div>
            </Col>
            <Col>
            <div className="contact-details">
            <Card className="text-center">
            <Card.Header><h4>Outlet 02</h4><h5>Bella's Store, Maharagama</h5></Card.Header>
            <Card.Body>
                <Card.Text>
                <p>
                247, Old Kottawa Road, Maharagama, Sri Lanka.
                </p>
             <h5>+94 11 2639 885</h5>
                </Card.Text>
            </Card.Body>
            </Card>
            </div>
            </Col>
            </Row>
            </Container>
            

            

            
            
          </Fragment>
        )
    }
}
