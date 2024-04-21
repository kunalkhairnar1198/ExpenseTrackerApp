import React, { useRef, useState } from 'react';
import { Button, Card, Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap';
import ExpenseItem from '../ExpensItem/ExpenseItem';

const ExpenseForm = () => {
  const priceRef = useRef();
  const descRef = useRef();
  const selectRef = useRef();
  const [expenseItems, setExpenseItem] = useState([
    // {
    //   id_:4,
    //   price :50,
    //   description:'fsdfsd',
    //   category:'Food',
    // }
  ])

  const onSubmitHandler = (event) => {
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
    // console.log(obj)

    setExpenseItem(PrevItem => [...PrevItem, obj])
  

  };
  console.log(expenseItems)
  return (
    <>
    <div className="d-flex align-items-center justify-content-center mt-3">
      <Card className="mt-4" style={{ width: '100%', marginRight: '1rem', marginLeft: '1rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Expense Form</Card.Title>
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col>
                <Form.Group controlId="form8Example1">
                  <FormLabel>Price</FormLabel>
                  <FormControl type="number" placeholder="Enter price" ref={priceRef} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form8Example2">
                  <FormLabel>Description</FormLabel>
                  <FormControl type="text" placeholder="Enter description" ref={descRef} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSelect">
                  <Form.Label>Select a category</Form.Label>
                  <Form.Select aria-label="Select" ref={selectRef}>
                    <option value="Food">Food</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Salary">Salary</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-2 d-grid gap-2 d-md-block">
              <Button type="submit" className="btn" style={{ marginRight: '1rem' }}>
                Submit
              </Button>
              <Button className="btn">Update Expense</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
    <div className='d-flex align-items-center justify-content-center mt-5'>
      <ExpenseItem items={expenseItems}/>
    </div>
    </>
  );
};

export default ExpenseForm;
