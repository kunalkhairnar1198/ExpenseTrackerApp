import React, { useRef } from 'react'
import Layout from '../Layout/Layout'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const Profilepage = () => {
  
  const fullnameRef = useRef()
  const linkRef = useRef()
  
  const updateHandler =(event)=>{
    event.preventDefault()
    
    const fullname = fullnameRef.current.value;
    const link = linkRef.current.value;
    console.log(fullname, link)
  }


  return (
    <>
      <Layout/>
      <section className="d-flex align-items-center justify-content-center mt-5">
            <Card style={{width:'50rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Contact Detail</Card.Title>
                    <Form onSubmit={updateHandler}>
                    <Row className="mb-4 mt-5">
                        <Col>
                            <Form.Group controlId="form6Example1">
                                <Form.Label htmlFor="form6Example1">Full name</Form.Label>
                                <Form.Control type="text" placeholder="Full Name" ref={fullnameRef}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="form6Example2">
                                <Form.Label htmlFor="form6Example2">Profile Photo Url</Form.Label>
                                <Form.Control type="url" placeholder="Last name" ref={linkRef}/>
                            </Form.Group>
                        </Col>
                    </Row>
                        <div className="actions">
                            <Button type='submit' className="btn2" >
                              update
                            </Button>
                            <Button type='submit' className="btn2" >
                              cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    </>
  )
}

export default Profilepage
