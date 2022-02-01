import axios from "axios";

const api = axios.create({
  //baseURL: "/api",
});

var today = new Date();
var dd = String(today.getDate() - 1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
export const query = `query BRTv2 {
  ethereum(network: bsc) {
    dexTrades(
      exchangeAddress: {is: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73"}
      date: {since: "${today}", till:"${today}"}
      options: {desc: "tradeAmount", limit: 10000}
      baseCurrency: {notIn: [
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" # WBNB
            ,"0xe9e7cea3dedca5984780bafc599bd69add087d56" # BUSD
            ,"0x55d398326f99059ff775485246999027b3197955" # USDT
            ,"0x23396cf899ca06c4472205fc903bdb4de249d6fc" # UST
            ,"0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d" # USDC
            ]}
    ) {
      baseCurrency {
        address
        symbol
      }
      tradeAmount(in: USD)
    }
  }
}`

export default api;