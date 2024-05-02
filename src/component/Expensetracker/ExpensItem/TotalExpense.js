import React from 'react'
import { useSelector } from 'react-redux';

const TotalExpense = () => {
 
    const totalamt = useSelector(state => state.expense.totalAmount)
    console.log(totalamt)

  return (
    <div className='mt-1 m-auto' >
      <h5>
        TotalExpense - {totalamt}
      </h5>
    </div>
  )
}

export default TotalExpense
