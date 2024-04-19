import React, { useContext, useRef } from 'react'
import Layout from '../Layout/Layout'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../../Store/auth-context'
import UserProfileNotify from '../Alert/UserProfileNotify'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Profilepage = () => {
  
  const fullnameRef = useRef()
  const linkRef = useRef()
  const navigate = useHistory()
  const authCtx = useContext(AuthContext)
  console.log(authCtx)

  const userData = !authCtx.userdata;
  console.log(userData)

  const updateHandler =async(event)=>{
    event.preventDefault()
    
    const fullname = fullnameRef.current.value;
    const photolink = linkRef.current.value;
    console.log(fullname, photolink)

    let url ='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDsoMan9WsEPfVsu6_jJH-xs2zgguzFwrc';


    try {
      const  response = await fetch(url ,{
        method:'POST',
        body:JSON.stringify({
          idToken:authCtx.token,
          displayName:fullname,
          photoUrl:photolink
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      navigate.replace('/expensepage')

      console.log(data)

    } catch (error) { 
      console.log(error)
    }
    
  }


  return (
    <>
    {userData ? (
      <div>
      <Layout/>
      <section className="d-flex align-items-center justify-content-center mt-5">
        
            <Card style={{width:'50rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Contact Detail</Card.Title>
                    <Form onSubmit={updateHandler}>
                    <Row className="mb-4 mt-5">
                        <Col>
                            <Form.Group >
                                <Form.Label htmlFor="form6Example1">Full name</Form.Label>
                                <Form.Control type="text" placeholder="Full Name" ref={fullnameRef}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
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
      </div>
        ):(
          <UserProfileNotify/>
        )}
    </>
  )
}

export default Profilepage
