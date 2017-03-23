import config from './config';
import createTemplateAndSite from './templateAndSite';
import createStyle from './style';
import createOrder from './order';
import createLog from './log';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;

const apiObj = {
  templateAndSite: createTemplateAndSite(config.siteAPI),
  style: createStyle(config.siteAPI),
  order: createOrder(config.siteAPI),
  log: createLog(config.siteAPI),
}

export default apiObj;
