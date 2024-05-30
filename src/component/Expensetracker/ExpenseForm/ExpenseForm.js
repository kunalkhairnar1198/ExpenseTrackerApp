import React, { useRef } from 'react';
import { Button, Card, Col, Form, FormControl, FormLabel, Row, Spinner } from 'react-bootstrap';
import ExpenseItem from '../ExpensItem/ExpenseItem';
import {expenseAction} from '../../../ReduxStore/ExpenseRtk/expense-slice';
import {useDispatch, useSelector} from 'react-redux';
import TotalExpense from '../ExpensItem/TotalExpense';
import '../Premium/Premium.css'

const ExpenseForm = () => {
  const priceRef = useRef();
  const descRef = useRef();
  const selectRef = useRef();

  const dispatch = useDispatch()
  const expenselistdata = useSelector(state => state.expense.expenseData)
  const darkMode = useSelector(state => state.theme.darkMode)

  // console.log(expenselistdata)

  let email = localStorage.getItem('email')

  if(email){
    email = email.replace(/[@.""]/g, "");
  }
  // console.log(email)


  const EditHandleritems = (itemid,editedItem) => {
    console.log(editedItem);
  
    priceRef.current.value = editedItem.price;
    descRef.current.value = editedItem.description;
    selectRef.current.value = editedItem.category;
  
    const index = expenselistdata.findIndex(item => item.id === editedItem.id);
    console.log(index);
    
    if (index !== -1) {
      if (
        expenselistdata[index].price !== editedItem.price ||
        expenselistdata[index].description !== editedItem.description ||
        expenselistdata[index].category !== editedItem.category
      ) {
        const updatedExpenseItems = [...expenselistdata];
  
        updatedExpenseItems[index] = {
          ...updatedExpenseItems[index],
          price: editedItem.price,
          description: editedItem.description,
          category: editedItem.category
        };
        dispatch(expenseAction.setEditExpense({itemid, updatedExpenseItems}))
      }
    }
  };
  

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    const price = priceRef.current.value;
    const description = descRef.current.value;
    const selectCat = selectRef.current.value;

    // console.log(price, description, selectCat);

    const obj ={
      id_:Math.random().toString(),
      price: price,
      description: description,
      category:selectCat
    }
    dispatch(expenseAction.addExpense(obj))
    // console.log(obj)

    try {
      const response = await fetch(`https://expensetracker-pro-default-rtdb.firebaseio.com/expenses/${email}.json`,{
        method :'POST',
        body: JSON.stringify(obj),
        headers:{
          "Content-Type": "application/json",
        },
       
      })
      if(response.ok){
        const data = await response.json()
        console.log(data)
      }
     
    } catch (error) {
      console.log(error)
    }

    priceRef.current.value ='';
    descRef.current.value='';
    selectRef.current.value='select';
  };

  
  return (
    <div className={!darkMode ? 'darkmode' : ''}>
    <div className="d-flex align-items-center justify-content-center" style={{marginTop:'4rem'}} >
      <Card className='mt-4 shadow rounded' style={{ width: '100%', marginRight: '1rem', marginLeft: '1rem' }}>
        <Card.Body className={!darkMode ?'darkmode':''}>
          <Card.Title className={`text-center ${!darkMode ? 'text-white':''}`}>Expense Form</Card.Title>
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col>
                <Form.Group controlId="form8Example1">
                  <FormLabel className={!darkMode ? 'text-white':''}>Price</FormLabel>
                  <FormControl type="number" placeholder="Enter price" ref={priceRef} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form8Example2">
                  <FormLabel className={!darkMode ? 'text-white':''}>Description</FormLabel>
                  <FormControl type="text" placeholder="Enter description" ref={descRef} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSelect">
                  <Form.Label className={!darkMode ? 'text-white':''}>Select a category</Form.Label>
                  <Form.Select aria-label="Select" ref={selectRef}>
                    <option value='select'>Select</option>
                    <option value="Food">Food</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Salary">Salary</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex align-items-center mt-2 gap-3 gap-md-2">
              <Button type="submit" className="btn" style={{ marginRight: '1rem' }}>
                Submit
              </Button>
              <Button className="btn">Update Expense</Button>
              <div className="ml-auto">
                   {expenselistdata.length > 0 && <TotalExpense />}
              </div>
            </div>
                
          </Form>
        </Card.Body>
      </Card>
    </div>
    <div className='d-flex align-items-center justify-content-center mt-5'>
      <ExpenseItem onEditHandler={EditHandleritems}/>
    </div>
    </div>
  );
};

export default ExpenseForm;
