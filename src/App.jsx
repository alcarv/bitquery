import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import BasicTextFields from './components/interfaceDesign/input'
class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<h1 className='App-title'>
						TradingView Charting Library and Bitquery API Integration
					</h1>
				</header>
				<TVChartContainer />
				<BasicTextFields />
			</div>
		);
	}
}

export default App;