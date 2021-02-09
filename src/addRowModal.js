import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'; 

export class AddRowModal extends Component{
    state={
        make: "",
        model:"",
        price:"",
        show: false,
        finalResult: []
    }
    handleShow = () =>{
        this.setState({show: true});
    }
    saveChanges = () =>{
        const make= this.state.make;
        if(make.split(';')){
            const makeArr = make.split(';');
            const finalResult =  makeArr.map(item =>{
                return {make:item, model: this.state.model, price: this.state.price}
            });
            this.props.handleStateUpdate(finalResult);
        }else{
            this.props.handleStateUpdate([this.state]);
        }
        
        this.setState({show:false});
    }

    handleClose= () =>{
       this.setState({show:false})
    }

    maker = (e) =>{
        this.setState({ make: e.target.value });
    }
    render() {
    return( 
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >Navbar</a>
                    <button className="btn btn-outline-success" type="submit" onClick={this.handleShow}>Add Row</button>
                </div>
        </nav>  
        {this.state.show && (
        <Modal show={this.state.show}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicMake">
                        <Form.Label>Make</Form.Label>
                        <Form.Control name="make" type="text" placeholder="make" 
                        onChange={this.maker}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control name="model" type="text" placeholder="model" 
                        onChange={e => this.setState({ model: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="text" placeholder="price" 
                        onChange={e => this.setState({ price: e.target.value })} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={this.saveChanges}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>)}
    </div>)
    }
}