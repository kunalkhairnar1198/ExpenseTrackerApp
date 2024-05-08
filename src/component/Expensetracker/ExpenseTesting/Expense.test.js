import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import store from "../../../ReduxStore/RtkStore"; 
import TotalExpense from "../ExpensItem/TotalExpense";
import MainNavigation from "../../Layout/MainNavigation";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

describe('Expense Tracker test component correctly',()=>{
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

        test('renders MainNavigation component', () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <MainNavigation />
                    </BrowserRouter>
                </Provider>
            );
          
            const brandElement = screen.getByText('Expense Tracker');
            expect(brandElement).toBeInTheDocument();
          
            const homeLinkElement = screen.getByText('Home');
            expect(homeLinkElement).toBeInTheDocument();
          
          });
})