import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

import App from './App';

// import { Provider } from 'react-redux';
// import store from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		{/* <Provider store={store}>
			<App />
		</Provider> */}
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Routes>
			<Route path="/" element={<App/>}/>
			<Route path="add" element={<App/>} />
			<Route path="view" element={<App viewComp={true}/>} />
			<Route path="*" element={
					<main style={{ padding: "1rem" }}>
					<h1>Page does not exist!</h1>
					</main>
				}
			/>
		</Routes>
	</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
