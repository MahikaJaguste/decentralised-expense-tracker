import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import getAccount from '../ethereum/account';
import { AppContext } from '../App';

import '../styles/login.css';

const Login = () => {
    //const [isConnecting, setIsConnecting] = useState(false);

    let app_data = useContext(AppContext);
    const {setAccount} = app_data;
    let navigate = useNavigate();

    const onLoginHandler = async () => {
        //setIsConnecting(true);
        const ret_account = await getAccount();
        setAccount(ret_account);
        //setIsConnecting(false);
        navigate("../add", { replace: true });
    }

    return <>
        <div className='flex-container-login'>
            <h4 className='flexbox-item-login-1'>Connect to Expense Tracker with a MetaMask account</h4>
            <button type='submit' onClick={onLoginHandler} id='loginButton' className='flexbox-item-login-2'>Connect</button>
        </div>  
    </>
}

export default Login;