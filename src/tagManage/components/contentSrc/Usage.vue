<template>
  <div>
    <div class="instr-section">
      <h4 class="text-primary">标签用途</h4>
      <p>标签用途标签用途标签用途标签用途标签用途标签用途标签用途
        <br>标签用途标签用途标签用途标签用途</p>
    </div>
    <div class="instr-section">
      <h4 class="text-primary">语法格式</h4>
      <div class="grammar-format">
        <pre><span class="tag">&lt;stl:contents</span><span class="pln"> </span><span class="atn">cellPadding</span><span class="pun">=</span><span class="atv">"填充"</span><span class="pln"> </span><span class="atn">cellSpacing</span><span class="pun">=</span><span class="atv">"间距"</span><span class="pln"> </span><span class="atn">class</span><span class="pun">=</span><span class="atv">"Css类"</span><span class="pln"> </span><span class="atn">columns</span><span class="pun">=</span><span class="atv">"列数"</span><span class="pln"> </span><span class="atn">direction</span><span class="pun">=</span><span class="atv">"方向"</span><span class="pln"> </span><span class="atn">layout</span><span class="pun">=</span><span class="atv">"指定列表布局方式"</span><span class="pln"> </span><span class="atn">height</span><span class="pun">=</span><span class="atv">"整体高度"</span><span class="pln"> </span><span class="atn">width</span><span class="pun">=</span><span class="atv">"整体宽度"</span><span class="pln"> </span><span class="atn">align</span><span class="pun">=</span><span class="atv">"整体对齐"</span><span class="pln"> </span><span class="atn">itemHeight</span><span class="pun">=</span><span class="atv">"项高度"</span><span class="pln"> </span><span class="atn">itemWidth</span><span class="pun">=</span><span class="atv">"项宽度"</span><span class="pln"> </span><span class="atn">itemAlign</span><span class="pun">=</span><span class="atv">"项水平对齐"</span><span class="pln"> </span><span class="atn">itemVerticalAlign</span><span class="pun">=</span><span class="atv">"项垂直对齐"</span><span class="pln"></span></pre>
      </div>
    </div>
    <div class="instr-section">
      <h4 class="text-primary">属性列表</h4>
      <div class="table-responsive">
        <table class="table i-table">
          <thead>
          <tr>
            <td>名称</td>
            <td>英文名</td>
            <td>可取值</td>
            <td>默认值</td>
            <td width="600">描述</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>名称</td>
            <td>英文名</td>
            <td>可取值</td>
            <td>默认值</td>
            <td>
              <p class="tag-describe">显示从首页向下某个级别栏目显示从首页向下某个级别栏目显示从首页向下某个级别栏目显示从首页向下某个级别栏目显示从首页向下某个级别栏目显示从首页向下某个级别栏目显示从首页向下某个级别栏目</p>
            </td>
          </tr>
          <tr>
            <td>名称</td>
            <td>英文名</td>
            <td>可取值</td>
            <td>默认值</td>
            <td>
              <p class="tag-describe">显示从首页向下某个级别栏目显示从首页向</p>
            </td>
          </tr>
          <tr>
            <td>名称</td>
            <td>英文名</td>
            <td>可取值</td>
            <td>默认值</td>
            <td>
              <p class="tag-describe">显示从首页向下某个级别栏目显示从首页向显示从首页向下某个级别栏目显示从首页向首页向下某个级别栏目显示从首页向</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="instr-section">
      <h4 class="text-primary">注意事项</h4>
      <p>
        <code>columns</code>、<code>direction</code> 以及 <code>layout</code> 属性用于控制生成列表的HTML 标签。
        <br>
        <code>columns</code> 控制生成列表的列数，<code>direction</code> 控制生成列表的方向，<code>layout</code> 控制生成列表的HTML元素。
        <br>
        <code>layout</code> 为Table时系统使用&lt;table&gt;标签生成列表，<code>layout</code> 为Flow时系统使用&lt;span&gt;标签生成列表，默认为None，即仅循环列表项。
      </p>
      <p>
        如果需要在内容页中显示与当前内容相关的内容列表，使用 <code>isRelatedContents="true"</code> 属性，系统将根据标签判断是否相关内容。
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    watch: {
    },

    methods: {
    },

    mounted(){
      
    },

    data() {
      return {
      };
    }
  };
</script>
