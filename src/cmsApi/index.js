import config from './config';
import createTemplateAndSite from './templateAndSite';
import createStyle from './style';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;

// const createInterceptedFetch = (fetch, notOk, onErr) => {
//   return (request) => {
//     return fetch(request).then(response => {
//       console.log(response);
//     });
//   }
// };

// class apiObj {
//   constructor(options){
//     for (let option in options) {
//       if (options.hasOwnProperty(option)) {
//         this[option] = options[option];
//       }
//     }

//   }
// }

const apiObj = {
  templateAndSite: createTemplateAndSite(config.siteAPI),
  style: createStyle(config.siteAPI)
}

export default apiObj;
