import axios from 'axios'; 
import * as Bitquery from './Bitquery';
import {	
    makeApiRequest,
	generateSymbol,
	parseFullSymbol,}  from './helpers'
//const lastBarsCache = new Map(); 
const configurationData = {
    supported_resolutions: ['1','5','15','30', '60','1D', '1W', '1M'],
        exchanges: [{
            value: 'Bitfinex',
            name: 'Bitfinex',
            desc: 'Bitfinex',
        },
        {
            // `exchange` argument for the `searchSymbols` method, if a user selects this exchange
            value: 'Kraken',
    
            // filter name
            name: 'Kraken',
    
            // full exchange name displayed in the filter popup
            desc: 'Kraken bitcoin exchange',
        },
        ],
        symbols_types: [{
            name: 'crypto',
    
            // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
            value: 'crypto',
        },
            // ...
        ],
}; 
const lastBarsCache = new Map();
async function getAllSymbols() {
	const data = await makeApiRequest('data/v3/all/exchanges');
	let allSymbols = [];

	for (const exchange of configurationData.exchanges) {
		const pairs = data.Data[exchange.value].pairs;

		for (const leftPairPart of Object.keys(pairs)) {
			const symbols = pairs[leftPairPart].map(rightPairPart => {
				const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
				return {
					symbol: symbol.short,
					full_name: symbol.full,
					description: symbol.short,
					exchange: exchange.value,
					type: 'crypto',
				};
			});
			allSymbols = [...allSymbols, ...symbols];
		}
	}
	return allSymbols;
}
export default {
    // This method is used by the Charting Library to get a configuration of your datafeed 
    // (e.g. supported resolutions, exchanges and so on)
    onReady: (callback) => {
        console.log('[onReady]: Method called!!');
        setTimeout(() => callback(configurationData));
    },
    searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

    // This method is used by the library to retrieve information about a specific symbol 
    // (exchange, price scale, full symbol etc.).
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) =>{
        //console.log('[resolveSymbol]: Method called!!'); 
        //const response = await axios.post(
        //    Bitquery.endpoint, {
        //        headers: {
        //            "Content-Type": "application/json",
        //            "X-API-KEY": "BQY83wwAzmLPC7QOMFQAW95IRaEc9QDX"
        //        },
        //        query: Bitquery.GET_COIN_INFO,
        //        variables: {
        //            "tokenAddress": symbolName
        //        },
        //        mode: 'cors'
        //    }
        //); 
        //// const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
        // console.log(response.data.data.ethereum.dexTrades[0].quotePrice); 
        //console.log(response.data.data.ethereum.dexTrades[0].baseCurrency); 
//
        //const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
        //if(!coin){
        //    onResolveErrorCallback(); 
        //}else{
        //    const symbol = {
        //        ticker: symbolName,
        //        name: `${coin.symbol}/USD`,
        //        session: '24x7',
        //        timezone: 'Etc/UTC',
        //        minmov: 1,
        //        pricescale: 10000000,
        //        has_intraday: true,
        //        intraday_multipliers: ['1', '5', '15', '30', '60'],
        //        has_empty_bars: true,
        //        has_weekly_and_monthly: false,
        //        supported_resolutions: configurationData.supported_resolutions, 
        //        volume_precision: 1,
        //        data_status: 'streaming',
        //    }
        //    //onSymbolResolvedCallback(symbol);
        //    onSymbolResolvedCallback(symbol) 
        //}
        console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await getAllSymbols();
        console.log(symbols)
		const symbolItem = symbols.find(({
			full_name,
		}) => full_name === "Bitfinex:ETH/USD");
        console.log(symbolName)
		if (!symbolItem) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		const symbolInfo = {
			ticker: symbolItem.full_name,
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 100,
            intraday_multipliers: ['1', '5', '15', '30', '60'],
			has_intraday: true,
			has_no_volume: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 1,
			data_status: 'streaming',
		};

		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
    }, 
    // This method is used by the charting library to get historical data for the symbol. 
    getBars: async(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) =>{
        const { from, to, firstDataRequest } = periodParams;
        const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
        console.log(resolution)
        try{

            const response2 = await axios.post(Bitquery.endpoint, {
                query: Bitquery.GET_COIN_BARS,
                variables: {
                    "from": new Date("2022-01-01T00:23:21.000Z").toISOString(),
                    "to": new Date("2022-02-23T15:23:21.000Z").toISOString(),
                    "interval": Number(resolution),
                    "tokenAddress": symbolInfo.ticker
                },
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "BQY83wwAzmLPC7QOMFQAW95IRaEc9QDX"
                }
            })
            console.log(response2)
            if (response2.Response && response2.Response === 'Error' || response2.data.length === 0) {
				// "noData" should be set if there is no data in the requested period.
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
            const bars = response2.data.data.ethereum.dexTrades.map(el => ({
                time: new Date(el.timeInterval.minute).getTime(), // date string in api response
                low: el.low,
                high: el.high,
                open: Number(el.open),
                close: Number(el.close),
                volume: el.volume
            }))
            console.log(response2.data.data.ethereum.dexTrades[0].high);
            if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			}
			console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: false,
			});
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}

    },
	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
        console.log(symbolInfo)
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
	},
};