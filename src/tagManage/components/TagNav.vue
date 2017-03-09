<template>
  <div class="tag-nav">
    <div class="tag-n-list">
      <div style="width: 5000px;">
        <transition-group tag="ul" name="slide-fade" class="nav nav-tabs animated-move">
          <li v-for="(file, index) in opendFiles" :key="file.id" :class="{active: currentFileIndex === index}">
            <a href @click.prevent="openNav(index)">
              <span class="tag-name">name</span>
              <i class="close-icon" @click.prevent.stop="closeNav(index)">╳</i>
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
    
    <div v-show="showDropDown" class="more-list dropdown" :class="{'open': openDropDown}">
      <!--此更多按钮需在排列不下时才出现-->
      <a class="drop-btn" href @click.prevent="toggleOpenDropDown">
        <i class="tag-icon tag-more-list"></i>
      </a>
      <transition name="list">
        <ul v-show="openDropDown" class="dropdown-menu dropdown-menu-right">
          <li v-for="(file, index) in opendFiles" :key="file.id">
            <a href @click.prevent="openNav(index)">name</a> 
          </li>
        </ul>
      </transition>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {
    watch: {
    },

    methods: {
      ...mapMutations(['openNav', 'closeNav']),
      toggleOpenDropDown(){
        this.openDropDown = !this.openDropDown;
      },
      // leaveDropDown(){
      //   this.openDropDown = false;
      // }
    },

    computed: {
      ...mapGetters(['opendFiles', 'currentFileIndex']) 
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
