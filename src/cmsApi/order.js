'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  const parseParamsObj = (paramsObj) => {
    const paramsString = querystring.stringify(paramsObj);
    return new global.URLSearchParams(paramsString);
  };
  return {
    getSiteTicketList: function (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}siteticket?${searchParams}`;
      return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },

  }

}

export default createUrlRequest;
