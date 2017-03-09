<template>
  <div class="tag-nav">
    <div class="tag-n-list">
      <div style="width: 5000px;">
        <transition-group tag="ul" name="slide-fade" class="nav nav-tabs animated-move">
          <li v-for="nav in 5" :key="nav" :class="{active: nav === 1}">
            <a href @click.prevent>
              <span class="tag-name">name</span>
              <i class="close-icon">╳</i>
            </a>
          </li>
        </transition-group>
        <!--<ul class="nav nav-tabs animated-move" ng-style="ulStyle">
          <li ng-repeat="nav in data.array track by nav.id" ng-class="{active: $index === data.currentIndex}">
            <a href ng-click="goToNav($index)">
              <span class="tag-name">name</span>
              <i class="close-icon" ng-click="closeNav($index)">╳</i>
            </a>
          </li>
        </ul>-->
      </div>
    </div>
    <div class="more-list dropdown" :class="{'open': openDropDown}" v-show="showDropDown">
      <!--此更多按钮需在排列不下时才出现-->
      <a class="drop-btn" href @click.prevent="toggleOpenDropDown">
        <i class="tag-icon tag-more-list"></i>
      </a>
      <ul class="dropdown-menu dropdown-menu-right">
        <li v-for="nav in 5" :key="nav">
          <a href @click.prevent="goToNav">name</a>
        </li>
        <!--<li ng-repeat="nav in data.array track by nav.id">
          <a href ng-click="goToNav($index)">name</a>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    watch: {
    },

    methods: {
      toggleOpenDropDown(){
        this.openDropDown = !this.openDropDown;
      }
    },

    mounted(){
      
    },

    data() {
      return {
        showDropDown: true,
        openDropDown: false
      };
    }
  };
</script>
