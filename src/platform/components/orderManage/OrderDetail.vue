<template>
  <div class="box box-solid box-lg">
    <modal title="选择来源风格" :large="true" :top="180" :show.sync="showChooseTpl" @ok="confirmTpl" @cancel="cancelTpl">
      <div class="modal-body c-h-scroll" style="height: 650px">
        <ul class="style-m-list clearfix">
          <li v-for="style in templateStyleList">
            <div class="style-m-item">
              <div class="sm-i-body">
                <div class="sm-i-img">
                  <img :src="style.imageUrl || './img/style-default-ico.png'" alt="sampleImage">
                  <div class="sm-i-hover">
                    <div class="vertical-middle">
                      <div class="middle-cell">
                        <button v-show="templateStyleCheckId === '' ||
                         templateStyleCheckId === style.code" @click="checkStyle(style)"
                          class="btn btn-primary">选择</button> 
                        <button v-show="templateStyleCheckId != '' && templateStyleCheckId != style.code"
                          @click="unCheckStyle" class="btn btn-primary">取消选择</button>
                        <button @click="preview(style)" class="btn btn-info">预览</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sm-i-txt">
                  <p>{{style.styleCode}}</p>
                  <p>{{style.name}}</p>
                </div>
              </div>
            </div>
          </li>
          <li v-show="templateStyleList.length === 0">
            <p>没有可选的来源风格</p>
          </li>
        </ul>
      </div>
  </modal>
  <div class="box-body clearfix">
    <div class="form-horizontal">
      <form name="orderDetail">
        <div class="form-group" :class="{'has-error': customerRequired}">
          <label class="control-label fixed-width">
            <span class="text-danger">*</span>客户
            </label>
          <div class="col-sm-8 col-md-7 col-lg-6 mb15">
            <el-select class="full-width" v-model="mutableOrderData.useEnterprise.id" placeholder="请选择客户">
              <el-option v-for="(item, index) in customerList" :key="index" :label="item.fullName" :value="item.id">
              </el-option>
            </el-select>
            <span class="help-block tip-margin" v-show="customerRequired">请选择客户</span>
          </div>
        </div>
        <div class="form-group" :class="{'has-error': orderNoRequired}">
          <label for="orderNo" class="control-label fixed-width"><span class="text-danger">*</span>工单编号</label>
          <div class="col-sm-8 col-md-7 col-lg-6 mb15">
            <input type="text" class="form-control" name="orderNo" maxlength="60" @keyup="testOrderNo" required id="orderNo" v-model.trim="mutableOrderData.no"
              placeholder="工单编号">
              <span class="help-block" v-show="orderNoRequired">样板编号为空</span>
          </div>
        </div>

        <div class="form-group" :class="{'has-error': templateRequired}">
          <label class="control-label fixed-width">样板</label>
          <div class="col-sm-8 col-md-7 col-lg-6 mb15">
            <el-select class="full-width" v-model="mutableOrderData.sourceSite.id" placeholder="请选择客户">
              <el-option v-for="(item, index) in templateList" :key="index" :label="item.siteName" :value="item.id">
              </el-option>
            </el-select>
            <span class="help-block tip-margin" v-show="templateRequired">请先选择样板</span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label fixed-width">风格</label>
          <div class="col-sm-8 col-md-7 col-lg-6">
            <div class="thumb-ico">
              <div class="style-m-item pull-left"
               v-for="style in mutableOrderData.siteStyle">
                <div class="sm-i-body">
                  <div class="sm-i-img">
                    <img :src="style.imageUrl || './img/style-default-ico.png'" alt="image">
                    <div class="sm-i-hover">
                      <div class="vertical-middle">
                        <div class="middle-cell">
                          <div class="plr15">
                            <div class="col-xs-4">
                              <a @click="openTemplateModal" class="thumb-btn"><span><i class="fa fa-pencil"></i></span><br>更换</a>
                            </div>
                            <div class="col-xs-4">
                              <a @click="preview(style)" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                            </div>
                            <div class="col-xs-4">
                              <a @click="deleteStyle(style)" class="thumb-btn"><span><i class="fa fa-trash"></i></span><br>删除</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sm-i-txt">
                    <p>编号：{{style.styleCode}}</p>
                    <p>名称：{{style.name}}</p>
                  </div>
                </div>
              </div>
              <div class="style-m-item pull-left">
                <div class="sm-i-body">
                  <div class="sm-i-img">
                    <img :src="'./img/style-default-ico.png'" alt="default">
                    <div class="sm-i-hover">
                      <div class="vertical-middle">
                        <div class="middle-cell">
                          <div>
                            <a href class="new-thumb" @click.prevent="openTemplateModal">
                              <i class="fa fa-plus fa-3x"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="form-group" :class="{'has-error': orderNoRequired}">
          <label for="orderNo" class="control-label fixed-width"><span class="text-danger"></span>网站</label>
          <div class="col-sm-8 col-md-7 col-lg-6 mb15">
            <input type="text" class="form-control"
                 :value="mutableOrderData.targetSite.siteCode + ' ' + mutableOrderData.targetSite.siteName"
                 placeholder="网站" readonly>
          </div>  
        </div>

        <div class="form-group">
        <label class="control-label fixed-width">状态</label>
        <div class="col-sm-8 col-md-7 col-lg-6 mb15">
          <div class="radio-inline">
            <label class="iradio-nav" v-if="mutableOrderData.status === 0">
              <div class="iradio iradio-circle iradio-primary checked">
                <span class="iCheck-ico"></span>
              </div>
              <span class="iradio-txt">未生成</span>
            </label>
            <label class="iradio-nav" v-if="mutableOrderData.status === 1">
              <div class="iradio iradio-circle iradio-primary checked">
                <span class="iCheck-ico"></span>
              </div>
              <span class="iradio-txt">设计中</span>
            </label>
            <label class="iradio-nav" v-if="mutableOrderData.status === 2">
              <div class="iradio iradio-circle iradio-primary checked">
                <span class="iCheck-ico"></span>
              </div>
              <span class="iradio-txt">已完成</span>
            </label>
          </div>
        </div>
      </div>

      </form>
    </div>
  </div>
  </div>
