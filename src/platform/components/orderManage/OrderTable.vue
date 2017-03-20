<template>
  <div class="table-responsive mt20">
    <table class="table i-table">
      <thead>
      <tr>
        <td width="50" align="center">序号</td>
        <td width="120" align="center">工单编号</td>
        <td>下单时间</td>
        <td>服务商</td>
        <td>客户</td>
        <td>样板</td>
        <td>网站</td>
        <td>状态</td>
        <td width="100" align="center">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(order, index) in orderList">
        <td width="50" align="center">{{index + 1}}</td>
        <td width="120" align="center"><a href @click.prevent>{{order.no}}</a></td>
        <td>{{order.createUser.createTimeLocalDay}}<br/>{{order.createUser.createTimeLocalDetail}}</td>
        <td>{{order.createEnterprise.code}} {{order.createEnterprise.shortName}}</td>
        <td>{{order.useEnterprise.code}} {{order.useEnterprise.fullName}}</td>
        <td>{{order.sourceSite.siteCode}} {{order.sourceSite.siteName}}</td>
        <td>{{order.targetSite.siteCode}} {{order.targetSite.siteName}}</td>
        <td>
          <span v-if="order.status === 0">生成网站</span>
          <span v-if="order.status === 1">设计中</span>
          <span v-if="order.status === 2">完成</span>
        </td>
        <td width="100" align="center"><button @click="detail(order)" class="btn btn-default hover-primary-o">详情</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  import Vue from 'vue';
  import {
    mapGetters,
    mapMutations,
  } from 'vuex';

  export default {
    props: ['orderList'],
    data() {
      return {
      };
    },
    watch: {
      
    },
    methods: {
      ...mapMutations(['currentOrder']),
      detail(order){
        this.currentOrder({ currentOrder: order });
        this.router.push({ path: '/orderDetail'}); 
      }
    },
    computed: {
      ...mapGetters(['cmsApi', 'router'])
    },
    mounted() {
    },
    activated() {
      console.log(this.$route)
    },
    components: {
    }
  }

</script>
