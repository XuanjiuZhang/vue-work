<template>
  <div class="box box-solid box-lg">
  <div class="box-body clearfix">
    <div class="option-one clearfix">
      <div class="pull-left form-inline">
        <div class="form-group">
          <el-select v-model="customerSelected" placeholder="客户">
            <el-option v-for="(item, index) in customerList" :key="index" :label="item.fullName" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <el-select v-model="orderStatusSelected" placeholder="工单状态">
            <el-option v-for="(item, index) in orderStatus" :key="index" :label="item.name" :value="item.status">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            @change="dateRangeChange"
            :picker-options="pickerOptionsRecent">
          </el-date-picker>
        </div>
      </div>
      <div class="pull-right">
        <div class="search-form input-group pull-left mr15">
          <input type="text" class="form-control" v-model.trim="orderQuery" placeholder="请输入工单编号">
          <span class="input-group-btn">
            <button type="button" @click="paginationQuery('reset')" class="btn btn-default only-ico">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <Order-table :orderList="orderList"></Order-table>
    <nav class="pagination-nav">
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="itemsPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </nav>
  </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import {
    mapGetters,
    mapActions,
  } from 'vuex';
  import OrderTable from './OrderTable.vue';
  import dateUtil from 'element-ui/src/utils/date';

  export default {
    data() {
      return {
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
        dateRange: undefined,
        dateRangeUnix: [undefined, undefined],
        pickerOptionsRecent: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
      ...mapActions(['getCustomer']),
      dateRangeChange(range) {
        const rangeArr = range.split(' - ');
        this.dateRangeUnix = rangeArr.map(dateStr => {
          return dateUtil.parse(dateStr, 'yyyy-mm-dd').valueOf();
        });
        this.paginationQuery();
      },
      handlePageSizeChange(pageSize) {
        this.itemsPerPage = pageSize;
        this.paginationQuery();
      },
      handleCurrentPageChange(currentPage) {
        this.currentPage = currentPage;
        this.paginationQuery();
      },
      paginationQuery(reset) {
        if(reset === 'reset'){
          this.currentPage = 1;
          this.itemsPerPage = 10;
        };
        var createdatebegin;
        var createdateend;
        if(_.first(this.dateRangeUnix)){
          createdatebegin = _.first(this.dateRangeUnix);
          createdateend = _.last(this.dateRangeUnix);
        }
        const params = {
          type: 1,
          enterpriseid: this.customerSelected,
          createdatebegin,
          createdateend,
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
      ...mapGetters(['cmsApi', 'customerList'])
    },
    mounted() {
      this.paginationQuery();
      this.getCustomer();
    },
    components: {
      OrderTable
    }
  }

</script>
