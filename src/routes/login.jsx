import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import getAccount from '../ethereum/account';
import { AppContext } from '../App';


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
        <h4>Connect to Expense Tracker with your account</h4>
        <button type='submit' onClick={onLoginHandler} id='loginButton'>Connect</button>
    </>
}

export default Login;