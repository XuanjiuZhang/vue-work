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

    getPlatFormStyleList (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}/sitestyle/getstyleonplatform?${searchParams}`;
      return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    getPlatFormStyleCaseManageList (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}/sitestyle/getcaseonplat?${searchParams}`;
      return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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

    auditSiteStylePlatform (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}/auditsitestyleplatform?${searchParams}`;
      return fetch(url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },

    platformUpDownShelves (paramsObj) {
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}/plat_on_off_sitestyle?status=${paramsObj.status}`;
      return fetch(url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

    getSingleStyle (paramsObj) {
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}`;
      return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    },

    cancelStyleSecondAudit (paramsObj) {
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}/giveup_audit_style_second`;
      return fetch(url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    },

    cancelCaseAudit (paramsObj) {
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}/giveup_auditcasestyle`;
      return fetch(url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    },
    
    doAuditCasePlatform (paramsObj) {
      const searchParams = parseParamsObj(paramsObj);
      const url = `${siteAPI}/sitestyle/${paramsObj.styleid}/auditcasestyle?${searchParams}`;
      return fetch(url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },

  }

}

export default createUrlRequest;
