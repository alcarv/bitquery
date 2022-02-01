import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './input.css'
import api, {query} from '../../services/tokenInfo'
//import * as Bitquery from '../TVChartContainer/Bitquery'
import * as Bitquery from "../TVChartContainer/Bitquery";
import { useNavigate } from "react-router-dom";


  
const BasicTextFields = () => {
    const navigate = useNavigate();
    //const [coin, setCoin] = useState();
    //export const filterResult;
    let teste = []
    let resultadoFiltro;
    useEffect(() =>  {
        api
        .post(
            "/api", {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "BQY83wwAzmLPC7QOMFQAW95IRaEc9QDX"
                },
                query: query,
                mode: 'cors'
            }
        ).then((response) => {
            const result = response.data.data.ethereum.dexTrades.map(data => {
                return {
                    address: data.baseCurrency.address,
                    symbol: data.baseCurrency.symbol,
                    name: data.baseCurrency.name

                }
            })
            //console.log(result)
            teste = [...teste, ...result];
            //console.log(teste)
            //setCoin(response.data)
        })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      })

    function onKeyUpValue(event) {
        console.log(event.target.value)
        const symbols = teste;
        //console.log(symbols)
        let resultFilter = symbols.filter(filterSymbol => {
            //console.log(filterSymbol)
            return filterSymbol.address.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        });
        console.log(resultFilter)
        if(resultFilter.length == 1){
        console.log(resultFilter)
        console.log(resultFilter[0].address)
        //resolveSymbol.resolveSymbol(resultFilter.address)
        const filterResult = resultFilter[0].address;
        //Bitquery.filtrotoken(filterResult)
        resultadoFiltro = filterResult;
        //console.log(resultFilter)
        }
    };

  return (
    <Box 
    id="box"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      onSubmit={() => navigate(`/trading/${resultadoFiltro}`)}
      noValidate
      autoComplete="on"
    >
      <TextField id="outlined-basic" onKeyUp={onKeyUpValue.bind(this)} label="Token Address" variant="outlined" />
    </Box>
  );
}
export default BasicTextFields;