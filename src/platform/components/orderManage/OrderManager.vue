<template>
  <div class="box box-solid box-lg">
  <div class="box-body clearfix">
    <div class="option-one clearfix">
      <div class="pull-left form-inline">
        <div class="form-group">
          <el-select v-model="customerSelected" placeholder="客户">
            <el-option v-for="(item, index) in customerArr" :key="index" :label="item.fullName" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <el-select v-model="orderStatusSelected" placeholder="工单状态">
            <el-option v-for="(item, index) in orderStatus" :key="index" :label="item.name" :value="item.status">
            </el-option>
          </el-select>
        </div>
        <!--<div class="form-group">
          <date-range-picker range-date="range.date" max="range.limit.max" min="range.limit.min" on-change="range.rangeChange()"></date-range-picker>
        </div>-->
      </div>
      <div class="pull-right">
        <div class="search-form input-group pull-left mr15">
          <input type="text" class="form-control" v-model.trim="orderQuery" placeholder="请输入工单编号">
          <span class="input-group-btn">
            <button type="button" @click="paginationQuery" class="btn btn-default only-ico">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <Order-table :orderList="orderList"></Order-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    <!--<nav class="pagination-nav">
      <ul class="pagination pagination-outline pull-right" uib-pagination total-items="paginiationData.totalItems" items-per-page="itemsPerPage.number"
        ng-model="paginiationData.currentPage" ng-change="pageChanged()">
        </ul>
        <label class="pagination-info pull-right">共paginiationData.totalItems条，每页显示
      <select class="form-control"
              ng-options="item as item for item in paginiationData.itemsPerPageSelection"
              ng-model="itemsPerPage.number"
              ng-change="itemsPerPageChanged()"></select>
      条</label>
    </nav>-->
  </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import {
    mapGetters
  } from 'vuex';
  import OrderTable from './OrderTable.vue';

  export default {
    data() {
      return {
        customerArr: [],
        customerSelected: '',
        orderStatus: [{
          name: '全部状态',
          status: -1
        }, {
          name: '生成网站',
          status: 0
        }, {
          name: '设计网站',
          status: 1
        }, {
          name: '完成',
          status: 2
        }],
        orderStatusSelected: undefined,
        orderQuery: '',
        currentPage: 1,
        itemsPerPage: 10,
        orderList: [],
        count: 0,
      };
    },
    watch: {
      customerSelected() {
        this.paginationQuery();
      },
      orderStatusSelected() {
        this.paginationQuery();
      }
    },
    methods: {
      paginationQuery() {
        const params = {
          type: 1,
          enterpriseid: this.customerSelected,
          createdatebegin: undefined,
          createdateend: undefined,
          /*templatecode: '',*/
          ticketcode: this.orderQuery,
          // servicesid: scope.facilitatorSelected.id == '-1' ? undefined : scope.facilitatorSelected.id,
          auditstatus: this.orderStatusSelected === -1 ? undefined : this.orderStatusSelected,
          pageindex: this.currentPage,
          pagesize: this.itemsPerPage,
          sitetype: 0
        };
        this.cmsApi.order.getSiteTicketList(params).then(res => {
          return res.json();
        }).then(data => {
          console.log(data);
          this.count = data.count;
          this.orderList = data.list;
        });
      }
    },
    computed: {
      ...mapGetters(['cmsApi'])
    },
    mounted() {
      this.paginationQuery();
      this.cmsApi.templateAndSite.getAllCustomer({ type: 2 }).then(res => {
        if (!res.ok) {
          return
        }
        return res.json();
      }).then(data => {
        console.log(data);
        data.unshift({ fullName: '全部客户', id: undefined });
        this.customerArr = data;
      });
    },
    components: {
      OrderTable
    }
  }

</script>
