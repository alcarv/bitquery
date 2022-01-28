import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {TVChartContainer} from './components/TVChartContainer/index'

ReactDOM.render(
	<BrowserRouter>
	<Routes>
	<Route path="/" exact={true} element={<App/>} />
	<Route path="/trading/:id" element={<TVChartContainer />}/>
	</Routes>
	</BrowserRouter>,
	document.getElementById('App')
);