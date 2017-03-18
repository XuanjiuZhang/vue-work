import config from './config';
import createTemplateAndSite from './templateAndSite';
import createStyle from './style';
import createOrder from './order';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;

const apiObj = {
  templateAndSite: createTemplateAndSite(config.siteAPI),
  style: createStyle(config.siteAPI),
  order: createOrder(config.siteAPI)
}

export default apiObj;
