<template>
  <div class="box box-solid box-lg ng-scope">
    <modal title="Modal Title" :large="true" :show.sync="showChooseTpl" @ok="confirmTpl" @cancel="cancelTpl">
      <div class="table-responsive" style="max-height: 400px">
        <div class="search-form input-group pull-right mb15 mr15">
          <input type="text" class="form-control" v-model.trim="queryTplCode" @keyup.enter="btnCheckTemplate" maxlength="50" placeholder="请输入样板编号/名称">
          <span class="input-group-btn">
          <button type="button" @click="btnCheckTemplate"
            class="btn btn-default only-ico"><i class="fa fa-search"></i></button>
        </span>
        </div>
        <table class="table i-table">
          <thead>
            <tr>
              <td width="50" align="center">选择</td>
              <td width="50" align="center">序号</td>
              <td>样板编号</td>
              <td>样板名称</td>
              <td>用途类型</td>
              <td>行业类型</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(template, index) in filteredPlatFormTemplate" @click="checkTemplate(template)">
              <td align="center">
                <label class="iradio-nav">
              <div class="iradio iradio-circle iradio-primary" :class="{checked: template.id === templateChoose.id}">
                <span class="iCheck-ico"></span>
              </div>
            </label>
              </td>
              <td align="center">{{ index + 1 }}</td>
              <td><a href @click.prevent>{{template.siteCode}}</a></td>
              <td>{{template.siteName}}</td>
              <td>{{template.purpose ? template.purpose.name : '---'}}</td>
              <td><span v-for="item in template.industry">{{item.name}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="header">选择样板</div>
      <div slot="title">选择样板</div>
    </modal>
    <!--<modal-helper :modalData="modalData" @ok="confirmTpl" @cancel="cancelTpl"></modal-helper>-->
    <div class="top-fixed-wrap clearfix">
      <div class="pull-left form-inline">
        <div class="box-body clearfix">
          <div class="top-nav nav-tabs-custom clearfix">
            <ul class="nav nav-tabs">
              <li v-for="(tab, index) in tabArr" :class="{active: index === currentTabIndex}" @click.prevent="activeTab(index)">
                <a href>{{ tab }}</a></li>
            </ul>
          </div>
          <div class="form-group">
            <el-select v-model="purposeSelected" placeholder="用途">
              <el-option v-for="(item, index) in purposeList" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="form-group">
            <el-select v-model="industrySelected" placeholder="行业">
              <el-option v-for="(item, index) in industryList" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-select v-model="colorSelected" placeholder="颜色">
              <el-option v-for="(item, index) in colorList" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-select v-model="deviceSelected" placeholder="设备类型">
              <el-option v-for="(item, index) in templateStyle" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="form-group">
            <div class="input-group">
              <input type="text" name="table_search" class="form-control" :placeholder="templateChoose.siteName || '选择样板'" readonly>
              <div class="input-group-btn">
                <button @click="chooseTemplateOrSite" class="btn btn-default only-ico"><b>···</b></button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="search-form input-group pull-right">
              <input type="text" class="form-control" v-model.trim="styleQuery" placeholder="风格编号/名称">
              <span class="input-group-btn">
                  <button type="button" @click="paginationQuery" class="btn btn-default only-ico">
                    <i class="fa fa-search"></i>
                  </button>
                </span>
            </div>
          </div>

        </div>
        <div class="style-m-cont">
          <ul class="style-m-list clearfix">
            <li v-for="data in filteredShowStyleList">
              <Case-item :key="data.id" :styleData="data" @updateStyleData="updateStyleData"></Case-item>
            </li>
            <infinite-loading key="infinite-loading" v-if="firstLoadSuc" :on-infinite="onInfinite" ref="infiniteLoading">
              <span slot="no-more">
                  没有更多了
                </span>
              <span slot="no-results">
                  没有数据
                </span>
            </infinite-loading>
          </ul> 
        </div>

      </div>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import CaseItem from './CaseItem.vue';
  import InfiniteLoading from 'vue-infinite-loading';
  import modalHelper from '../modalHelper/ModalHelper';

  export default {
    activated() {
      console.log('缓存的组件又出现了，我是不是要重新拉取数据呢？')
    },
    watch: {
      colorSelected(value) {
        this.paginationQuery();
      },
      industrySelected(value) {
        this.paginationQuery();
      },
      purposeSelected(value) {
        this.paginationQuery();
      },
      deviceSelected(value) {
        this.paginationQuery();
      }
    },
    data() {
      return {
        currentTabIndex: 0,
        tabArr: ['所有风格', '待审核', '已上架', '案例审核不通过'],
        colorSelected: '',
        industrySelected: '',
        purposeSelected: '',
        deviceSelected: 'aaccc8c9-a51c-49eb-a433-0ce47b66dc00',
        styleQuery: '',
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        styleList: [],
        firstLoadSuc: false,
        auditingStylelist: [],
        onshelvesStylelist: [],
        offshelvesStylelist: [],
        failedStyleList: [],
        onScroll: false,
        noMoreStyle: false,
        showChooseTpl: false,
        platFormTemplate: [],
        templateChoose: {},
        queryTplCode: '',
        modalData: {
          show: false,
          contentText: '确定下架吗?',
          cancelText: '取消',
          confirmText: '确定'
        }
      };
    },
    computed: {
    ...mapGetters(['industryList', 'purposeList', 'colorList', 'templateStyle', 'cmsApi']),
      bodyMinHeight() {
        return {
          'minHeight': document.body.clientHeight - 172 + 'px'
        };
      },
      showStyleList() {
        switch (this.currentTabIndex) {
          case 0:
            return this.styleList;
          case 1:
            return this.auditingStylelist;
          /*case 2:
            return this.onshelvesStylelist;*/
          case 2:
            return this.onshelvesStylelist;
          case 3:
            return this.failedStyleList;
        }
      },
      filteredShowStyleList() {
        return this.showStyleList.filter(style => {
          const { code, name } = style;
          return code.match(this.styleQuery) || name.match(this.styleQuery);
        });
      },
      filteredPlatFormTemplate() {
        return this.platFormTemplate.filter(tpl => {
          const { siteCode, siteName } = tpl;
          return siteCode.match(this.queryTplCode) || siteName.match(this.queryTplCode);
        });
      },
    },
    mounted() {
      this.getIndustry();
      this.getPurpose();
      this.getColor();
      this.paginationQuery();
    },
    methods: {
      ...mapActions(['getIndustry', 'getPurpose', 'getColor']),
      chooseTemplateOrSite() {
        this.showChooseTpl = !this.showChooseTpl;
        if (this.showChooseTpl && this.platFormTemplate.length === 0) {
          this.cmsApi.templateAndSite.getPlatFormSiteQuery({
            pageindex: 1,
            pagesize: 200
          }).then(response => {
            if (!response.ok) {
              return
            }
            return response.json();
          }).then(data => {
            data.unshift({ siteName: '全部模板', siteCode: '' });
            this.platFormTemplate = data;
          });
        }
      },
      confirmTpl() {
        this.showChooseTpl = false;
        this.paginationQuery();
      },
      comfirmTip() {
        this.tipData.showTip = false;
      },
      closeTip() {
        this.tipData.showTip = false;
      },
      cancelTpl() {
        this.showChooseTpl = false;
      },
      activeTab(index) {
        this.currentTabIndex = index;
      },
      onInfinite() {
        if (this.noMoreStyle) {
          return;
        }
        if (this.onScroll) {
          return;
        }
        this.onScroll = true;
        const query = {
          pageindex: ++this.currentPage,
          pagesize: this.itemsPerPage,
          purposeid: this.purposeSelected,
          industryid: this.industrySelected,
          mastercolorid: this.colorSelected,
          deviceid: this.deviceSelected
        };
        this.cmsApi.style.getPlatFormStyleCaseManageList(query).then(response => {
          if (!response.ok) {
            return;
          }
          console.log('$InfiniteLoading:loaded');
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          return response.json();
        }).then(this.sortState);
        console.log('onInfinite!');
      },
      paginationQuery() {
        this.onScroll = false;
        this.currentPage = 1;
        const query = {
          pageindex: this.currentPage,
          pagesize: this.itemsPerPage,
          code: this.styleQuery,
          purposeid: this.purposeSelected,
          templateid: this.templateChoose.id,
          industryid: this.industrySelected,
          mastercolorid: this.colorSelected,
          deviceid: this.deviceSelected
        };
        this.cmsApi.style.getPlatFormStyleCaseManageList(query).then(response => {
          if (!response.ok) {
            return;
          }
          return response.json();
        }).then(this.sortState);
      },
      updateStyleData(payload) {
        const { styleData } = payload;
        const arrInfo = this.styleList.find(style => {
          return style.id === styleData.id;
        });
        console.log(styleData);
        if (!_.isUndefined(arrInfo)) {
          Object.assign(arrInfo, styleData);
          this.sortState({ list: this.styleList });
        }
      },
      sortState(data) {
        console.log(data);
        let { count, list } = data;
        if (!_.isUndefined(count)) {
          this.totalItems = count;
        }
        if (list.length === 0) {
          this.noMoreStyle = true;
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
        if (this.onScroll) {
          this.styleList = this.styleList.concat(list);
        } else {
          this.styleList = list;
        }
        this.onScroll = false;

        this.auditingStylelist = this.styleList.filter(style => {
          let test = (style.auditType === 1 && style.currentAuditStatus === 2 && style.caseStatus === 1) ||
             (style.auditType === 2 && style.currentAuditStatus === 3 && style.caseStatus === 1);
          if (test) {
            this.$set(style, '_labelContent', {
              className: 'sm-i-status label-warning',
              text: '待审核'
            });
          }
          return test;
        });

        this.onshelvesStylelist = this.styleList.filter(style => {
          let test = style.auditType === 2 && style.currentAuditStatus === 2 && style.caseStatus === 2;
          if (test) {
            this.$set(style, '_labelContent', {
              className: 'sm-i-status label-success',
              text: '已上架'
            });
          }
          return test;
        });

        this.offshelvesStylelist = this.styleList.filter(style => {
          let test = false;
          if (test) {
            this.$set(style, '_labelContent', {
              className: 'sm-i-status label-danger',
              text: '下架中'
            });
          }
          return test;
        });

        this.failedStyleList = this.styleList.filter(style => {
          let test = style.auditType === 2 && style.currentAuditStatus === 3 && style.caseStatus === 3;
          if (test) {
            this.$set(style, '_labelContent', {
              className: 'sm-i-status label-danger',
              text: '案例审核不通过'
            });
          }
          return test;
        });

        this.firstLoadSuc = true;
      },
      checkTemplate(template) {
        this.templateChoose = template;
      },
      btnCheckTemplate() {
        if (this.filteredPlatFormTemplate.length != 0) {
          this.templateChoose = _.first(this.filteredPlatFormTemplate);
          this.showChooseTpl = false;
          this.paginationQuery();
        }
      }
    },
    components: {
      CaseItem,
      InfiniteLoading,
      modalHelper
    }
  }

</script>
