/**
 * 配置项
 * 2016/8/18
 */
'use strict';

var appConfig = {};

// 生产环境
if(process.env.NODE_ENV === 'production'){
  appConfig = {
    debug: false,
    env: 'production',

    formAPI: '/cms/form/', // 表单功能接口
    productAPI: '/cms/product/', // 商品功能接口
    articleAPI: '/cms/article/', // 文章功能接口
    uploadAPI: '/cms/resource/upload', // 资源上传接口
    uEditorServerUrl: '/cms/resource/upload/editor', // 富文本编辑器接口

    siteAPI: '/website_manage/', // 网建系统接口
    pictureAPI: '/cms/picture/', // 图册功能接口

    verificationCode: 'http://cms.hnjing.com/form/image', //验证码生成地址
    formPostURL: '@serviceurl/cms/form/add-form-data', //表单提交地址

    previewUrl: 'http://192.168.51.22/cms/publish', //风格预览地址

    loginUrl: 'http://www.xmfshow.com/', // 登录地址，没有授权的，跳转到登录页

    templateMall: './cms/site/' // 选版平台

  };
}

// 本机开发环境
if(process.env.NODE_ENV === 'development'){
  appConfig = {
    debug: true,
    env: 'development',

    formAPI: '/cms/form/', // 表单功能接口
    productAPI: '/cms/product/', // 商品功能接口
    articleAPI: '/cms/article/', // 文章功能接口
    uploadAPI: '/cms/resource/v1/upload', // 资源上传接口
    uEditorServerUrl: '/cms/resource/v1/upload/editor', // 富文本编辑器接口

    siteAPI: '/cms/site/', // 网建系统接口
    templateFileAPI: '/cms/site/',
    pictureAPI: '/cms/picture/', // 图册功能接口

    /*verificationCode: 'http://cms.hnjing.com/form/image', //验证码生成地址*/
    verificationCode: '/cms/form/validate-code', //验证码生成地址

    /*formPostURL: 'http://cms.hnjing.com/form/post', //表单提交地址*/
    formPostURL: '/cms/form/add-form-data', //表单提交地址

    previewUrl: '/cms/publish', //风格预览地址

    loginUrl: 'http://www.xmfshow.com/', // 登录地址，没有授权的，跳转到登录页

    publish: '/publish/', // 网站.模板发布地址
    publishRealAPI: '/cms/publish/',

    designTemplateSite: function (styleId, siteId) {
      return `./website.html#/${siteId}/style/${styleId}/column`;
    },

    manageTemplateSite: function (siteId) {
      return `./website.html#/${siteId}/info/detail`;
    },

    selectFromTemplateMall: function (templateId) {
      return `./templateMall.html#/${templateId}`;
    },

    templateMall: '/cms/site/' // 选版平台

  };
}

// 测试环境
if(process.env.NODE_ENV === 'staging'){
  appConfig = {
    debug: false,
    env: 'staging',

    formAPI: '/cms/form/', // 表单功能接口
    productAPI: '/cms/product/', // 商品功能接口
    articleAPI: '/cms/article/', // 文章功能接口
    uploadAPI: '/cms/resource/v1/upload', // 资源上传接口
    uEditorServerUrl: '/cms/resource/v1/upload/editor', // 富文本编辑器接口

    siteAPI: '/cms/site/', // 网建系统接口
    templateFileAPI: '/cms/site/',
    pictureAPI: '/cms/picture/', // 图册功能接口

    /*verificationCode: 'http://cms.hnjing.com/form/image', //验证码生成地址*/
    verificationCode: '/cms/form/validate-code', //验证码生成地址

    /*formPostURL: 'http://cms.hnjing.com/form/post', //表单提交地址*/
    formPostURL: '/cms/form/add-form-data', //表单提交地址

    previewUrl: '/cms/publish', //风格预览地址

    loginUrl: 'http://www.xmfshow.com/', // 登录地址，没有授权的，跳转到登录页

    publish: '/publish/', // 网站.模板发布地址
    publishRealAPI: '/cms/publish/',

    designTemplateSite: function (styleId, siteId) {
      return `./website.html#/${siteId}/style/${styleId}/column`;
    },

    manageTemplateSite: function (siteId) {
      return `./website.html#/${siteId}/info/detail`;
    },

    selectFromTemplateMall: function (templateId) {
      return `./templateMall.html#/${templateId}`;
    },

    templateMall: '/cms/site/' // 选版平台
  };
}

export default appConfig;
