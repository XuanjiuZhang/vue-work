<template>
  <div class="box box-solid box-lg ng-scope">
  <modal title="Modal Title" :show.sync="showChooseTpl" @ok="confirmTpl" @cancel="cancelTpl">
    <div class="table-responsive">
      <div class="search-form input-group pull-right mb15 mr15">
        <input type="text" class="form-control" ng-model="$ctrl.openConfig.query.code" ng-keydown="$ctrl.detectEnter($event)" placeholder="请输入样板编号/名称">
        <span class="input-group-btn" ng-click="paginationQuery()">
      <button type="button" ng-click="$ctrl.search()" class="btn btn-default only-ico"><i class="fa fa-search"></i></button>
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
          <tr ng-repeat="template in $ctrl.openConfig.templateList" ng-click="$ctrl.checkTemplate(template)">
            <td align="center">
              <label class="iradio-nav">
            <div class="iradio iradio-circle iradio-primary" ng-class="{checked: template._checked}">
              <span class="iCheck-ico"></span>
            </div>
          </label>
            </td>
            <td align="center">$index + 1</td>
            <td><a href="">template.siteCode</a></td>
            <td>template.siteName</td>
            <td>template.purpose.name</td>
            <td><span ng-repeat="item in template.industry">item.name</span></td>
            <!--<td align="center">{{$index + 1}}</td>
            <td><a href="">{{template.siteCode}}</a></td>
            <td>{{template.siteName}}</td>
            <td>{{template.purpose.name}}</td>
            <td><span ng-repeat="item in template.industry">{{item.name}} </span></td>-->
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="header">选择样板</div>
    <div slot="title">选择样板</div>
  </modal>
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
            <input type="text" name="table_search" class="form-control" placeholder="templateSelected.siteName || chooseTemplatePlaceHolder"
              readonly>
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
          <li v-for="data in filteredShowStyleList" :key="data.id">
            <Style-item :styleData="data"></Style-item>
          </li>
          <infinite-loading v-if="styleList.length != 0" :on-infinite="onInfinite" ref="infiniteLoading">
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

<style lang="less" scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  
  .component-fade-enter,
  .component-fade-leave-active {
    opacity: 0;
  }
</style>

<script>
  import Vue from 'vue';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import StyleItem from './StyleItem.vue';
  import InfiniteLoading from 'vue-infinite-loading';

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
      },
    },
    data() {
      return {
        currentTabIndex: 0,
        tabArr: ['所有风格', '待审核', '出售中', '下架中', '上架审核不通过'],
        colorSelected: '',
        industrySelected: '',
        purposeSelected: '',
        deviceSelected: 'aaccc8c9-a51c-49eb-a433-0ce47b66dc00',
        styleQuery: '',
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        styleList: [],
        auditingStylelist: [],
        onshelvesStylelist: [],
        offshelvesStylelist: [],
        failedStyleList: [],
        onScroll: false,
        noMoreStyle: false,
        showChooseTpl: true,
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
          case 2:
            return this.onshelvesStylelist;
          case 3:
            return this.offshelvesStylelist;
          case 4:
            return this.failedStyleList;
        }
      },
      filteredShowStyleList() {
        return this.showStyleList.filter(style => {
          const { code, name } = style;
          return code.match(this.styleQuery) || name.match(this.styleQuery);
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
      },
      confirmTpl() {
        this.showChooseTpl = false;
        console.log('confirmTpl!');
      },
      cancelTpl() {
        this.showChooseTpl = false;
        console.log('cancelTpl!');
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
        this.cmsApi.style.getPlatFormStyleList(query).then(response => {
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
          // templateid: scope.templateSelected.id == '-1' ? undefined : scope.templateSelected.id,
          industryid: this.industrySelected,
          mastercolorid: this.colorSelected,
          // auditstatus: scope.auditSelected.status == '-1' ? undefined : scope.auditSelected.status,
          deviceid: this.deviceSelected
        };
        // console.log(query);
        // scope.disableLoading = true;
        this.cmsApi.style.getPlatFormStyleList(query).then(response => {
          if (!response.ok) {
            return;
          }
          return response.json();
        }).then(this.sortState);
      },
      sortState(data) {
        console.log(data);
        let { count, list } = data;
        this.totalItems = count;
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
          let test = style.auditType === 1 && style.currentAuditStatus === 2 && style.status === 1;
          if (test) {
            style._labelContent = {
              className: 'sm-i-status label-warning',
              text: '待审核'
            };
          }
          return test;
        });

        this.onshelvesStylelist = this.styleList.filter(style => {
          let test = style.auditType === 2 && style.currentAuditStatus === 2 && style.status === 0;
          if (test) {
            style._labelContent = {
              className: 'sm-i-status label-success',
              text: '出售中'
            };
          }
          return test;
        });

        this.offshelvesStylelist = this.styleList.filter(style => {
          let test = style.auditType === 2 && style.currentAuditStatus === 2 && style.status === 1;
          if (test) {
            style._labelContent = {
              className: 'sm-i-status label-danger',
              text: '下架中'
            };
          }
          return test;
        });

        this.failedStyleList = this.styleList.filter(style => {
          let test = style.auditType === 2 && style.currentAuditStatus === 3;
          if (test) {
            style._labelContent = {
              className: 'sm-i-status label-danger',
              text: '上架审核不通过'
            };
          }
          return test;
        });

      }
    },
    components: {
      StyleItem,
      InfiniteLoading,
    }
  }

</script>
