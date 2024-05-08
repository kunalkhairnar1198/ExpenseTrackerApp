import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import store from "../../../ReduxStore/RtkStore"; 
import TotalExpense from "../ExpensItem/TotalExpense";

describe('TotalExpense component',()=>{
        test('Total Expense test correctly!', () => {
            
        render(
            <Provider store={store}>
            <TotalExpense />
            </Provider>
        );

        const totalExpenseRegex = new RegExp(`TotalExpense - 0`);
        const TotalExpenseElement = screen.getByText(totalExpenseRegex);
        
        expect(TotalExpenseElement).toBeInTheDocument();
        });
})