import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const ExpenseItem = (props) => {
    const [expesnselist, setExpenselist] = useState([])
    let email = localStorage.getItem('email')

    if(email){
        email = email.replace(/[@.""]/g, "");
    }

    useEffect(()=>{
        GetData()
    },[props.items])  

    const GetData = useCallback( async()=>{
        try {
            const response = await fetch(`https://expense-tracker-66fc0-default-rtdb.firebaseio.com/expenses/${email}.json`)
            const data = await response.json()
            // console.log(data)
            let loadedData = []

            for(const key in data){
                loadedData.push({
                    id:key,
                    price:data[key].price,
                    description: data[key].description,
                    category:data[key].category
                })
            }

            setExpenselist(loadedData)
            console.log(loadedData)

          } catch (error) {
            console.log(error)
          }
    },[email])

    const handleDeleteitem = async(id)=>{

        try {
            const response = await fetch(`https://expense-tracker-66fc0-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,{
                method:'DELETE'
            })
            console.log('resppnse',response)
            setExpenselist(prev => prev.filter((item)=> item.id !== id))

        } catch (error) {   
                console.log(error)
        }
    }

    const EditHandleritem = async(item) => {
        // console.log(item)   

        try {
            const response = await fetch(`https://expense-tracker-66fc0-default-rtdb.firebaseio.com/expenses/${email}/${item.id}.json`)
            const data = await response.json()
            console.log(data, props)
            props.onEditHandler(item)
            handleDeleteitem(item.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        {expesnselist.length === 0 ?(
           <h2>expense are not found</h2>):(
                expesnselist.map((item) => (
                    <Card key={item.id} style={{width:'80rem', boxShadow:'2rem', marginBlockEnd:'2rem'}}>
                        <Card.Body className='d-flex mt-2'>
                            <span>{item.description}</span>
                            <span>
                                <strong>Price:</strong> {item.price}
                            </span>
                            <span>
                                <strong>Category:</strong> {item.category}
                            </span>
                            <div className='row'>
                                <Col className='justify-content-end'>
                                <Button onClick={()=> EditHandleritem(item)}>Edit</Button>
                                <Button onClick={ () => handleDeleteitem(item.id)}>Delete</Button>
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                ))
        )}
        </div>
    );
};

export default ExpenseItem;
