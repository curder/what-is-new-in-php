"use strict";(self.webpackChunkwhat_is_new_in_php=self.webpackChunkwhat_is_new_in_php||[]).push([[654],{931:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-3182285e",path:"/7.0/grouped_imports/",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"命名空间引用优化",slug:"命名空间引用优化",children:[]}],filePathRelative:"7.0/grouped_imports/README.md",git:{updatedTime:1629295643e3,contributors:[]}}},21:(n,s,a)=>{a.r(s),a.d(s,{default:()=>e});const p=(0,a(252).uE)('<h2 id="命名空间引用优化" tabindex="-1"><a class="header-anchor" href="#命名空间引用优化" aria-hidden="true">#</a> 命名空间引用优化</h2><p>在之前的php版本语法的写法是：</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Animal</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Person</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>php7新语法写法是：</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">use</span> App\\<span class="token punctuation">{</span>Animal<span class="token punctuation">,</span> Person<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment"># 或者将类换行</span>\n<span class="token keyword">use</span> App\\<span class="token punctuation">{</span>\n    Animal<span class="token punctuation">,</span>\n    Person\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment"># 如果命名空间下还有其他后缀的命名空间</span>\n<span class="token keyword">use</span> App\\<span class="token punctuation">{</span>\n    Animal<span class="token punctuation">,</span>\n    Person<span class="token punctuation">,</span>\n    Models\\User\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>',5),e={render:function(n,s){return p}}}}]);