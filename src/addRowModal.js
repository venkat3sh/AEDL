import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'; 
import { Row, Column } from 'react-foundation';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.css';

export class AddRowModal extends Component{
    state={
        rqstr_id: 'NA', 
        db_type_desc:'Hive', 
        src_sys_nm: 'Prod',
        ctlg_nm: 'NA', 
        schma_nm:'NA', 
        src_tbl_nm: 'NA',
        src_clmn_list_file_txt: 'NA', 
        destn_s3_obj_key:'NA', 
        destn_s3_bkt_nm: 'NA',
        destn_type_desc: 'S3',
        show: false,
        finalResult: []
    }
    handleShow = () =>{
        this.setState({show: true});
    }
    saveChanges = () =>{
        const src_tbl_nm= this.state.src_tbl_nm;
        if(src_tbl_nm.split(',')){
            const makeArr = src_tbl_nm.split(',');
            const finalResult =  makeArr.map(item =>{
                return {
                    src_tbl_nm:item, 
                    rqstr_id: this.state.rqstr_id, 
                    db_type_desc:this.state.db_type_desc,
                    src_sys_nm: this.state.src_sys_nm,
                    ctlg_nm: this.state.ctlg_nm, 
                    schma_nm:this.state.schma_nm, 
                    src_clmn_list_file_txt: this.state.src_clmn_list_file_txt, 
                    destn_s3_obj_key:this.state.destn_s3_obj_key, 
                    destn_s3_bkt_nm: this.state.destn_s3_bkt_nm,
                    destn_type_desc: this.state.destn_type_desc,
                }
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
        this.setState({ src_tbl_nm: e.target.value });
    }
    render() {
    return( 
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >Vulcan Metadata</a>
                    <button className="btn btn-outline-success" type="submit" onClick={this.handleShow}>Add Metadata</button>
                </div>
        </nav>  
        {this.state.show && (
        <Modal show={this.state.show}>
            <Modal.Header closeButton>
                <Modal.Title>Vulcan Metadata</Modal.Title>            
            </Modal.Header>            
            <Modal.Body>
                <Form>

                    <Form.Group as={Row} controlId="formBasicReq">
                        <Form.Label column sm="4">Requester ID</Form.Label>                        
                        <Column sm="10">                        
                        <InputGroup hasValidation>                                                        
                            <Form.Control name="rqstr_id" type="text" aria-describedby="inputGroupPrepend" placeholder="Requester ID" 
                            onChange={e => this.setState({ rqstr_id: e.target.value })}/>  
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDBDesc">
                        <Form.Label  column sm="4">DB Description</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="db_type_desc" type="text" placeholder="DB Description" 
                        onChange={e => this.setState({ db_type_desc: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>                        
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicSrcSys">
                        <Form.Label column sm="4">Source System</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                            <Form.Control name="src_sys_nm" placeholder="Source System"  as="select" onChange={e => this.setState({ src_sys_nm: e.target.value })}>
                                <option>Select</option>
                                <option>mbr</option>
                                <option>clm</option>
                                <option>prod</option>
                                <option>prov</option>
                                <option>coa</option>
                            </Form.Control>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group> 
                    <Form.Group as={Row} controlId="formBasicCatlg">
                        <Form.Label column sm="4">Catalog Name</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                            <Form.Control name="ctlg_nm" placeholder="Source System"  as="select" onChange={e => this.setState({ ctlg_nm: e.target.value })}>
                                <option>Select</option>
                                <option>Teradata</option>
                                <option>Hive</option>                            
                            </Form.Control>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>                                       
                    <Form.Group as={Row} controlId="formBasicSchema">
                        <Form.Label  column sm="4">Schema Name</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="schma_nm" type="text" placeholder="Schema Name" 
                        onChange={e => this.setState({ schma_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicSourceTable">
                        <Form.Label  column sm="4">Source Table</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="src_tbl_nm" type="text" placeholder="Source Table" 
                        onChange={e => this.setState({ src_tbl_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicColList">
                        <Form.Label  column sm="4">Column List Text</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="src_clmn_list_file_txt" type="text" placeholder="Column List Text" 
                        onChange={e => this.setState({ src_clmn_list_file_txt: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestObj">
                        <Form.Label  column sm="4">Destination Object</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_s3_obj_key" type="text" placeholder="Destination Object" 
                        onChange={e => this.setState({ destn_s3_obj_key: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestBucket">
                        <Form.Label  column sm="4">Destination Bucket</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_s3_bkt_nm" type="text" placeholder="Destination Bucket" 
                        onChange={e => this.setState({ destn_s3_bkt_nm: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDestDesc">
                        <Form.Label  column sm="4">Destination Type Desc</Form.Label>
                        <Column sm="10">
                        <InputGroup hasValidation>
                        <Form.Control name="destn_type_desc" type="text" placeholder="Destination Type Desc" 
                        onChange={e => this.setState({ destn_type_desc: e.target.value })}/>
                        <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <div title="Help Text goes here"><FontAwesomeIcon icon={faInfoCircle} /></div>
                                    {/* <i class="fas fa-info-circle" title="Some text goes here"></i> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>                          
                        </InputGroup>
                        </Column>
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control name="model" type="text" placeholder="model" 
                        onChange={e => this.setState({ model: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="text" placeholder="price" 
                        onChange={e => this.setState({ price: e.target.value })} />
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.saveChanges}>
                    Submit Record(s)
                </Button>
            </Modal.Footer>
        </Modal>)}
    </div>)
    }
}