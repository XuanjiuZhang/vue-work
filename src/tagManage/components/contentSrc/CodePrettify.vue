<template>
  <div v-html="codePretty">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      additionClassNames: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    watch: {
    },

    methods: {
    },

    mounted(){
      window.PR.prettyPrint();
    },

    computed: {
      codePretty() {
        const addition = this.additionClassNames.join(' ');
        const content = this.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre class="prettyprint linenums ${addition} lang-html">${content}</pre>`;
      }
    },

    data() {
      return {
      };
    }
  };
</script>
