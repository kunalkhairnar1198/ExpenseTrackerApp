import React, {  useRef, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const verifyEmailRef = useRef()
    const [verificationSent, setVerificationSent] = useState(false);
    const [error, setError] = useState(null)    
    const tokenid = useSelector(state => state.profile.token)
    console.log(tokenid)
    const email = localStorage.getItem('email')


    const VerifyUserEmail = async(event)=>{
        event.preventDefault();

        const verifyEmail = verifyEmailRef.current.value;

        console.log(verifyEmail)


        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDA7zMjUFdpSnxs25Xp__p0f9WQTS3TwSk',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: verifyEmail,
                    idToken: tokenid,
                    requestType: 'VERIFY_EMAIL',
                }),
            });
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setVerificationSent(true)
            }else{
                const errorData = await response.json()
                setError(errorData.error.message)
            } 
        } catch (error) {
            setError('An error while sending the verification email.');
            console.error('Error sending verification email',error)
        }

    } 

  return (
    <>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Verify Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={verifyEmailRef} />
                </Form.Group>
                {verificationSent ? (
                    <p style={{color:'green'}}>Verification email sent. Check your email inbox for further instructions.</p>
                ) : (
                    <>
                        {error && <p style={{color:'red'}}>Error: {error}</p>}
                        <Button type='submit' onClick={VerifyUserEmail}>Verify Email</Button>
                    </>
                )}
            </Col>
    </>
  )
}

export default VerifyEmail
