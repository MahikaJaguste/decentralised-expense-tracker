import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import getTracker from '../ethereum/tracker';
import getFactory from '../ethereum/factory';
import { AppContext } from '../App';
import { useEffect } from 'react';

import '../styles/view.css';

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
        <br/>
        <button type='submit' onClick={onAddButtonHandler} id='addButton'>Add Transactions</button>

        {income && expense && balance && 
            <div className='flex-container-view'>
                <h3 className='flexbox-item-view'>Income: {income}</h3>
                <h3 className='flexbox-item-view'>Expense: {expense}</h3>
                <h3 className='flexbox-item-view'>Balance: {balance}</h3>
            </div>
        }
        {!transactions ? 
            <main style={{ padding: "1rem" }}>
			<h1>Getting transactions ... </h1>
			</main> :                
            <div className='grid-container-view'>
            {[...transactions].reverse().map((transaction, index) => {
                    return <div className='grid-item-view' key={index}>
                        <h4>{transaction.description}</h4>
                        <h3>{transaction.value}</h3>
                    </div>
                }
            )
            }
            </div>
        }
        {console.log(transactions)}
    </>
}

export default View;