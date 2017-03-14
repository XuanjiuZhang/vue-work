/**
 *
 * 2016/8/18
 */
'use strict';
/*eslint-disable */
require('./demo.less');

require.ensure(['../app.components/index.js'], function (require) {
  require('jquery');
  require('angular');
  require('angular-animate');
  require('ui-select');
  require('babel-polyfill');

  require('config')();

  require('../app.components/index.js')();

  var angular = window.angular;

  var app = angular.module('app.demo', ['app.components', 'ui.select']);

  app.filter('propsFilter', function () {
    return function (items, props) {
      var out = [];

      var keys;
      if (angular.isArray(items)) {
        keys = Object.keys(props);

        items.forEach(function (item) {
          var itemMatches = false;
          var i, prop, text;
          for (i = 0; i < keys.length; i++) {
            prop = keys[i];
            text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  });

  app.controller('selectDemo', ['$scope', '$http', '$timeout', '$interval', function ($scope, $http, $timeout, $interval) {
    var vm = this;

    vm.title = {
      name: 'UI Select示例'
    };

    vm.disabled = undefined;
    vm.searchEnabled = undefined;

    vm.setInputFocus = function () {
      $scope.$broadcast('UiSelectDemo1');
    };

    vm.enable = function () {
      vm.disabled = false;
    };

    vm.disable = function () {
      vm.disabled = true;
    };

    vm.enableSearch = function () {
      vm.searchEnabled = true;
    };

    vm.disableSearch = function () {
      vm.searchEnabled = false;
    };

    vm.clear = function () {
      vm.person.selected = undefined;
      vm.address.selected = undefined;
      vm.country.selected = undefined;
    };

    vm.someGroupFn = function (item) {
      var r;
      if (item.name[0] >= 'A' && item.name[0] <= 'M') {
        r = 'From A - M';
      }

      if (item.name[0] >= 'N' && item.name[0] <= 'Z') {
        r = 'From N - Z';
      }

      return r;
    };

    vm.firstLetterGroupFn = function (item) {
      return item.name[0];
    };

    vm.reverseOrderFilterFn = function (groups) {
      return groups.reverse();
    };

    vm.personAsync = {selected: 'wladimir@email.com'};
    vm.peopleAsync = [];

    $timeout(function () {
      vm.peopleAsync = [
        {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
        {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
        {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
        {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
        {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
        {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
        {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
        {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
        {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
        {name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia'}
      ];
    }, 3000);

    vm.counter = 0;
    vm.onSelectCallback = function (item, model) {
      vm.counter++;
      vm.eventResult = {item: item, model: model};
    };

    vm.removed = function (item, model) {
      vm.lastRemoved = {
        item: item,
        model: model
      };
    };

    vm.tagTransform = function (newTag) {
      var item = {
        name: newTag,
        email: newTag.toLowerCase() + '@email.com',
        age: 'unknown',
        country: 'unknown'
      };

      return item;
    };

    vm.peopleObj = {
      '1': {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
      '2': {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
      '3': {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
      '4': {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
      '5': {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
      '6': {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
      '7': {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
      '8': {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
      '9': {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
      '10': {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
    };

    vm.person = {};

    vm.person.selectedValue = vm.peopleObj[3];
    vm.person.selectedSingle = 'Samantha';
    vm.person.selectedSingleKey = '5';
    // To run the demos with a preselected person object, uncomment the line below.
    //vm.person.selected = vm.person.selectedValue;

    vm.people = [
      {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
      {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
      {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
      {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
      {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
      {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
      {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
      {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
      {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
      {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
    ];

    vm.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

    vm.singleDemo = {};
    vm.singleDemo.color = '';
    vm.multipleDemo = {};
    vm.multipleDemo.colors = ['Blue', 'Red'];
    vm.multipleDemo.colors2 = ['Blue', 'Red'];
    vm.multipleDemo.selectedPeople = [vm.people[5], vm.people[4]];
    vm.multipleDemo.selectedPeople2 = vm.multipleDemo.selectedPeople;
    vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[8], vm.people[6]];
    vm.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];
    vm.multipleDemo.removeSelectIsFalse = [vm.people[2], vm.people[0]];

    vm.appendToBodyDemo = {
      remainingToggleTime: 0,
      present: true,
      startToggleTimer: function () {
        var scope = vm.appendToBodyDemo;
        var promise = $interval(function () {
          if (scope.remainingTime < 1000) {
            $interval.cancel(promise);
            scope.present = !scope.present;
            scope.remainingTime = 0;
          } else {
            scope.remainingTime -= 1000;
          }
        }, 1000);
        scope.remainingTime = 3000;
      }
    };

    vm.address = {};
    vm.refreshAddresses = function (address) {
      var params = {address: address, sensor: false};
      return $http.get(
        'http://maps.googleapis.com/maps/api/geocode/json',
        {params: params}
      ).then(function (response) {
        vm.addresses = response.data.results;
      });
    };

    vm.addPerson = function (item) {
      if (item.hasOwnProperty('isTag')) {
        delete item.isTag;
        vm.people.push(item);
      }
    };

    vm.country = {};
    vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
      {name: 'Afghanistan', code: 'AF'},
      {name: 'Åland Islands', code: 'AX'},
      {name: 'Albania', code: 'AL'},
      {name: 'Algeria', code: 'DZ'},
      {name: 'American Samoa', code: 'AS'},
      {name: 'Andorra', code: 'AD'},
      {name: 'Angola', code: 'AO'},
      {name: 'Anguilla', code: 'AI'},
      {name: 'Antarctica', code: 'AQ'},
      {name: 'Antigua and Barbuda', code: 'AG'},
      {name: 'Argentina', code: 'AR'},
      {name: 'Armenia', code: 'AM'},
      {name: 'Aruba', code: 'AW'},
      {name: 'Australia', code: 'AU'},
      {name: 'Austria', code: 'AT'},
      {name: 'Azerbaijan', code: 'AZ'},
      {name: 'Bahamas', code: 'BS'},
      {name: 'Bahrain', code: 'BH'},
      {name: 'Bangladesh', code: 'BD'},
      {name: 'Barbados', code: 'BB'},
      {name: 'Belarus', code: 'BY'},
      {name: 'Belgium', code: 'BE'},
      {name: 'Belize', code: 'BZ'},
      {name: 'Benin', code: 'BJ'},
      {name: 'Bermuda', code: 'BM'},
      {name: 'Bhutan', code: 'BT'},
      {name: 'Bolivia', code: 'BO'},
      {name: 'Bosnia and Herzegovina', code: 'BA'},
      {name: 'Botswana', code: 'BW'},
      {name: 'Bouvet Island', code: 'BV'},
      {name: 'Brazil', code: 'BR'},
      {name: 'British Indian Ocean Territory', code: 'IO'},
      {name: 'Brunei Darussalam', code: 'BN'},
      {name: 'Bulgaria', code: 'BG'},
      {name: 'Burkina Faso', code: 'BF'},
      {name: 'Burundi', code: 'BI'},
      {name: 'Cambodia', code: 'KH'},
      {name: 'Cameroon', code: 'CM'},
      {name: 'Canada', code: 'CA'},
      {name: 'Cape Verde', code: 'CV'},
      {name: 'Cayman Islands', code: 'KY'},
      {name: 'Central African Republic', code: 'CF'},
      {name: 'Chad', code: 'TD'},
      {name: 'Chile', code: 'CL'},
      {name: 'China', code: 'CN'},
      {name: 'Christmas Island', code: 'CX'},
      {name: 'Cocos (Keeling) Islands', code: 'CC'},
      {name: 'Colombia', code: 'CO'},
      {name: 'Comoros', code: 'KM'},
      {name: 'Congo', code: 'CG'},
      {name: 'Congo, The Democratic Republic of the', code: 'CD'},
      {name: 'Cook Islands', code: 'CK'},
      {name: 'Costa Rica', code: 'CR'},
      {name: 'Cote D\'Ivoire', code: 'CI'},
      {name: 'Croatia', code: 'HR'},
      {name: 'Cuba', code: 'CU'},
      {name: 'Cyprus', code: 'CY'},
      {name: 'Czech Republic', code: 'CZ'},
      {name: 'Denmark', code: 'DK'},
      {name: 'Djibouti', code: 'DJ'},
      {name: 'Dominica', code: 'DM'},
      {name: 'Dominican Republic', code: 'DO'},
      {name: 'Ecuador', code: 'EC'},
      {name: 'Egypt', code: 'EG'},
      {name: 'El Salvador', code: 'SV'},
      {name: 'Equatorial Guinea', code: 'GQ'},
      {name: 'Eritrea', code: 'ER'},
      {name: 'Estonia', code: 'EE'},
      {name: 'Ethiopia', code: 'ET'},
      {name: 'Falkland Islands (Malvinas)', code: 'FK'},
      {name: 'Faroe Islands', code: 'FO'},
      {name: 'Fiji', code: 'FJ'},
      {name: 'Finland', code: 'FI'},
      {name: 'France', code: 'FR'},
      {name: 'French Guiana', code: 'GF'},
      {name: 'French Polynesia', code: 'PF'},
      {name: 'French Southern Territories', code: 'TF'},
      {name: 'Gabon', code: 'GA'},
      {name: 'Gambia', code: 'GM'},
      {name: 'Georgia', code: 'GE'},
      {name: 'Germany', code: 'DE'},
      {name: 'Ghana', code: 'GH'},
      {name: 'Gibraltar', code: 'GI'},
      {name: 'Greece', code: 'GR'},
      {name: 'Greenland', code: 'GL'},
      {name: 'Grenada', code: 'GD'},
      {name: 'Guadeloupe', code: 'GP'},
      {name: 'Guam', code: 'GU'},
      {name: 'Guatemala', code: 'GT'},
      {name: 'Guernsey', code: 'GG'},
      {name: 'Guinea', code: 'GN'},
      {name: 'Guinea-Bissau', code: 'GW'},
      {name: 'Guyana', code: 'GY'},
      {name: 'Haiti', code: 'HT'},
      {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
      {name: 'Holy See (Vatican City State)', code: 'VA'},
      {name: 'Honduras', code: 'HN'},
      {name: 'Hong Kong', code: 'HK'},
      {name: 'Hungary', code: 'HU'},
      {name: 'Iceland', code: 'IS'},
      {name: 'India', code: 'IN'},
      {name: 'Indonesia', code: 'ID'},
      {name: 'Iran, Islamic Republic Of', code: 'IR'},
      {name: 'Iraq', code: 'IQ'},
      {name: 'Ireland', code: 'IE'},
      {name: 'Isle of Man', code: 'IM'},
      {name: 'Israel', code: 'IL'},
      {name: 'Italy', code: 'IT'},
      {name: 'Jamaica', code: 'JM'},
      {name: 'Japan', code: 'JP'},
      {name: 'Jersey', code: 'JE'},
      {name: 'Jordan', code: 'JO'},
      {name: 'Kazakhstan', code: 'KZ'},
      {name: 'Kenya', code: 'KE'},
      {name: 'Kiribati', code: 'KI'},
      {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
      {name: 'Korea, Republic of', code: 'KR'},
      {name: 'Kuwait', code: 'KW'},
      {name: 'Kyrgyzstan', code: 'KG'},
      {name: 'Lao People\'s Democratic Republic', code: 'LA'},
      {name: 'Latvia', code: 'LV'},
      {name: 'Lebanon', code: 'LB'},
      {name: 'Lesotho', code: 'LS'},
      {name: 'Liberia', code: 'LR'},
      {name: 'Libyan Arab Jamahiriya', code: 'LY'},
      {name: 'Liechtenstein', code: 'LI'},
      {name: 'Lithuania', code: 'LT'},
      {name: 'Luxembourg', code: 'LU'},
      {name: 'Macao', code: 'MO'},
      {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
      {name: 'Madagascar', code: 'MG'},
      {name: 'Malawi', code: 'MW'},
      {name: 'Malaysia', code: 'MY'},
      {name: 'Maldives', code: 'MV'},
      {name: 'Mali', code: 'ML'},
      {name: 'Malta', code: 'MT'},
      {name: 'Marshall Islands', code: 'MH'},
      {name: 'Martinique', code: 'MQ'},
      {name: 'Mauritania', code: 'MR'},
      {name: 'Mauritius', code: 'MU'},
      {name: 'Mayotte', code: 'YT'},
      {name: 'Mexico', code: 'MX'},
      {name: 'Micronesia, Federated States of', code: 'FM'},
      {name: 'Moldova, Republic of', code: 'MD'},
      {name: 'Monaco', code: 'MC'},
      {name: 'Mongolia', code: 'MN'},
      {name: 'Montserrat', code: 'MS'},
      {name: 'Morocco', code: 'MA'},
      {name: 'Mozambique', code: 'MZ'},
      {name: 'Myanmar', code: 'MM'},
      {name: 'Namibia', code: 'NA'},
      {name: 'Nauru', code: 'NR'},
      {name: 'Nepal', code: 'NP'},
      {name: 'Netherlands', code: 'NL'},
      {name: 'Netherlands Antilles', code: 'AN'},
      {name: 'New Caledonia', code: 'NC'},
      {name: 'New Zealand', code: 'NZ'},
      {name: 'Nicaragua', code: 'NI'},
      {name: 'Niger', code: 'NE'},
      {name: 'Nigeria', code: 'NG'},
      {name: 'Niue', code: 'NU'},
      {name: 'Norfolk Island', code: 'NF'},
      {name: 'Northern Mariana Islands', code: 'MP'},
      {name: 'Norway', code: 'NO'},
      {name: 'Oman', code: 'OM'},
      {name: 'Pakistan', code: 'PK'},
      {name: 'Palau', code: 'PW'},
      {name: 'Palestinian Territory, Occupied', code: 'PS'},
      {name: 'Panama', code: 'PA'},
      {name: 'Papua New Guinea', code: 'PG'},
      {name: 'Paraguay', code: 'PY'},
      {name: 'Peru', code: 'PE'},
      {name: 'Philippines', code: 'PH'},
      {name: 'Pitcairn', code: 'PN'},
      {name: 'Poland', code: 'PL'},
      {name: 'Portugal', code: 'PT'},
      {name: 'Puerto Rico', code: 'PR'},
      {name: 'Qatar', code: 'QA'},
      {name: 'Reunion', code: 'RE'},
      {name: 'Romania', code: 'RO'},
      {name: 'Russian Federation', code: 'RU'},
      {name: 'Rwanda', code: 'RW'},
      {name: 'Saint Helena', code: 'SH'},
      {name: 'Saint Kitts and Nevis', code: 'KN'},
      {name: 'Saint Lucia', code: 'LC'},
      {name: 'Saint Pierre and Miquelon', code: 'PM'},
      {name: 'Saint Vincent and the Grenadines', code: 'VC'},
      {name: 'Samoa', code: 'WS'},
      {name: 'San Marino', code: 'SM'},
      {name: 'Sao Tome and Principe', code: 'ST'},
      {name: 'Saudi Arabia', code: 'SA'},
      {name: 'Senegal', code: 'SN'},
      {name: 'Serbia and Montenegro', code: 'CS'},
      {name: 'Seychelles', code: 'SC'},
      {name: 'Sierra Leone', code: 'SL'},
      {name: 'Singapore', code: 'SG'},
      {name: 'Slovakia', code: 'SK'},
      {name: 'Slovenia', code: 'SI'},
      {name: 'Solomon Islands', code: 'SB'},
      {name: 'Somalia', code: 'SO'},
      {name: 'South Africa', code: 'ZA'},
      {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
      {name: 'Spain', code: 'ES'},
      {name: 'Sri Lanka', code: 'LK'},
      {name: 'Sudan', code: 'SD'},
      {name: 'Suriname', code: 'SR'},
      {name: 'Svalbard and Jan Mayen', code: 'SJ'},
      {name: 'Swaziland', code: 'SZ'},
      {name: 'Sweden', code: 'SE'},
      {name: 'Switzerland', code: 'CH'},
      {name: 'Syrian Arab Republic', code: 'SY'},
      {name: 'Taiwan, Province of China', code: 'TW'},
      {name: 'Tajikistan', code: 'TJ'},
      {name: 'Tanzania, United Republic of', code: 'TZ'},
      {name: 'Thailand', code: 'TH'},
      {name: 'Timor-Leste', code: 'TL'},
      {name: 'Togo', code: 'TG'},
      {name: 'Tokelau', code: 'TK'},
      {name: 'Tonga', code: 'TO'},
      {name: 'Trinidad and Tobago', code: 'TT'},
      {name: 'Tunisia', code: 'TN'},
      {name: 'Turkey', code: 'TR'},
      {name: 'Turkmenistan', code: 'TM'},
      {name: 'Turks and Caicos Islands', code: 'TC'},
      {name: 'Tuvalu', code: 'TV'},
      {name: 'Uganda', code: 'UG'},
      {name: 'Ukraine', code: 'UA'},
      {name: 'United Arab Emirates', code: 'AE'},
      {name: 'United Kingdom', code: 'GB'},
      {name: 'United States', code: 'US'},
      {name: 'United States Minor Outlying Islands', code: 'UM'},
      {name: 'Uruguay', code: 'UY'},
      {name: 'Uzbekistan', code: 'UZ'},
      {name: 'Vanuatu', code: 'VU'},
      {name: 'Venezuela', code: 'VE'},
      {name: 'Vietnam', code: 'VN'},
      {name: 'Virgin Islands, British', code: 'VG'},
      {name: 'Virgin Islands, U.S.', code: 'VI'},
      {name: 'Wallis and Futuna', code: 'WF'},
      {name: 'Western Sahara', code: 'EH'},
      {name: 'Yemen', code: 'YE'},
      {name: 'Zambia', code: 'ZM'},
      {name: 'Zimbabwe', code: 'ZW'}
    ];
  }]);

  app.controller('iCheckDemo', ['$scope', function ($scope) {
    $scope.icheck = {
      demo1: true,
      disabled: false
    };
    $scope.iradio = {
      demo2: true,
      disabled: false
    };
    $scope.iradiogroup = {
      demo3: 6,
      items: [
        {text: 'item1', name: 'name1', value: 1},
        {text: 'item2', name: 'name2', value: 2},
        {text: 'item3', name: 'name3', value: 3},
        {text: 'item4', name: 'name4', value: 4},
        {text: 'item5', name: 'name5', value: 5},
        {text: 'item6', name: 'name6', value: 6}
      ]
    };
  }]);

  app.controller('iTableDemo', ['$scope', function ($scope) {
    $scope.data = [
      {
        f1: 'No8888',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824',
        __box: true
      },
      {
        f1: 'No6666',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'No4444',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'No7777',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'testVal443',
        f2: 'testVal466',
        f3: 'testVal123',
        f4: 'testVal66',
        f5: 'testVal33',
        f6: 'testVal456',
        f7: 'testVal49',
        f8: 'testVal15689',
        f9: 'testVal032'
      }
    ];

    $scope.option = {
      columnDefs: [
        {
          info: '产品编号', field: 'f1', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '产品名称', field: 'f2', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '行业类型', field: 'f3', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '版本号', field: 'f4', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '产品状态', field: 'f5', style: {width: ''}, varyData: function (itemData) {
          if (itemData === 'online') {
            return '上架';
          }

          return '<span style="color: red;">下架</span>';
        }
        },
        {info: '创建用户', field: 'f6', style: {width: ''}},
        {info: '创建时间', field: 'f7', style: {width: ''}},
        {info: '审核用户', field: 'f8', style: {width: ''}},
        {info: '审核时间', field: 'f9', style: {width: ''}}
      ],
      tableStyle: {
        border: '1px solid #f4f4f4'
      },
      tableClass: 'i-table',
      //这里配置操作项
      operation: {
        disable: false,
        items: [
          {title: '编辑', name: 'edit'},
          {title: '删除', name: 'del'},
          {
            title: function (rowData) {
              return rowData.f9 === '20160824' ? '启用' : '禁用';
            }, name: 'enable'
          }
        ]
      }
    };

    // 这里是处理操作项点击后，要处理的事情.
    $scope.iTableAction = function (name, data) {
      if (name === 'enable') {
        data.f9 = data.f9 === '20160824' ? 'asdf' : '20160824';

      }
      console.log(name, data);
    };

    $scope.option2 = {
      columnDefs: [
        {
          info: '产品编号', field: 'f1', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '产品名称', field: 'f2', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '行业类型', field: 'f3', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '版本号', field: 'f4', enableSorting: true, class: ['sorting'], style: {
          width: ''
        }
        },
        {
          info: '产品状态', field: 'f5', style: {
          width: ''
        }
        },
        {
          info: '创建用户', field: 'f6', style: {
          width: ''
        }
        },
        {
          info: '创建时间', field: 'f7', style: {
          width: ''
        }
        },
        {
          info: '审核用户', field: 'f8', style: {
          width: ''
        }
        },
        {
          info: '审核时间', field: 'f9', style: {
          width: ''
        }
        }
      ],

      tableStyle: {
        border: '1px solid #f4f4f4'
      },

      tableType: 'function',

      tableId: 'multi',

      tableClass: 'i-table'
    };
    $scope.data2 = [
      {
        f1: 'No8888',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'No6666',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'No4444',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      },
      {
        f1: 'No7777',
        f2: 'XX产品',
        f3: 'XX行业',
        f4: 'V8',
        f5: 'online',
        f6: 'superUser',
        f7: '20160824',
        f8: 'superUser',
        f9: '20160824'
      }, {
        f1: 'testVal443',
        f2: 'testVal466',
        f3: 'testVal123',
        f4: 'testVal66',
        f5: 'testVal33',
        f6: 'testVal456',
        f7: 'testVal49',
        f8: 'testVal15689',
        f9: 'testVal032'
      }
    ];
  }]);

  app.controller('buttonCtrl', ['$scope', function ($scope) {
    $scope.list = [
      {
        name: 'hello world',
        url: 'http://www.baidu.com'
      },
      {
        name: 'Nice to meet you',
        url: 'http://www.baidu.com'
      },
      {
        name: 'wfjkdsjf fdsfa',
        url: 'http://www.baidu.com'
      },
      {
        name: 'df dfa daf eiheo',
        url: 'http://www.baidu.com'
      }
    ];
  }]);

  app.controller('dateDemo', ['$scope', function ($scope) {
    $scope.demo1 = {
      date: {},
      limit: {
        min: '2016-08-02',
        max: '2016-09-28'
      }
    };

    $scope.demo2 = {
      date: {},
      limit: {
        min: '2016-08-06',
        max: '2016-09-28'
      }
    };

    $scope.range = {
      date: {},
      limit: {
        min: '2016-08-06',
        max: '2016-09-28'
      }
    };
  }]);

  app.controller('iPaginationDemo', ['$scope', function ($scope) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.totalItems = 3000;

    $scope.changePage = function () {
      console.log($scope.currentPage);
      console.log($scope.itemsPerPage);
      console.log('excute query');
    };

    $scope.jumpPage = function (pageNum, $event) {
      var maxPageNum;
      if (!$event || $event && $event.keyCode == 13 && pageNum != $scope.currentPage) {
        maxPageNum = Math.ceil($scope.totalItems / $scope.itemsPerPage);
        //console.log('最大页码：' + maxPageNum);
        if (pageNum <= maxPageNum) {
          //console.log('excute query');
          $scope.currentPage = pageNum;
          //console.log($scope.currentPage);
          //console.log($scope.itemsPerPage);
        }
      }
    };

    $scope.itemsPerPageOptions = [10, 20, 50];

  }]);

  app.controller('promptboxCtrl', ['$scope', function ($scope) {
    $scope.info = {
      type: 'info',
      infoTitle: '发送成功',
      sureText: '确定',
      isShow: false
    };
    $scope.autoinfo = {
      type: 'auto-info',
      infoTitle: '信息发送成功',
      infoMsg: '弹出框将在3秒内自动消失',
      isShow: false
    };
    $scope.confirmsuccess = {
      type: 'confirm-success',
      infoTitle: '确认是否删除',
      infoMsg: '删除后不能恢复，请慎重选择！',
      sureText: '确认',
      cancelText: '取消',
      isShow: false
    };
    $scope.confirmquestion = {
      type: 'confirm-question',
      infoTitle: '确认是否通过审核',
      sureText: '通过审核',
      cancelText: '放弃',
      isShow: false
    };
    $scope.infoSuccess = {
      type: 'info-success',
      infoTitle: '发送成功',
      infoMsg: '我是详细信息我是详细信息我是详细信息',
      sureText: 'OK',
      isShow: false
    };
    $scope.confirmwarning = {
      type: 'confirm-warning',
      infoTitle: '你的操作有凶险，是否继续？',
      infoMsg: '此操作不能回滚，请慎重选择！',
      sureText: '继续',
      cancelText: '取消',
      isShow: false
    };
    $scope.confirmerror = {
      type: 'confirm-error',
      infoTitle: '手机号错误',
      infoMsg: '手机号码格式不正确，请输入正确手机号码，格式如：XXXXXXXXXXX',
      sureText: '确定',
      cancelText: '取消',
      isShow: false
    };
    $scope.confirminfo = {
      type: 'confirm-info',
      infoTitle: '是否确定进行修改',
      infoMsg: '修改后可能会影响其它数据，请谨慎处理',
      sureText: '确定',
      cancelText: '取消',
      isShow: false
    };
    $scope.showInfo = function () {
      $scope.info.isShow = true;
    };
    $scope.showAutoInfo = function () {
      $scope.autoinfo.isShow = true;
    };
    $scope.showConfirmSuccess = function () {
      $scope.confirmsuccess.isShow = true;
    };
    $scope.showConfirmQuestion = function () {
      $scope.confirmquestion.isShow = true;
    };
    $scope.showInfoSuccess = function () {
      $scope.infoSuccess.isShow = true;
    };
    $scope.showConfirmWarning = function () {
      $scope.confirmwarning.isShow = true;
    };
    $scope.showConfirmError = function () {
      $scope.confirmerror.isShow = true;
    };
    $scope.showConfirmInfo = function () {
      $scope.confirminfo.isShow = true;
    };
    $scope.alertInfo = function () {
      //console.log('info  确定');
      $scope.info.isShow = false;
    };
    $scope.alertInfoSuccess = function () {
      //console.log('info-success 确定');
      $scope.infoSuccess.isShow = false;
    };
    $scope.alertConfirmSuccess = function () {
      //console.log('confirm-success  进行业务逻辑操作');
      $scope.confirmsuccess.isShow = false;
    };
    $scope.alertConfirmQuestion = function () {
      //console.log('confirm-question  进行审核的业务逻辑操作');
      $scope.confirmquestion.isShow = false;
    };
    $scope.alertConfirmWarning = function () {
      //console.log('confirm-warning  进行对应业务逻辑处理');
      $scope.confirmwarning.isShow = false;
    };
    $scope.alertConfirmError = function () {
      //console.log('confirm-error  进行对应业务逻辑处理');
      $scope.confirmerror.isShow = false;
    };
    $scope.alertConfirmInfo = function () {
      //console.log('confirm-info  进行审核的业务逻辑操作');
      $scope.confirminfo.isShow = false;
    };
  }]);

  app.controller('iTreeDemo', ['$scope', function ($scope) {
    $scope.treeDemo1 = {
      tree: [
        {
          name: 'programming language',
          children: [
            {
              name: 'server side',
              children: [
                {name: 'Java'},
                {name: 'Python'},
                {
                  name: 'Node',
                  children: [
                    {name: 'assert'},
                    {name: 'buffer'},
                    {name: 'events'},
                    {
                      name: 'http',
                      children: [
                        {name: 'STATUS_CODES'},
                        {name: 'createServer'},
                        {name: 'createClient'},
                        {name: 'Server'}
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'front end',
              children: [
                {name: 'jQuery'},
                {name: 'Angular'},
                {name: 'React'}
              ]
            }
          ]
        },
        {
          name: 'programming language',
          children: [
            {
              name: 'server side',
              children: [
                {name: 'Java'},
                {name: 'Python'},
                {
                  name: 'Node',
                  children: [
                    {name: 'assert'},
                    {name: 'buffer'},
                    {name: 'events'},
                    {
                      name: 'http',
                      children: [
                        {name: 'STATUS_CODES'},
                        {name: 'createServer'},
                        {name: 'createClient'},
                        {name: 'Server'}
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'front end',
              children: [
                {name: 'jQuery'},
                {name: 'Angular'},
                {name: 'React'}
              ]
            }
          ]
        }
      ]
    };

    $scope.treeDemo2 = {
      selected: 0,
      tree: [
        {
          id: 0,
          name: 'programming language',
          children: [
            {
              id: 1,
              name: 'server side',
              children: [
                {name: 'Java', id: 2},
                {id: 3, name: 'Python'},
                {
                  id: 4,
                  name: 'Node',
                  children: [
                    {id: 5, name: 'assert'},
                    {id: 6, name: 'buffer'},
                    {id: 7, name: 'events'},
                    {
                      id: 8,
                      name: 'http',
                      children: [
                        {id: 9, name: 'STATUS_CODES'},
                        {id: 10, name: 'createServer'},
                        {id: 11, name: 'createClient'},
                        {id: 12, name: 'Server'}
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 13,
              name: 'front end',
              children: [
                { id: 14, name: 'jQuery'},
                { id: 15, name: 'Angular'},
                { id: 16, name: 'React'}
              ]
            }
          ]
        }
      ]
    };
  }]);

  app.controller('modalDemo', ['$scope', '$uibModal', '$templateCache', function ($scope, $uibModal, $templateCache) {

    $scope.defaultOpenConfig = {
      windowClass: 'example-modal',
      templateName: 'PrimaryModal'
    };

    $scope.primaryOpenConfig = {
      windowClass: 'modal-primary',
      templateName: 'PrimaryModal'
    };

    $scope.infoOpenConfig = {
      windowClass: 'modal-info',
      templateName: 'PrimaryModal'
    };

    $scope.successOpenConfig = {
      windowClass: 'modal-success',
      templateName: 'PrimaryModal'
    };

    $scope.warningOpenConfig = {
      windowClass: 'modal-warning',
      templateName: 'PrimaryModal'
    };

    $scope.dangerOpenConfig = {
      windowClass: 'modal-danger',
      templateName: 'PrimaryModal'
    };

    $scope.dialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'configDialog',
      iconDivClass: ['question', 'animateErrorIcon'],
      iconClass: [['line', 'tip', 'animateSuccessTip'], ['line', 'tip', 'animateSuccessLong']],
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Yes,delete it!',
      positiveButtonClass: ['btn-danger'],
      negativeButtonText: 'Cancel',
      negativeButtonClass: ['btn-default']
    };

    $scope.openModal = function (openConfig) {
      var modalInstance = $uibModal.open({
        windowClass: openConfig.windowClass,
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        controllerAs: '$ctrl',
        template: $templateCache.get(openConfig.templateName),
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          openConfig: function () {
            return openConfig;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }]);

  app.controller('dialogDemo', ['$scope', '$uibModal', '$templateCache', function ($scope, $uibModal, $templateCache) {

    $scope.dialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'configDialog',
      iconDivClass: ['question', 'animateErrorIcon'],
      iconClass: [['line', 'tip', 'animateSuccessTip'], ['line', 'tip', 'animateSuccessLong']],
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Yes,delete it',
      positiveButtonClass: ['btn-danger'],
      negativeButtonText: 'Cancel',
      negativeButtonClass: ['btn-default']
    };

    $scope.infoDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'infoDialog',
      headerText: 'Here\'s a message!',
      positiveButtonText: 'ok'
    };

    $scope.autoDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'autoDialog',
      headerText: 'Auto close alert!',
      contentText: 'I will close in 2 seconds.',
      delay: 2000
    };

    $scope.greenCorrectDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'greenCorrectDialog',
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Success',
      negativeButtonText: 'Cancel'
    };

    $scope.blueInfoDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'blueInfoDialog',
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Primary',
      negativeButtonText: 'Cancel'
    };

    $scope.yellowWarningDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'yellowWarningDialog',
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Warning',
      negativeButtonText: 'Cancel'
    };

    $scope.redFalseDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'redFalseDialog',
      headerText: 'Are you sure?',
      contentText: 'You will not be able to recover this imaginary file!',
      positiveButtonText: 'Danger',
      negativeButtonText: 'Cancel'
    };

    $scope.redQuestionDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'redQuestionDialog',
      headerText: '您确定通过审核吗？',
      positiveButtonText: '通过审核',
      negativeButtonText: '放弃'
    };

    $scope.greenBlueDialogOpenConfig = {
      windowClass: 'sweet-modal',
      templateName: 'greenBlueDialog',
      headerText: 'Good job!',
      contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis',
      positiveButtonText: 'ok'
    };

    $scope.openModal = function (openConfig) {
      var modalInstance = $uibModal.open({
        windowClass: openConfig.windowClass,
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        controllerAs: '$ctrl',
        template: $templateCache.get(openConfig.templateName),
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          openConfig: function () {
            return openConfig;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }]);

  app.controller('ModalInstanceCtrl', ['$uibModalInstance', 'openConfig', '$timeout', function ($uibModalInstance, openConfig, $timeout) {
    var $ctrl = this;
    $ctrl.openConfig = openConfig;

    if (openConfig.templateName == 'PrimaryModal') {
      $ctrl.defaultWindowClassName = 'example-modal';
      $ctrl.defaultBtnClass = ['btn', 'btn-default'];
      $ctrl.outlineBtnClass = ['btn', 'btn-outline'];

    } else if (openConfig.templateName == 'autoDialog') {
      $timeout(function () {
        $uibModalInstance.close($ctrl.openConfig.windowClass);
      }, openConfig.delay);
    }

    $ctrl.ok = function () {
      $uibModalInstance.close($ctrl.openConfig.windowClass);
    };
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);

  app.controller('permissionDemo', ['$scope', function ($scope) {
    $scope.auth = 'fn';
  }]);

  app.controller('editorDemo', ['$scope', function ($scope) {
    $scope.editorContent = '<h2> \
  UEditor 介绍 \
  </h2> \
  <p> \
  UEditor 是由百度「FEX前端研发团队」开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码。\
  </p> \
  <h2> \
  1 入门部署和体验 \
  </h2> \
  <h3> \
  1.1 下载编辑器 \
  </h3> \
  <p> \
  到官网下载 UEditor 最新版 \
  </p> \
  <h3> \
  1.2 创建demo文件 \
  </h3> \
  <p> \
  解压下载的包，在解压后的目录创建 demo.html 文件，填入下面的html代码 \
  </p>';
  }]);

  app.controller('uploaderDemo', ['$scope', function ($scope) {
    $scope.src = '';
    $scope.url = '/cms/resource/v1/upload';
    $scope.album = [];
  }]);

}, 'components');
/*eslint-enable */
