import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import web3 from '../ethereum/web3';
import getTracker from '../ethereum/tracker';
import getFactory from '../ethereum/factory';
import { AppContext } from '../App';


const Add = () => {

    let app_data = useContext(AppContext);
    const {account} = app_data;
    let navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let factory;
    let tracker;

    const getInstances = async () => {
        factory = await getFactory();
        tracker = await getTracker({
            account,
            factory,   
        });
    };


    const onSubmit = async (event) => {
        event.preventDefault();

        await getInstances();
        setIsLoading(true);
        setErrorMessage('');
        console.log('web3', web3);
        console.log('factory instance', factory);
        console.log('account', account);
        console.log('tracker instance', tracker);

        try{
            await tracker.methods.addTransaction(description, parseInt(amount)).send({
                from: account
            });
        }
        catch(err){
            console.log("Error in adding transaction : ", err.message);
            setErrorMessage(err.message);
        }

        setIsLoading(false);
        setDescription('');
        setAmount('');
        setErrorMessage('');

        navigate("../add", { replace: true });
    };

    const onViewButtonHandler = () => {
        navigate("../view", { replace: true });
    };

    return <>

            <h3>Add a transaction</h3>

            <form>
                <label htmlFor='description'>Description</label>
                <input
                    id='description' 
                    name='Description' 
                    type='text'
                    value = {description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <br/>
                <label htmlFor='amount'>Amount</label>
                <input
                    id='amount' 
                    name='Amount' 
                    type='number'
                    value = {amount}
                    onChange={(event) => setAmount(event.target.value)}
                />
                <br/>
                <button id='submit' onClick={onSubmit}>Add</button>
            </form> 
            <br/>
            <button type='submit' onClick={onViewButtonHandler} id='viewButton' className='button'>View Transactions</button>      
    </>
}

export default Add;