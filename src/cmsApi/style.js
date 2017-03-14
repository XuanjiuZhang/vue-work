'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  const parseParamsObj = (paramsObj) => {
    const paramsString = querystring.stringify(paramsObj);
    return new URLSearchParams(paramsString);
  }
  return {
    getPlatFormStyleList: function (paramsObj) {
      const url = siteAPI + '/sitestyle/getstyleonplatform';
      const searchParams = parseParamsObj(paramsObj);
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: searchParams
      });
    },
    getPlatFormStyleCaseManageList: function (paramsObj) {
      const url = siteAPI + '/sitestyle/getcaseonplat';
      const searchParams = parseParamsObj(paramsObj);
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: searchParams
      });
    },
    getSiteUser (paramsObj) {
      const url = siteAPI + '/site/getalluser';
      const searchParams = parseParamsObj(paramsObj);
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
