'use strict';
import querystring from 'query-string';

const createUrlRequest = (siteAPI) => {
  const parseParamsObj = (paramsObj) => {
    const paramsString = querystring.stringify(paramsObj);
    return new global.URLSearchParams(paramsString);
  }
  return {
    getAllColor () {
      const url = siteAPI + '/sitestyle/color';
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

    getPlatFormStyleList: function (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}/sitestyle/getstyleonplatform?${searchParams}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': 'w89rVk52gN1Lx6aBCmS9Qu0p10F75F5M'
        },
        // body: searchParams
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
