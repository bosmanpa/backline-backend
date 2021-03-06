import React, { Component } from 'react';
import { updateRenterProfile } from '../actions/index'
import { connect } from 'react-redux';


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PromoterUpdate extends Component{
    
    state={
        renter_name:'',
        renter_location:'',
        renter_info:''
    }

    componentDidMount(){
        this.setState({
            renter_name: this.props.currentUser.renter_name,
            renter_location: this.props.currentUser.renter_location,
            renter_info: this.props.currentUser.renter_info
        })
    }

    componentDidUpdate(prevState) {
        if (this.props.currentUser.renter_name !== prevState.currentUser.renter_name) {
            this.setState({
                renter_name: this.props.currentUser.renter_name,
                renter_location: this.props.currentUser.renter_location,
                renter_info: this.props.currentUser.renter_info
            })
        }
      }

    handleInputChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        }
    
        fetch(`http://localhost:3001/users/${this.props.currentUser.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => {
            this.props.updateRenterProfile(user)
            this.props.history.push('/promoterprofile')
        })
      }
      
      handleDelete = () => {
        const reqObj = {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            renter_created: null, 
            renter_name: null,
            renter_location: null,
            renter_info: null
          })
        }
    
        fetch(`http://localhost:3001/users/${this.props.currentUser.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => {
            this.props.updateRenterProfile(user)
            this.props.history.push('/dashboard')
        })
      }

      handleBackClick = () =>{
        this.props.history.push('/promoterprofile')
      }


    render(){ 
        return (
            <Container>
        <Row>
            <Col></Col>
            <Col xs={6}> 
              <h2>Update Your Profile</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="renter_name" value={this.state.renter_name} onChange={(e) => this.handleInputChange(e)}>
                        <Form.Label>Owner/Company Name</Form.Label>
                        <Form.Control defaultValue={this.state.renter_name} />
                    </Form.Group>
                    <Form.Group controlId="renter_location" value={this.state.renter_location} onChange={(e) => this.handleInputChange(e)}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control defaultValue={this.state.renter_location} />
                    </Form.Group>
                    <Form.Group controlId="renter_info" value={this.state.renter_info} onChange={(e) => this.handleInputChange(e)}>
                        <Form.Label>Owner/Company Info</Form.Label>
                        <Form.Control as="textarea" rows="3" defaultValue={this.state.renter_info} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Update Profile
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
        <Row>
              <Col></Col>
              <Col>
              <Button variant="primary" onClick={this.handleDelete}> Delete this Profile</Button>
              </Col>
              <Col></Col>
              </Row>
              <Row>
              <Col></Col>
              <Col>
              <Button variant="primary" onClick={this.handleBackClick}>Back To Profile</Button>
              </Col>
              <Col></Col>
              </Row>
      </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRenterProfile: (user) => {
            dispatch(updateRenterProfile(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoterUpdate)