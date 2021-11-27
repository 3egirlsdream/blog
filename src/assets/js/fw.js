'use strict'
import './framework'
import axios from 'axios'
const fsCfg = {
    serverAddr: function () {
         if (window.location.hostname === 'localhost')
            return 'https://localhost:44389'
          else if (window.location.protocol === 'http:') {
             return 'http://42.194.131.197:4396'
          }
         return ''
    },

  http: function (method, url, param = {}) {
    return new Promise((resolve, reject) => {
      const config = {
        url: this.serverAddr() + url,
        data: param,
        method: method,
        //baseURL: this.serverAddr(),
        timeout: 30000,
        headers: {
          authorization:''
        }
      };
      let token = framework.getStorage("__token__");
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

    getDataWithoutCheck: function (url, callback) {
        console.log('GET URL:' + url)
        axios.get(url)
          .then(function (response) {
            if (response != null) {
                setTimeout(
                    function (clbk, msg) {
                        clbk(msg)
                    },
                    100,
                    callback,
                    response.data,
                )
            }
        })
          // 请求失败
          .catch(error => {
            console.log(error);
            alert("网络错误")
          });
      },
    getData: function (url, callback) {
        console.log('GET URL:' + this.serverAddr() + url)
        let user = 'cxk'//framework.getStorage('user');
        let pwd = '123455'//framework.getStorage('pwd')
        let u = framework.strFormat('/api/User/Login?user={0}&pwd={1}', user, pwd);
        axios.get(this.serverAddr() + u)
            .then(() => {
                axios.get(this.serverAddr() + url)
                    .then(response => {
                        if (response != null) {
                            setTimeout(
                                function (clbk, msg) {
                                    clbk(msg)
                                },
                                100,
                                callback,
                                response.data
                            )
                        }
                    })
                    // 请求失败
                    .catch(error => {
                        console.log(error);
                        alert("网络错误")
                    });
            })
            // 请求失败
            .catch(error => {
                alert(error);
                // const index = location.href.lastIndexOf("/pages");
                // const urlBase = location.href.substring(0, index);
                // window.location.href = urlBase + "/pages/SYSTEM/Login.html";
            });

    },

    postData: function (url, data, callback) {
        axios.post(this.serverAddr() + url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                if (response != null) {
                    setTimeout(
                        function (clbk, msg) {
                            clbk(msg)
                        },
                        100,
                        callback,
                        response.data
                    )
                }
            })
            .catch(function (error) {
                alert(error);
            });
    },

    uploadImage: function (filepath, data, callback) {
        var url = "https://gitee.com/api/v5/repos/eeegirlsdream/picture/contents/" + filepath;
        axios.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response != null) {
                setTimeout(function (clbk, msg) {
                    clbk(msg),
                        100,
                        callback,
                        response.data
                })
            }
        }).catch(function (error) {
            alert(error);
        });
    },

    isLogin: function () {

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
