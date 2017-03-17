<template>
  <div class="style-m-item" :class="btnClass[buttonCounts]">
    <div class="sm-i-body">
      <div class="sm-i-img">
        <!--<img ng-src="{{data.sampleImageUrl || './img/style-img_03.jpg'}}" alt="">-->
        <div class="sm-i-hover">
          <div class="vertical-middle">
            <div class="middle-cell">
              <div class="plr15">
                <div class="col-xs-10 col-xs-offset-1">
                  <a ng-click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm-i-txt">
        <p>编号：{{ styleData.code }}</p>
        <p>名称：{{ styleData.name }}</p>
      </div>
      <div>
        <label :class="styleData._labelContent.className">{{ styleData._labelContent.text }}</label>
      </div>
    </div>

    <div class="sm-i-operate btn-group-sm text-center">
      <button v-if="styleData.auditType === 1 && styleData.currentAuditStatus === 2 && styleData.status === 1"
              ng-click="doAuditPlatform('pass')"
              class="btn btn-default hover-danger-o">通过</button>
      <button v-if="styleData.auditType === 1 && styleData.currentAuditStatus === 2 && styleData.status === 1"
              ng-click="doAuditPlatform('reject')"
              class="btn btn-default hover-danger-o">不通过</button>
      <button v-if="styleData.auditType === 2 && styleData.currentAuditStatus === 2 && styleData.status === 1"
              ng-click="shelvesPlatform('up')"
              class="btn btn-default hover-danger-o">上架</button>
      <button v-if="styleData.auditType === 2 && styleData.currentAuditStatus === 2 && styleData.status === 0"
              ng-click="shelvesPlatform('down')"
              class="btn btn-default hover-danger-o">下架</button>
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
    mapGetters
  } from 'vuex';

  export default {
    props: ['styleData'],
    data() {
      return {
        btnClass: ['', 'one-btn', 'two-btn', 'three-btn', 'four-btn', 'five-btn', 'six-btn']
      };
    },
    computed: {
      ...mapGetters(['currentRouteName']),
      buttonCounts() {
        const { auditType, currentAuditStatus, status } = this.styleData;
        var num = 0;
        if(auditType === 1 && currentAuditStatus === 2 && status === 1){
          num += 2;
        }
        if(auditType === 2 && currentAuditStatus === 2 && status === 1){
          num++;
        }
        if(auditType === 2 && currentAuditStatus === 2 && status === 0){
          num++;
        }
        return num;
      }
    },
    mounted() {
      console.log(this.styleData);

    },
    methods: {
    },
    components: {

    }
  }

</script>
