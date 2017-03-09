<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      icon="search"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="treeData.tree"
      :props="treeData.defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      ...mapMutations(['openFile', 'closeFile']),
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },

    mounted(){
      this.$refs.tree2.$on('node-click', (obj) => {

        console.log(obj);
      });
      this.$refs.tree2.$on('node-leaf-toggleClick', (currentLeafOpen, nodeData) => {
        if(currentLeafOpen){
          this.openFile(nodeData);
        }else{
          this.closeFile(nodeData);
        }
        console.log(currentLeafOpen);
        console.log(nodeData);
      });
    },

    computed: {
      ...mapGetters(['treeData'])
    },

    data() {
      return {
        filterText: ''
      };
    }
  };
</script>
