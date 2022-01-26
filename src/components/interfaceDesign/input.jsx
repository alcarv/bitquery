import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './input.css'
import api, {query} from '../../services/tokenInfo'
//import * as Bitquery from '../TVChartContainer/Bitquery'
import * as Bitquery from "../TVChartContainer/Bitquery";

export default function BasicTextFields() {

    const [coin, setCoin] = useState();
    //export const filterResult;
    let teste = []
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
            const result = response.data.data.ethereum.transfers.map(data => {
                return {
                    address: data.currency.address,
                    symbol: data.currency.symbol,
                    name: data.currency.name

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
        console.log(symbols)
        let resultFilter = symbols.filter(filterSymbol => {
            return filterSymbol.symbol.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        });
        if(resultFilter.length > 1) {
            return "Nao achou"
        }
        console.log(resultFilter)
        console.log(resultFilter[0].address)
        //resolveSymbol.resolveSymbol(resultFilter.address)
        const filterResult = resultFilter[0].address;
        Bitquery.filtrotoken(filterResult)
        //console.log(resultFilter)
    };

  return (
    <Box 
    id="box"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" onKeyUp={onKeyUpValue.bind(this)} label="Token Name / Addres" variant="outlined" />
    </Box>
  );
}