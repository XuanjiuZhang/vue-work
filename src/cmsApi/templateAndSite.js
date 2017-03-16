'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  const genSearchParams = (paramsObj) => {
    return URLSearchParams(querystring.stringify(paramsObj));
  };
  return {
    getSiteUser (paramsObj) {
      const url = siteAPI + 'site/getalluser';
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: genSearchParams(paramsObj)
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
  }

}

export default createUrlRequest;
