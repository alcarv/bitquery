import axios from "axios";

const api = axios.create({
  //baseURL: "/api",
});

export const query = `{
    ethereum(network: bsc) {
      transfers(options: {desc: "count", limit: 10000}) {
        currency {
          name
          symbol
          address
        }
        count
      }
    }
  }`

  

export default api;