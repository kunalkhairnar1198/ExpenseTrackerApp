import React, { useContext, useRef, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthContext } from '../../Store/auth-context'
import Layout from '../Layout/Layout'

const Forgotpass = (props) => {

    const emailPassRef = useRef()
    const changePassRef = useRef()
    const navigate = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState()
    const [verificationSent, setVerificationSent] = useState(false);
    const [isForgot, setIsForgot] = useState(true)

    const submitHandler =async(event)=>{
        event.preventDefault()
    
    if(isForgot) {
        const forgotPassmail = emailPassRef.current.value;
       
                try {
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDA7zMjUFdpSnxs25Xp__p0f9WQTS3TwSk',{
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
                        setVerificationSent(true)
                    }else{
                        const errorData = await response.json;
                        setVerificationSent(false)
                        setIsError(errorData.error.message)
                        console.error('passwordResetError', errorData)
                    }
                } catch (error) {
                    setIsError('An error while sending the verification')
                    console.log('password reset error',error)
                }

            }else{
               const passwordRef = changePassRef.current.value
               console.log('password will change',passwordRef) 
                navigate.replace('/authpage')
            }
    }

    const changeHandlers =()=>{
        setIsForgot(false)
    }

    const BackToLogin =()=>{
       navigate.replace('/authpage')
    }



  return (
    <>
        <div style={{marginTop:'6rem'}}>
            <Layout/>
        </div>
    <section className="d-flex align-items-center justify-content-center mt-5">
    <Card className="card">
        <Card.Body>
            <Card.Title className="text-center">Reset password</Card.Title>
                   <Form> 
                   {isForgot ? (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailPassRef} required/>
                    </Form.Group>):(

                    <Form.Group className="mb-3" controlId="formBasicpassword">
                        <Form.Label>Password Change</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" ref={changePassRef} required/>
                    </Form.Group>)}

                    <div className="actions">
                        <Button onClick={submitHandler} type="submit" className="btn1">
                            {isForgot ? ' Send Verification mail' : 'Forgot password'}
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

    {isLoading && (<Alert style={{ width: '25rem', margin: 'auto', textAlign: 'center', marginTop: '2rem' }}>
        {isError}
    </Alert>)}

    {verificationSent && <Alert style={{ width: '25rem', margin: 'auto', textAlign: 'center', marginTop: '2rem' }}>
        Verification email sent successfully. Please check your inbox.
                        <Button onClick={changeHandlers} className="btn2" style={{ backgroundColor: 'transparent', border: 'none', color: 'blue' }}>
                            Click here change password
                        </Button>
    </Alert>}

    </>
  )
}

export default Forgotpass
