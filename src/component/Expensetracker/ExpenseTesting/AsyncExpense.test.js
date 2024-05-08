import { Provider } from "react-redux";
import { render, screen, waitFor } from '@testing-library/react';
import store from "../../../ReduxStore/RtkStore"; 
import ExpenseItem from "../ExpensItem/ExpenseItem";


describe('Test Asyc code on Expense Item',()=>{
    test('ExpenseItem contennt ', () => {
        render(
            <Provider store={store}>
                <ExpenseItem/>
            </Provider>
            )

            const messageElement = screen.getByText('expense are not found')
            expect(messageElement).toBeInTheDocument()
        
    })

    test('Expense Item render check and test testcases',async()=>{
        const mockExpenses = [
            { id: '1', description: 'Expense 1', price: 10, category: 'Category 1' }

        ]

        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json: async () =>  mockExpenses
        })
       
        render(
            <Provider store={store}>
              <ExpenseItem/>
            </Provider>
        )

        await waitFor(() => {

            mockExpenses.forEach((item) => {
              const descriptionText = `Desc: ${item.description}`;
              expect(screen.getByText((content, element) => {
                return element.textContent === descriptionText;
              })).toBeInTheDocument();
        
              expect(screen.getByText((content, element) => {
                return element.textContent === `Price: ${item.price}`;
              })).toBeInTheDocument();
        
              expect(screen.getByText((content, element) => {
                return element.textContent === `Category: ${item.category}`;
              })).toBeInTheDocument();
            });
          });
    
    })

    

  
})
