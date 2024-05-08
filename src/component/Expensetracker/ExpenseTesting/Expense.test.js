import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import store from "../../../ReduxStore/RtkStore"; 
import TotalExpense from "../ExpensItem/TotalExpense";
import MainNavigation from "../../Layout/MainNavigation";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import userEvent from '@testing-library/user-event'
import PremiumButton from "../Premium/PremiumButton";

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

          test('clicking SignIn link navigates to the authentication page', () => {
            render(
              <Provider store={store}>
                <BrowserRouter>
                  <MainNavigation />
                </BrowserRouter>
              </Provider>
            );
          
            const signInLink = screen.getByText('SignIn');
            userEvent.click(signInLink);
          
            expect(window.location.pathname).toBe('/authpage');
          });

          test('renders  if the premium is Activated clicked',()=>{
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PremiumButton />
                    </BrowserRouter>
                </Provider>
            )
            const premiumButton  = screen.getByText('Premium Activate')
            userEvent.click(premiumButton)
            
        })

        test('renders  if the premium is Activated or not clicked',()=>{
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PremiumButton />
                    </BrowserRouter>
                </Provider>
            )
            const premiumButton  = screen.getByRole('button')
            userEvent.click(premiumButton)

            const outputElement = screen.getByText('Download')
            expect(outputElement).toBeInTheDocument()
        })

        test('renders mainNavigation',()=>{
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PremiumButton />
                    </BrowserRouter>
                </Provider>
            )
            const premiumButton  = screen.getByRole('button')
            userEvent.click(premiumButton)

            const outputElement = screen.getByText('Download')
            expect(outputElement).toBeInTheDocument()
        })

        test('clicking Premium Activate button triggers the dark mode handler', () => {
            render( 
            <Provider store={store}>
                <BrowserRouter>
                    <PremiumButton />
                </BrowserRouter>
            </Provider>
            );
            
            const premiumActivateButton = screen.getByRole('button', { name: 'Premium Activate' });
            userEvent.click(premiumActivateButton);
          
        });

})