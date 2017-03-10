<template>
  <div class="tag-nav">
    <div class="tag-n-list" ref="taglist">
      <div style="width: 5000px;">
        <transition-group tag="ul" name="slide-fade"
         class="nav nav-tabs animated-move"
          ref="navUl"
          :style="{transform: `translateX(${-navDeltaX}px)`}">
          <li v-for="(file, index) in opendFiles" :key="file.id" :class="{active: currentFileIndex === index}">
            <a href @click.prevent="showFileContent(index)">
              <span class="tag-name">{{ file.label }}</span>
              <i class="close-icon" @click.prevent.stop="closeFile(file)">╳</i>
            </a>
          </li>
        </transition-group>
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
            <a href @click.prevent="showFileContent(index)">{{ file.label }}</a> 
          </li>
        </ul>
      </transition>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
  export default {
    watch: {
      currentFileIndex(currentFileIndex){
        Vue.nextTick(() => {
          if(currentFileIndex === 0){
            this.navDeltaX = 0;
            return;
          }
          const taglistWidth = this.$refs.taglist.offsetWidth;
          const liArr = Array.from(this.$refs.navUl.$el.childNodes);
          const currentLiWidth = liArr[currentFileIndex].offsetWidth;
          var preWidth = 0;
          const liWidth = liArr.reduce((item1, item2, index) => {
            if(currentFileIndex === index){
              preWidth = item1;
            }
            return item1 + item2.offsetWidth;
          }, 0);

          if(preWidth + currentLiWidth + this.toggleDropDownWidth - this.navDeltaX > taglistWidth || preWidth < this.navDeltaX){
            let minMove = 0;
            liArr.some((li) => {
              minMove += li.offsetWidth;
              return preWidth + currentLiWidth + this.toggleDropDownWidth - minMove <= taglistWidth;
            });
            this.navDeltaX = minMove;
          }
          
        });
      } 
    },

    methods: {
      ...mapMutations(['showFileContent', 'closeFile']),
      toggleOpenDropDown(){
        this.openDropDown = !this.openDropDown;
      },
    },

    computed: {
      ...mapGetters(['opendFiles', 'currentFileIndex']),
      childNodes(){
        console.log(_.values(this.$refs));
        return this.currentFileIndex;
      }
    },

    mounted(){
      
    },

    data() {
      return {
        showDropDown: true,
        openDropDown: false,
        navDeltaX: 0,
        toggleDropDownWidth: 46
      };
    }
  };
</script>
