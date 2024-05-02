import React, { useCallback, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../../../ReduxStore/ExpenseRtk/expense-slice';

const ExpenseItem = (props) => {
    const expenseLists = useSelector(state => state.expense.expenseData)
    console.log(expenseLists)
    const dispatch = useDispatch()

    let email = localStorage.getItem('email')

    if(email){
        email = email.replace(/[@.""]/g, "");
    }

    useEffect(()=>{
        GetData()
    },[])  

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
            dispatch(expenseAction.addNewExpense(loadedData))
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
            dispatch(expenseAction.deleteExpense(id))

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
            props.onEditHandler(item.id, item)
            handleDeleteitem(item.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <Card className="mt-0 shadow p-3 mb-5 bg-white rounded" style={{ width: '100%', marginRight: '1rem', marginLeft: '1rem', boxShadow:'5rem' }}>
        {expenseLists.length === 0 ?(
           <h2>expense are not found</h2>):(
            expenseLists.map((item) => (
                    <Card  key={item.id} className='mt-4 mb-0 shadow bg-white rounded' style={{ width: 'calc(100% - 2rem)',  margin: '0 1rem' }}>
                        <Card.Body className='d-flex mt-2'>
                            <div style={{ flex: 1}}>
                                <span>
                                    <strong>Desc:</strong> {item.description}
                                </span>
                                <span>
                                    <strong>Price:</strong> {item.price}
                                </span>
                                <span>
                                    <strong>Category:</strong> {item.category}
                                </span>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <Button onClick={() => EditHandleritem(item)}>Edit</Button>
                                <Button variant='danger' onClick={() => handleDeleteitem(item.id)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
        )}
        </Card>
        </>
    );
};

export default ExpenseItem;