</template>

<style lang="less">
  .tip-margin {
    padding-top: 5px;
  }
  
  .full-width {
    width: 100%;
  }
</style>


<script>
  import Vue from 'vue';
  import {
    mapGetters
  } from 'vuex';

  export default {
    activated() {
      console.log(this.mutableOrderData);
      this.orderNoRequired = false;
    },
    data() {
      return {
        templateList: [],
        orderNoRequired: false,
        showChooseTpl: false,
        templateStyleList: [],
        templateStyleChoose: {},
        templateStyleCheckId: ''
      };
    },
    watch: {

    },
    methods: {
      checkStyle(style) {
        this.templateStyleChoose = style;
        this.templateStyleCheckId = style.id;
        
      },
      unCheckStyle() {
        this.templateStyleCheckId = '';
        this.templateStyleChoose = undefined;
      },
      deleteStyle(style) {
        this.templateStyleCheckId = '';
        this.templateStyleChoose = undefined;
        this.$set(this.mutableOrderData, 'siteStyle', []);
        /*const index = this.mutableOrderData.siteStyle.findIndex(orderStyle => {
          return orderStyle.id === style.id;
        });
        console.log(index);
        if(index != -1){
          
          this.$set(this.mutableOrderData.siteStyle, index, undefined);
        }*/
      },
      preview(style) {
        const url = '/cms/publish/preview?sid=' + style.code;
        window.open(url);
      },
      openTemplateModal() {
        if (this.mutableOrderData.sourceSite.id === '00000000-0000-0000-0000-000000000000') {
          return
        }
        this.showChooseTpl = true;
        this.getTemplateMallStyle();
      },
      confirmTpl() {
        if(_.isUndefined(this.mutableOrderData.siteStyle) ||　_.isNull(this.mutableOrderData.siteStyle)){
          this.$set(this.mutableOrderData, 'siteStyle', []);
        }
        if(_.isUndefined(this.templateStyleChoose)){
          this.$set(this.mutableOrderData, 'siteStyle', []);
        }else{
          this.$set(this.mutableOrderData.siteStyle, 0, this.templateStyleChoose);
        }
        this.showChooseTpl = false;
      },
      cancelTpl() {
        this.showChooseTpl = false;
      },
      getPlatFormTemplateQuery() {
        this.cmsApi.templateAndSite.getPlatFormTemplateQuery({
          pageindex: 1,
          pagesize: 500
        }).then(res => {
          if (!res.ok) {
            return
          }
          return res.json();
        }).then(data => {
          data.unshift({ id: '00000000-0000-0000-0000-000000000000', siteName: '请选择' });
          this.templateList = data;
        });
      },
      testOrderNo() {
        this.orderNoRequired = this.mutableOrderData.no === '';
      },
      getTemplateMallStyle() {
        const query = {
          pageindex: 1,
          pagesize: 500,
          keyword: '',
          siteid: this.mutableOrderData.sourceSite.id
        };
        this.cmsApi.style.getTemplateMallStyle(query).then(res => {
          return res.json();
        }).then(data => {
          this.templateStyleList = data.list;
        });
      }
    },
    computed: {
      ...mapGetters(['cmsApi', 'customerList', 'currentOrderData']),
      mutableOrderData() {
        return Object.assign({}, this.currentOrderData);
      },
      customerRequired() {
        return _.isUndefined(this.mutableOrderData.useEnterprise) ||
          _.isUndefined(this.mutableOrderData.useEnterprise.id);
      },
      templateRequired() {
        console.log(this.mutableOrderData.sourceSite);
        return _.isUndefined(this.mutableOrderData.sourceSite) ||
          this.mutableOrderData.sourceSite.id === '00000000-0000-0000-0000-000000000000';
      }
    },
    mounted() {
      this.getPlatFormTemplateQuery();
    },
    components: {

    }
  }

</script>
