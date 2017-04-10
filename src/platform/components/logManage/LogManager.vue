<template>
  <div class="box box-solid box-lg">
    <modal title="Modal Title" showHeader="false" showFooter="false" :show="showDetail" @ok="closeDetail" @cancel="closeDetail">
      <div>
        <div class="modal-header clearfix">
          <button @click="closeDetail" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span></button>
          <span class="modal-title">详情</span>
        </div>
        <div class="modal-body log-info">
          <ul class="text-light">
            <li class="row">
              <div class="col-xs-3 text-right">操作时间：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog.createTimeLocal}}</p>
              </div>
            </li>
            <li class="row">
              <div class="col-xs-3 text-right">员工姓名：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog.enterpriseUser.user.username}}</p>
              </div>
            </li>
            <li class="row">
              <div class="col-xs-3 text-right">用户类型：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog.enterpriseUser._userTypeName}}</p>
              </div>
            </li>
            <li class="row">
              <div class="col-xs-3 text-right">功能模块：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog.section}}</p>
              </div>
            </li>
            <li class="row">
              <div class="col-xs-3 text-right">操作类型：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog._operationTypeName}}</p>
              </div>
            </li>
            <li class="row">
              <div class="col-xs-3 text-right">操作内容：</div>
              <div class="col-xs-9 text-left">
                <p>{{detailLog.message}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--<div slot="header"></div>
      <div slot="title"></div>-->
    </modal>
    <div class="box-body clearfix">
      <div>
        <div class="table-responsive">
          <table class="table i-table">
            <thead>
              <tr>
                <td width="50" align="center">序号</td>
                <td>操作时间</td>
                <td>账户名称</td>
                <td>员工姓名</td>
                <td>用户类型</td>
                <td>功能名称</td>
                <td>操作类型</td>
                <!--<td>IP</td>-->
                <td>操作内容</td>
                <td width="100" align="center">操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in logList">
                <td align="center">{{index + 1}}</td>
                <td>{{log.createTimeLocalDay}}<br/>{{log.createTimeLocalDetail}}</td>
                <td>{{log.enterpriseUser.user.username}}</td>
                <td>{{log.enterpriseUser.user.realName}}</td>
                <td>{{log.enterpriseUser._userTypeName}}</td>
                <td>{{log.section}}</td>
                <td>{{log._operationTypeName}}</td>
                <!--<td>192.168.1.1</td>-->
                <td>{{log.title}}</td>
                <td align="center">
                  <button @click="detail(log)" class="btn btn-default hover-primary-o btn-sm">详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination-nav">
          <nav class="pagination-nav">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange" :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]" :page-size="itemsPerPage" layout="total, sizes, prev, pager, next, jumper" :total="logCount">
              </el-pagination>
          </nav>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .1s ease;
  }
  
  .component-fade-enter,
  .component-fade-leave-active {
    opacity: 0;
  }
  
  .flip-list-move {
    transition: transform 1s;
  }
</style>

<script>
  import Vue from 'vue';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import dateUtil from 'element-ui/src/utils/date';

  export default {
    activated() {
    },
    watch: {
    },
    data() {
      return {
        logCount: 0,
        logList: [],
        currentPage: 1,
        itemsPerPage: 10,
        showDetail: false,
        detailLog: {
          enterpriseUser: { user: {} }
        },
      };
    },
    computed: {
    ...mapGetters(['cmsApi'])
    },
    mounted() {
      this.paginationQuery();
    },
    methods: {
      handlePageSizeChange(pageSize) {
        this.itemsPerPage = pageSize;
        this.paginationQuery();
      },
      handleCurrentPageChange(currentPage) {
        this.currentPage = currentPage;
        this.paginationQuery();
      },
      paginationQuery() {
        this.cmsApi.log.getLogList({ pageindex: this.currentPage, pagesize: this.itemsPerPage }).then(res => {
          return res.json()
        }).then(data => {
          this.logCount = data.count;
          this.logList = data.list;
          this.logInfoTransform(this.logList);
        });
      },
      closeDetail() {
        this.showDetail = false;
      },
      detail(log) {
        this.showDetail = true;
        this.detailLog = log;
      },
      logInfoTransform (list) {
        list.forEach(log => {
          log.createTimeLocal = dateUtil.format(new Date(log.createTime), 'yyyy-MM-dd hh:mm:ss');
          log.createTimeLocalDay = dateUtil.format(new Date(log.createTime), 'yyyy-MM-dd');
          log.createTimeLocalDetail = dateUtil.format(new Date(log.createTime), 'hh:mm:ss');
          switch (log.operationType) {
            case 0:
              log._operationTypeName = '查看';
              break;
            case 1:
              log._operationTypeName = '修改';
              break;
            case 2:
              log._operationTypeName = '删除';
              break;
            case 3:
              log._operationTypeName = '其他';
              break;
          }
          switch (log.systemType) {
            case 0:
              log._systemTypeName = 'CMS';
              break;
            case 1:
              log._systemTypeName = 'H5';
              break;
          }
          if (log.enterpriseUser) {
            switch (log.enterpriseUser.userType) {
              case 0:
                log.enterpriseUser._userTypeName = '管理员';
                break;
              case 1:
                log.enterpriseUser._userTypeName = '普通用户';
                break;
            }
          }

        });
      },
      
    },
    components: {
    },
  }

</script>
