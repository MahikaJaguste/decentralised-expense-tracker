import React, {useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from "react-router-dom";

// components
import Login from './routes/login';
import Add from './routes/add';
import View from './routes/view';

import './styles/logout.css';

export const AppContext = React.createContext();

const App = (props) => {

	const {viewComp} = props;

	const [account, setAccount] = useLocalStorage('account', '');

	const context_value = {
		account,
		setAccount,
	}

	let navigate = useNavigate();

	const onLogoutButtonHandler = () => {
		setAccount('');
		navigate("/", { replace: true });
	}

	// console.log(context_value);

	return (
		<>		

			{/* {account ? 
				<button
					type='submit'
					style={{marginRight:'200px'}}
					onClick={onLogoutButtonHandler} 
					id='logoutButton' 
					className='logoutButton'>
						Logout
				</button> :
				<></>
			} */}

				<AppContext.Provider value={context_value}>
					{account ? 
						<button
							type='submit'
							onClick={onLogoutButtonHandler} 
							id='logoutButton' 
							className='logoutButton'>
								Logout
						</button> :
						<></>
					}
					{!account ?
						<Login /> :
						!viewComp ?
							<Add/> : 
							<View/>
					}
				</AppContext.Provider>		
		</>
	);

};

export default App;
