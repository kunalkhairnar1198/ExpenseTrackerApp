import React, {  useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './AuthForm.css';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authAction } from '../../ReduxStore/AuthRtk/Auth-Reducer';
import { profileAction } from '../../ReduxStore/AuthRtk/Profile-slice/Profile-slice';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)   
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();
    const navigate = useHistory()
    const dispatch = useDispatch()

    const switchHandlers =()=>{
        setIsLogin(prevState => !prevState)
    }

    const isForgotpassHandler =()=>{
        navigate.replace('/resetpasspage')
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

       if(!isLogin){

        const confirmPassword = confirmPassRef.current.value;

            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }
        }
        
        setIsLoading(true)

        let url = '';

        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA7zMjUFdpSnxs25Xp__p0f9WQTS3TwSk';
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDA7zMjUFdpSnxs25Xp__p0f9WQTS3TwSk'
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false)
            if (response.ok) {
                const data = await response.json();
                console.log('Authentication successful:', data);
                dispatch(authAction.loginHandler(data.idToken))
                dispatch(profileAction.isCompleteProfile(data.displayName))
                
                localStorage.setItem('email', data.email)

                data.displayName ? navigate.replace('/expensepage') :  navigate.replace('/profilepage')
                
            }else{
                const errorData = await response.json();
                throw new Error(errorData ||'Authentication failed');
            }

           
        } catch (error) {
            console.log('Error during authentication:', error.message);
        }
    };

    return (
        <section className="d-flex align-items-center justify-content-center mt-5">
            <Card className="card">
                <Card.Body>
                    <Card.Title className="text-center">{isLogin ? 'Login' : ' SignUp'}</Card.Title>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                        </Form.Group>

                        {!isLogin && (
                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPassRef} />
                        </Form.Group>
                        )}
                        
                        <div className="actions">
                            <Button type="submit" className="btn1">
                                {isLogin ? 'Login' : 'Signup '}
                                {isLoading && <p>Sending Request....</p>}
                            </Button>

                            <Button onClick={isForgotpassHandler} variant="danger" type="button" style={{ backgroundColor: 'transparent', border: 'none', color: 'blue' }} >
                                 forgot password
                            </Button>
                            
                            <Button onClick={switchHandlers} className="btn2" style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}>
                                {isLogin ? 'Create new Account' : 'Already Have an account? Login'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
};

export default AuthForm;
