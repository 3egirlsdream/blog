import { APP_CONFIG } from '../config.js';
import  axios from 'axios'

const fsCfg = {
  http: function (method, url, param = {}) {
    return new Promise((resolve, reject) => {
      const config = {
        url: APP_CONFIG.API_URL + url,
        data: param,
        method: method,
        timeout: 30000,
        headers: {
          authorization: '',
          "content-type": "application/json",
          "Access-Control-Allow-Origin":'*'
        }
      };
      let token = localStorage.getItem("__token__");
      if (token != null && token.length > 0) {
        config.headers.authorization = token
      }
      return axios(config).then((response) => {
        resolve(response.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  match(whatSay) {
    let maxs = /<[Hh]([1-6])[^>]*>.*?[^/]+/g;
    //let node = document.getElementsByTagName('h3');
    //whatSay = whatSay.replaceAll('>',">\n");
    var node = whatSay.match(maxs);
    let nodes = [];
    if(node == undefined) return;
    let min = 10000;
    for (let i = 0; i < node.length; i++) {
      let x = node[i];
      let index = parseInt(x[2]);
      let idx = x.indexOf('"');
      x = x.substring(idx + 1, x.length);
      idx = x.indexOf('"');

      if (idx > 0) {
        x = x.substring(0, idx);
      }

      min = Math.min(min, index);

      nodes.push({
        index: index,
        id: x,
      });
    }

    nodes.forEach((c) => {
      c.index -= min;
    });
    console.log(nodes)
  },
}

export default fsCfg
