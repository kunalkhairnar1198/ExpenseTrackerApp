import {  Container, Nav,   Navbar } from 'react-bootstrap'
import  {NavLink}  from 'react-router-dom'
import './MainNavigation.css'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../ReduxStore/AuthRtk/Auth-Reducer'
import PremiumButton from '../Expensetracker/Premium/PremiumButton'
import '../Expensetracker/Premium/Premium.css';

const MainNavigation = () => {
    
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const totalamt = useSelector(state => state.expense.totalAmount)

  const logoutHanlder=()=>{
    dispatch(authAction.logoutHandler())
  }

  return (
    <>
    <Navbar  expand="lg" className="custom-navbar">
  
      <Container fluid>
          <Navbar.Brand href="/">
          <h3>Expense Tracker</h3>
          </Navbar.Brand>

          {/* <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="#" >Home</Nav.Link>
            <Nav.Link as={NavLink} to="#">Procuct</Nav.Link>
            <Nav.Link as={NavLink} to="#">About us</Nav.Link>
          </Nav> */}

          <Nav className="d-flex align-items-center">
                   {totalamt > 10000 && <PremiumButton/>}
                   {!isAuth ? (
                                <Nav.Link as={NavLink} to="/authpage" >SignIn</Nav.Link>
                                ):(
                                  <Nav.Link as={NavLink} to="/authpage" onClick={logoutHanlder}>SignOut</Nav.Link>
                                )}

                   {isAuth && <Nav.Link as={NavLink} to="/profilepage" >Profile</Nav.Link>}
          </Nav>     
      </Container>
    </Navbar>
    </>
  )
}

export default MainNavigation
