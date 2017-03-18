<template>
  <modal title="Modal Title" :show.sync="modalData.show" showHeader="false" showFooter="false">
    <div class="c-modal sweet-modal">
      <div class="sweet-body">
        <div class="icon warning pulseWarning" style="display: block;"> 
          <span class="body pulseWarningIns"></span> <span class="dot pulseWarningIns"></span>
        </div>
        <h3>{{ modalData.contentText }}</h3>
        <p class="text-muted" style="display: block;"></p>
        <div class="sweet-modal-footer">
          <button ng-show="$ctrl.openConfig.negativeButtonText"
            class="cancel btn btn-default" tabindex="2"
            style="display: inline-block;"
              @click="closeTip">{{ modalData.cancelText }}</button> 
          <button class="confirm btn btn-warning" tabindex="1"
            style="display: inline-block;" @click="comfirmTip">{{ modalData.confirmText }}</button>            
        </div>
      </div>
    </div>
    <div slot="header"></div>
    <div slot="title"></div>
    <div slot="footer"></div>
  </modal>
</template>


<script>
import Vue from 'vue';
import {
    mapGetters
  } from 'vuex';

export default {
  props: ['modalData'],
  data(){
    return {
    };
  },
  methods: {
    comfirmTip() {
      this.$emit('ok');
    },
    closeTip() {
      this.$emit('cancel');
    }
  },
  computed: {
  },
  mounted() {
    console.log(this.modalData);
  },
  components: {
  }
}
</script>
