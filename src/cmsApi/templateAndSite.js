'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  return {
    getSiteUser (paramsObj) {
      const url = siteAPI + '/site/getalluser';
      const paramsString = querystring.stringify(paramsObj);
      const searchParams = new URLSearchParams(paramsString);
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: searchParams
      });
    },
  }

}

export default createUrlRequest;
