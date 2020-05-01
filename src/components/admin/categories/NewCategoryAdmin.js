import React, { useState } from 'react'
import '../../../styles/categoryAdmin.css'
import { FaRegEdit } from 'react-icons/fa';
import {FaTrashAlt} from 'react-icons/fa';
import { Form,Button,ButtonGroup,Table,Modal } from 'react-bootstrap';

export default function NewCategoryAdmin({title,subtitle}) {

    const [show,setShow] = useState(false) 
    const [update,setUpdate] = useState(false) 

    return (
        
        <div class="container" id="category-heading">
        <h1>{title}
        <Button variant="warning" onClick={() => setUpdate(true)}  class="btn btn-outline-warning" type="submit">Edit</Button>
        <Button variant="danger"  class="btn btn-outline-danger" type="submit">Delete</Button>
        </h1><hr/>
        <div className="subtitles"><p>{subtitle}</p>
     
            <Table striped bordered hover >
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Skirts</td>
                <td><Button variant="warning" onClick={() => setUpdate(true)} className="btn-edit" type="submit"><FaRegEdit/></Button></td>
                <td> <Button variant="danger" className="btn-delete" type="submit"><FaTrashAlt/></Button></td> 
                </tr>
                </tbody>
            </Table>

            </div> 

            <Button bsStyle="primary" bsSize="large" onClick={() => setShow(true)}>
          Add New category
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter New Category" />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="danger" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
          </Modal>

          <Modal show={update} onHide={() => setUpdate(false)}>
                <Modal.Header>
                <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Update your Category" />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="danger" onClick={() => setUpdate(false)}>Close</Button>
                </Modal.Footer>
          </Modal>

            <div className="static-modal">
            
            </div>
            
            </div> 

    )
}

