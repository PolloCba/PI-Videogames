//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const dot = require("dotenv");

dot.config();
axios.defaults.baseURL = "http://localhost:3001";

var local = "";

if (process.env.PORT == 3001) {
  local = "http://localhost:3001";
} else {
  local = "https://app-videogame-deploy.herokuapp.com/";
}

// Syncing all the models at once.
const port = process.env.PORT || 3001;
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
