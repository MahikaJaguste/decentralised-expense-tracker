import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import getTracker from '../ethereum/tracker';
import getFactory from '../ethereum/factory';
import { AppContext } from '../App';
import { useEffect } from 'react';


const View = () => {

    let app_data = useContext(AppContext);
    const {account} = app_data;
    let navigate = useNavigate();

    
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState('');
    const [income, setIncome] = useState('');
    const [expense, setExpense] = useState('');
    const [balance, setBalance] = useState('');

    let factory;
    let tracker;
    let entries;
    let _income;
    let _expense;
    let _balance;

    // const getInstances = async () => {
    //     factory = await getFactory();
    //     tracker = await getTracker({
    //         account,
    //         factory,   
    //     });
    // };

    useEffect(() => {
        const getTransactions = async () => {
            factory = await getFactory();
            tracker = await getTracker({
                account,
                factory,   
            });

            try{
                entries = await tracker.methods.getTransactions().call({
                    from: account
                });
                _income = await tracker.methods.getIncome().call({
                    from: account
                });
                _expense = await tracker.methods.getExpense().call({
                    from: account
                });
            }
            catch(err){
                console.log("Error in getting transactions : ", err.message);
            }
            setTransactions(entries);
            setIncome(_income);
            setExpense(_expense);
            setBalance(_income - _expense);
        };
        
        // setIsLoading(true);
        getTransactions();
        console.log(entries);
        // setIsLoading(false);

    }, []);


    const onAddButtonHandler = () => {
        navigate("../add", { replace: true });
    };

    return <> 
        {income && <h3>Income: {income}</h3>}
        {expense && <h3>Expense: {expense}</h3>}
        {balance && <h3>Balance: {balance}</h3>}
        {!transactions ? 
            <main style={{ padding: "1rem" }}>
			<h1>Getting transactions ... </h1>
			</main> :

            <ul>
            {[...transactions].reverse().map((transaction, index) => {
                    return <li key={index}>
                        <h5>Description: {transaction.description}, Amount: {transaction.value}</h5>
                        <br/>
                    </li>
                }
            )
            }
            </ul>
        }
        {console.log(transactions)}
        <button type='submit' onClick={onAddButtonHandler} id='addButton'>Add Transactions</button>
    </>
}

export default View;