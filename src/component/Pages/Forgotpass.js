import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Forgotpass = (props) => {

    const emailPassRef = useRef()
    const navigate = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState()
    const [verificationSent, setVerificationSent] = useState(false);

    const submitHandler =async(event)=>{
        event.preventDefault()
        const forgotPassmail = emailPassRef.current.value;
        // console.log(forgotPassmail)

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDsoMan9WsEPfVsu6_jJH-xs2zgguzFwrc',{
                method: 'POST',
                body: JSON.stringify({
                    email: forgotPassmail,
                    requestType:"PASSWORD_RESET"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsLoading(true)
            
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
                setIsError('SUCCESFULY SEND DATA TO THE EMAIL')
                navigate.replace('/authpage')
            }else{
                const errorData = await response.json;
                setVerificationSent(true)
                setIsError(errorData.error.message)
                console.error('passwordResetError', errorData)
            }
        } catch (error) {
            setIsError('An error while sending the verification')
            console.log('password reset error',error)
        }


    }

    const BackToLogin =()=>{
       navigate.replace('/authpage')
    }



  return (
    <>
    <section className="d-flex align-items-center justify-content-center mt-5">
    <Card className="card">
        <Card.Body>
            <Card.Title className="text-center">Reset password</Card.Title>
                   <Form> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailPassRef} required/>
                        {verificationSent && (<p style={{color:'red'}}>Verification email is not found.</p>)}
                    </Form.Group>
                    <div className="actions">
                        <Button onClick={submitHandler} type="submit" className="btn1">
                            Send Verification mail
                            {isLoading && <Spinner animation="border" size="lg" />}
                        </Button>
                        <Button onClick={BackToLogin} className="btn2" style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}>
                            Back to Login
                        </Button>
                    </div>
                    </Form>
            </Card.Body>
        </Card>
    </section>
    {isLoading && <Alert style={{ width: '25rem', margin: 'auto', textAlign: 'center', marginTop: '2rem' }}>
        {verificationSent && isError}
    </Alert>}
    </>
  )
}

export default Forgotpass
