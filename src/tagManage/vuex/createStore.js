import Vuex from 'Vuex';
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    treeData: {
      tree: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    },
    opendFiles: [],
    currentFileIndex: 2
  },
  mutations: {
    openNav (state, index) {
      state.currentFileIndex = index;
    },
    closeNav (state, index) {
      if(state.opendFiles.length - 1 === state.currentFileIndex){
        state.currentFileIndex--;
      }
      state.opendFiles.splice(index, 1);
    },
    openFile (state, file) {
      state.opendFiles.push(file);
      state.currentFileIndex = state.opendFiles.length - 1;
    },
    closeFile (state, file) {
      const index = state.opendFiles.findIndex(ofile => {
        return ofile.id === file.id;
      });
      if(state.opendFiles.length - 1 === state.currentFileIndex){
        state.currentFileIndex--;
      }
      state.opendFiles.splice(index, 1);
    }
  },
  getters: {
    treeData: state => {
      return state.treeData
    },
    opendFiles: state => {
      return state.opendFiles
    },
    currentFileIndex: state => {
      return state.currentFileIndex
    }
  },
  actions: {
    increment (context) {
      setTimeout(() => {
        context.commit('increment', {amount: 10})
      }, 1000);
    }
  }
});

export default store;
