import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

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
    
    return (
        <div>
        {expesnselist.length === 0 ?(
           <h2>expense are not found</h2>):(
                expesnselist.map((item) => (
                    <Card key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.description}</Card.Title>
                            <Card.Text>
                                <strong>Price:</strong> {item.price}
                            </Card.Text>
                            <Card.Text>
                                <strong>Category:</strong> {item.category}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
        )}
        </div>
    );
};

export default ExpenseItem;
