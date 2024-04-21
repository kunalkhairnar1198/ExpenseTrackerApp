import React from 'react'
import { ExpenseContext } from './expense-context'

const ExpenseContextProvider = (props) => {
  return (
    <ExpenseContext.Provider>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider
