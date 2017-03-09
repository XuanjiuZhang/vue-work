<template>
  <div class="instr-section">
    <h4 class="t-exam-title">
      <button class="btn btn-link pull-right" @click="toggleShow">
        <span v-show="show">收起</span>
        <span v-show="!show">展开</span>
        <i class="fa fa-lg" :class="{'fa-angle-up': show, 'fa-angle-down': !show}"></i>
      </button>
    </h4>
    <div v-show="show">
      <p class="size-lg">下面的例子显示"新闻"栏目下的内容图片，共显示3幅。 </p>
      <div class="example-wrap">
        <div class="example-list">
          <a href="/getting-started/index.html">什么是 STL语言</a>
          <br>
          <a href="/getting-started/index.html">什么是 STL语言</a>
          <br>
        </div>
        <div class="bef-compile">
          <code-prettify :content="code" :additionClassNames="additionClassNames"></code-prettify>
        </div>
        <!--<pre class="bef-compile">-->
        <!--<ol class="linenums"><li class="L0"><span class="pln">    </span><span class="tag">&lt;stl:contents&gt;</span></li><li class="L1"><span class="pln">    		</span><span class="tag">&lt;stl:a&gt;&lt;stl:content</span><span class="pln"> </span><span class="atn">type</span><span class="pun">=</span><span class="atv">"Title"</span><span class="tag">&gt;&lt;/stl:content&gt;&lt;/stl:a&gt;</span></li><li class="L2"><span class="pln">    </span><span class="tag">&lt;/stl:contents&gt;</span></li></ol>-->
        <!--</pre>-->
      </div>
      <p class="size-lg">解析后的HTML代码:</p>
      <div class="example-wrap">
        <Code-prettify :content="code"></Code-prettify>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CodePrettify from './CodePrettify.vue';
  export default {
    watch: {
    },

    methods: {
      toggleShow() {
        this.show = !this.show;
      }
    },

    mounted(){
      
    },

    data() {
      return {
        code: `    The lang-* class specifies the language file extensions.
    File extensions supported by default include:
      "bsh", "c", "cc", "cpp", "cs", "csh", "cyc", "cv", "htm", "html", "java",
      "js", "m", "mxml", "perl", "pl", "pm", "py", "rb", "sh", "xhtml", "xml",
      "xsl".
      <div class="kkssk">
        <ul>
          <li>test html li 1</li>
          <li>test html li 2</li>
        </ul>
      </div>`,
        additionClassNames: ['bef-compile'],
        show: false
      };
    },
    components: {
      CodePrettify
    }
  };
</script>
