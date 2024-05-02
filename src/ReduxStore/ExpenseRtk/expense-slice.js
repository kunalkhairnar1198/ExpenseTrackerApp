import {createSlice} from '@reduxjs/toolkit'

const initialExpense ={
    expenseData : [],
    totalAmount:0,
}

const expenseSlice = createSlice({
    name:'expenses',
    initialState: initialExpense,
    reducers:{
        addExpense(state,action){
           state.expenseData.push(action.payload)
           state.totalAmount += Number(action.payload.price);
        },
        addNewExpense(state, action){
            state.expenseData = action.payload
            state.totalAmount = action.payload.reduce((total, expense) => total + Number(expense.price), 0);
        },
        setEditExpense(state,action){
            const {itemid, updatedExpenseItems} = action.payload;
            state.expenseData[itemid] = updatedExpenseItems
            state.totalAmount = state.expenseData.reduce((total, expense) => total + expense.price, 0);
        },
        deleteExpense(state,action){
            const deletedExpense = state.expenseData.find(item => item.id === action.payload);
            if (deletedExpense) {
                state.totalAmount -= deletedExpense.price;
            }
            state.expenseData = state.expenseData.filter(item => item.id !== action.payload);
        }
    }
})

console.log(initialExpense.expenseData)
export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;