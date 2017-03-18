'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  const parseParamsObj = (paramsObj) => {
    const paramsString = querystring.stringify(paramsObj);
    return new global.URLSearchParams(paramsString);
  };
  return {
    getSiteUser (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = siteAPI + 'site/getalluser?${searchParams}';
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

    getAllIndustry () {
      const url = siteAPI + 'site/getallindustry';
      return fetch(url, {
        method: 'GET',
        cache: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

    getAllPurpose () {
      const url = siteAPI + 'site/getallpurpose';
      return fetch(url, {
        method: 'GET',
        cache: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

    getPlatFormTemplateQuery (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}site/gettemplateonplat?${searchParams}`;
      return fetch(url, {
        credentials: 'include', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
    },

    getPlatFormSiteQuery (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}site/getsiteonplat?${searchParams}`;
      return fetch(url, {
        credentials: 'include', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

    },

    getAllCustomer (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}site/getallcustomeronplat?${searchParams}`;
      return fetch(url, {
        credentials: 'include', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
    },

  }

}

export default createUrlRequest;
