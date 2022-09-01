import{_ as t,r as o,o as c,e as l,b as n,a as p,F as r,d as s,f as e}from"./app.4c9992e8.js";const i={},u=n("h1",{id:"php-8-1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#php-8-1","aria-hidden":"true"},"#"),s(" PHP 8.1")],-1),k={id:"\u679A\u4E3E",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#\u679A\u4E3E","aria-hidden":"true"},"#",-1),b=s(),m={href:"https://www.php.net/releases/8.1/zh.php#enumerations",target:"_blank",rel:"noopener noreferrer"},g=s("\u679A\u4E3E"),h=e(`<p>\u5728 PHP \u4E2D\uFF0C \u679A\u4E3E\u662F\u4E00\u79CD\u7279\u6B8A\u7C7B\u578B\u7684\u5BF9\u8C61\u3002Enum \u672C\u8EAB\u662F\u4E00\u4E2A\u7C7B\uFF08Class\uFF09\uFF0C \u5B83\u7684\u5404\u79CD\u6761\u76EE\uFF08case\uFF09\u662F\u8FD9\u4E2A\u7C7B\u7684\u5355\u4F8B\u5BF9\u8C61\uFF0C\u610F\u5473\u7740\u4E5F\u662F\u4E2A\u6709\u6548\u5BF9\u8C61 \u2014\u2014 \u5305\u62EC\u7C7B\u578B\u7684\u68C0\u6D4B\uFF0C\u80FD\u7528\u5BF9\u8C61\u7684\u5730\u65B9\uFF0C\u4E5F\u53EF\u4EE5\u7528\u5B83\u3002</p><p>\u6700\u5E38\u89C1\u7684\u679A\u4E3E\u4F8B\u5B50\u662F\u5185\u7F6E\u7684 boolean \u7C7B\u578B\uFF0C \u8BE5\u679A\u4E3E\u7C7B\u578B\u6709\u4E24\u4E2A\u6709\u6548\u503C true \u548C false\u3002 Enum \u4F7F\u5F00\u53D1\u8005\u80FD\u591F\u4EFB\u610F\u5B9A\u4E49\u51FA\u7528\u6237\u81EA\u5DF1\u7684\u3001\u8DB3\u591F\u5065\u58EE\u7684\u679A\u4E3E\u3002</p><h3 id="\u57FA\u672C\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u7528\u6CD5" aria-hidden="true">#</a> \u57FA\u672C\u7528\u6CD5</h3><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">enum</span> <span class="token class-name-definition class-name">SortOrder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">ASC</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">DESC</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-definition function">query</span><span class="token punctuation">(</span><span class="token variable">$fields</span><span class="token punctuation">,</span> <span class="token variable">$filter</span><span class="token punctuation">,</span> <span class="token class-name type-declaration">SortOrder</span> <span class="token variable">$order</span> <span class="token operator">=</span> <span class="token class-name static-context">SortOrder</span><span class="token operator">::</span><span class="token constant">ASC</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//</span>
<span class="token punctuation">}</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><blockquote><p>\u7531\u4E8E\u786E\u4FDD <code>$order</code> \u4E0D\u662F <code>SortOrder::ASC</code> \u5C31\u662F <code>SortOrder::DESC</code>\uFF0C\u6240\u4EE5 <code>query()</code> \u51FD\u6570\u80FD\u5B89\u5168\u5904\u7406\u3002 \u56E0\u4E3A\u5176\u4ED6\u4EFB\u610F\u503C\u90FD\u4F1A\u5BFC\u81F4 <code>TypeError</code>\uFF0C \u6240\u4EE5\u4E0D\u9700\u8981\u989D\u5916\u7684\u9519\u8BEF\u68C0\u67E5\u3002</p></blockquote><h3 id="\u9AD8\u7EA7\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u9AD8\u7EA7\u7528\u6CD5" aria-hidden="true">#</a> \u9AD8\u7EA7\u7528\u6CD5</h3><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">enum</span> <span class="token class-name-definition class-name">UserStatus</span><span class="token punctuation">:</span> <span class="token keyword type-declaration">string</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">Pending</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;P&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">Active</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;A&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">Suspended</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;S&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">CanceledByUser</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;C&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">match</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token constant">Pending</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Pending&#39;</span><span class="token punctuation">,</span>
            <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token constant">Active</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Active&#39;</span><span class="token punctuation">,</span>
            <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token constant">Suspended</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Suspended&#39;</span><span class="token punctuation">,</span>
            <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token constant">CanceledByUser</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Canceled by user&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name static-context">UserStatus</span><span class="token operator">::</span><span class="token constant">Pending</span><span class="token operator">-&gt;</span><span class="token property">name</span>     <span class="token comment">// \u83B7\u53D6\u679A\u4E3E\u540D</span>
<span class="token class-name static-context">UserStatus</span><span class="token operator">::</span><span class="token constant">Pending</span><span class="token operator">-&gt;</span><span class="token property">value</span>    <span class="token comment">// \u83B7\u53D6\u679A\u4E3E\u503C, \u6BD4\u5982\u4F8B\u5B50\u4E2D\u7684\u5B57\u7B26\u4E32</span>
<span class="token class-name static-context">UserStatus</span><span class="token operator">::</span><span class="token function">cases</span><span class="token punctuation">(</span><span class="token punctuation">)</span>           <span class="token comment">// \u83B7\u53D6\u679A\u4E3E\u5217\u8868</span>
<span class="token class-name static-context">UserStatus</span><span class="token operator">::</span><span class="token constant">Pending</span><span class="token operator">-&gt;</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// \u8C03\u7528\u679A\u4E3E\u65B9\u6CD5\u83B7\u53D6\u5BF9\u5E94\u8FD4\u56DE\u503C</span>

<span class="token comment">// \u6E32\u67D3\u4E0B\u62C9\u9009\u9879\u7ED3\u6784</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name static-context">UserStatus</span><span class="token operator">::</span><span class="token function">cases</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token variable">$case</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;&lt;option value=&quot;%s&quot;&gt;%s&lt;/option&gt;\\n&#39;</span><span class="token punctuation">,</span> <span class="token variable">$case</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">,</span> <span class="token variable">$case</span><span class="token operator">-&gt;</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// UserStatus::Pending === &#39;P&#39;; // \u9519\u8BEF\u7684\u5199\u6CD5,\u4E0D\u5E94\u8BE5\u7528\u679A\u4E3E\u503C\u8DDF\u6807\u91CF\u503C\u8FDB\u884C\u6BD4\u5BF9</span>
<span class="token comment">// UserStatus::Pending === UserStatus::from(&#39;P&#39;); // \u53EF\u4EE5\u901A\u8FC7 from \u9759\u6001\u65B9\u6CD5\u83B7\u53D6\u679A\u4E3E\u5B9E\u4F8B</span>
<span class="token comment">// UserStatus::Pending === UserStatus::tryFrom(&#39;P&#39;); // \u6216\u8005\u901A\u8FC7 tryFrom \u9759\u6001\u65B9\u6CD5\u83B7\u53D6\u679A\u4E3E\u5B9E\u4F8B\uFF0C\u5F53\u503C\u4E0D\u5B58\u5728\u65F6\u4F1A\u8FD4\u56DENULL</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><blockquote><p>\u7528\u6237\u7684\u72B6\u6001\u662F <code>UserStatus::Pending</code>\u3001 <code>UserStatus::Active</code>\u3001 <code>UserStatus::Suspended</code>\u3001 <code>UserStatus::CanceledByUser</code> \u4E2D\u7684\u4E00\u4E2A\uFF0C\u5177\u6709\u72EC\u5360\u6027\u3002 \u51FD\u6570\u53EF\u4EE5\u6839\u636E <code>UserStatus</code> \u8BBE\u7F6E\u53C2\u6570\u7C7B\u578B\uFF0C\u4EC5\u652F\u6301\u8FD9\u56DB\u79CD\u503C\u3002</p><p>\u6240\u6709\u56DB\u4E2A\u503C\u90FD\u6709\u4E00\u4E2A <code>label()</code> \u65B9\u6CD5\uFF0C\u8FD4\u56DE\u4E86\u4EBA\u7C7B\u53EF\u8BFB\u7684\u5B57\u7B26\u4E32\u3002</p><p>\u5B83\u72EC\u7ACB\u4E8E\u7B49\u540C\u4E8E\u6807\u91CF\u7684\u201C\u673A\u5668\u540D\u201D\u3002 \u673A\u5668\u540D\u7528\u4E8E\u7C7B\u4F3C\u6570\u636E\u5E93\u5B57\u6BB5\u6216 <code>HTML</code> \u9009\u62E9\u6846\u8FD9\u6837\u7684\u5730\u65B9\u3002</p></blockquote>`,8),y={id:"\u5B57\u7B26\u4E32\u952E\u6570\u7EC4\u89E3\u5305",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#\u5B57\u7B26\u4E32\u952E\u6570\u7EC4\u89E3\u5305","aria-hidden":"true"},"#",-1),f=s(),v={href:"https://www.php.net/releases/8.1/zh.php#array_unpacking_support_for_string_keyed_arrays",target:"_blank",rel:"noopener noreferrer"},w=s("\u5B57\u7B26\u4E32\u952E\u6570\u7EC4\u89E3\u5305"),P=e(`<p>PHP 7.4\u4E4B\u540E\u7248\u672C\u4E2D\u5DF2\u7ECF\u6DFB\u52A0\u901A\u8FC7\u6269\u5C55\u8FD0\u7B97\u7B26\u5BF9\u6570\u7EC4\u5185\u90E8\u8FDB\u884C\u89E3\u5305\u652F\u6301\uFF0C\u4F46\u524D\u63D0\u662F\u6570\u7EC4\u5177\u6709\u6574\u6570\u952E\u3002</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment"># PHP &gt; 7.4</span>
<span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u73B0\u5728\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u952E\u89E3\u5305\u6570\u7EC4\u3002\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment"># PHP &lt; 8.1</span>
<span class="token variable">$attributes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;My Blog&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;body&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;My blog body&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$additional</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;category_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">array_merge</span><span class="token punctuation">(</span><span class="token variable">$attributes</span><span class="token punctuation">,</span> <span class="token variable">$additional</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;title&#39; =&gt; &#39;My Blog&#39;, &#39;body&#39; =&gt; &#39;My blog body&#39;, &#39;category_id&#39; =&gt; 1]</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment"># PHP 8.1</span>
<span class="token variable">$attributes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;My Blog&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;body&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;My blog body&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$additional</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;category_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token operator">...</span><span class="token variable">$attributes</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token variable">$additional</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,5),x={id:"\u8FD4\u56DE\u7C7B\u578B-never",tabindex:"-1"},$=n("a",{class:"header-anchor",href:"#\u8FD4\u56DE\u7C7B\u578B-never","aria-hidden":"true"},"#",-1),q=s(),S={href:"https://www.php.net/releases/8.1/zh.php#never_return_type",target:"_blank",rel:"noopener noreferrer"},U=s("\u8FD4\u56DE\u7C7B\u578B "),L=n("code",null,"never",-1),H=e(`<p>\u4F7F\u7528 <code>never</code> \u7C7B\u578B\u58F0\u660E\u7684\u51FD\u6570\u6216\u65B9\u6CD5\u8868\u793A\u5B83\u4E0D\u4F1A\u8FD4\u56DE\u503C\u3002</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment"># PHP 8.1</span>
<span class="token keyword">function</span> <span class="token function-definition function">redirect</span><span class="token punctuation">(</span><span class="token keyword type-hint">string</span> <span class="token variable">$uri</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">never</span>
<span class="token punctuation">{</span>
    <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Location: &#39;</span> <span class="token operator">.</span> <span class="token variable">$uri</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;some code&#39;</span><span class="token punctuation">;</span> <span class="token comment">// Fatal error: A never-returning function must not return \u8FD9\u91CC\u4E0D\u5E94\u8BE5\u6709 return \u8BED\u53E5</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p>\u5982\u679C\u5728\u4E4B\u524D\u7248\u672C\u4E0A\u9762\u7684\u4EE3\u7801\u4E0D\u4F1A\u629B\u51FA\u5F02\u5E38\u3002</p></blockquote>`,3),C={id:"\u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u5668",tabindex:"-1"},j=n("a",{class:"header-anchor",href:"#\u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u5668","aria-hidden":"true"},"#",-1),A=s(),B={href:"https://www.php.net/releases/8.1/zh.php#new_in_initializers",target:"_blank",rel:"noopener noreferrer"},N=s("\u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u5668"),E=e(`<div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// 7.4 &lt;= PHP &lt; 8.1</span>

<span class="token keyword">interface</span> <span class="token class-name-definition class-name">Logger</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">NullLogger</span> <span class="token keyword">implements</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Service</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name type-declaration">Logger</span> <span class="token variable">$logger</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token class-name type-declaration">Logger</span> <span class="token variable">$logger</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">logger</span> <span class="token operator">=</span> <span class="token variable">$logger</span> <span class="token operator">??</span> <span class="token keyword">new</span> <span class="token class-name">NullLogger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u5BF9\u8C61\u73B0\u5728\u53EF\u4EE5\u7528\u4F5C\u9ED8\u8BA4\u53C2\u6570\u503C\u3001\u9759\u6001\u53D8\u91CF\u548C\u5168\u5C40\u5E38\u91CF\u4EE5\u53CA\u5C5E\u6027\u53C2\u6570\u3002</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment">// PHP &gt; 8.1</span>
<span class="token keyword">interface</span> <span class="token class-name-definition class-name">Logger</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">NullLogger</span> <span class="token keyword">implements</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Service</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token class-name type-declaration">Logger</span> <span class="token variable">$logger</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NullLogger</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,3),M={id:"\u7C7B\u7684\u53EA\u8BFB\u5C5E\u6027",tabindex:"-1"},z=n("a",{class:"header-anchor",href:"#\u7C7B\u7684\u53EA\u8BFB\u5C5E\u6027","aria-hidden":"true"},"#",-1),F=s(),O={href:"https://www.php.net/releases/8.1/zh.php#readonly_properties",target:"_blank",rel:"noopener noreferrer"},V=s("\u7C7B\u7684\u53EA\u8BFB\u5C5E\u6027"),T=e(`<p>\u53EA\u8BFB\u5C5E\u6027\u4E0D\u80FD\u5728\u521D\u59CB\u5316\u540E\u518D\u5BF9\u5176\u8FDB\u884C\u66F4\u6539\u3002</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment">// 7.4 &lt;= PHP &lt; 8.1</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Project</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword type-declaration">string</span> <span class="token variable">$uuid</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token keyword type-hint">string</span> <span class="token variable">$uuid</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">uuid</span> <span class="token operator">=</span> <span class="token variable">$uuid</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">uuid</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token variable">$project</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Project</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;xx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$project</span><span class="token operator">-&gt;</span><span class="token function">getUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u5728\u4E4B\u524D\u7684 PHP \u7248\u672C\u4E2D\uFF0C\u5982\u679C\u8981\u4FDD\u62A4\u7C7B\u5C5E\u6027\u4E0D\u88AB\u5916\u90E8\u91CD\u65B0\u8D4B\u503C\uFF0C\u9700\u8981\u5C06\u7C7B\u5C5E\u6027\u8BBE\u7F6E\u4E3A <code>protected</code>\uFF0C\u7136\u540E\u5728\u7C7B\u4E2D\u5B9A\u4E49\u4E00\u4E2A\u516C\u5F00\u65B9\u6CD5\u8FD4\u56DE\u8FD9\u4E2A\u79C1\u6709\u53D8\u91CF\u3002</p><p>\u5728 PHP 8.1 \u4E4B\u540E\u7684\u7248\u672C\u4E2D\u6DFB\u52A0\u4E86\u4E00\u4E2A\u5173\u952E\u5B57 <code>readonly</code> \u6765\u4FEE\u9970\u53D8\u91CF\uFF0C\u53EA\u8BFB\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment">// PHP &gt; 8.1</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Project</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token keyword type-declaration">string</span> <span class="token variable">$uuid</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token variable">$project</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Project</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;xx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$project</span><span class="token operator">-&gt;</span><span class="token property">uuid</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$project</span><span class="token operator">-&gt;</span><span class="token property">uuid</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;xxx&#39;</span><span class="token punctuation">;</span> <span class="token comment">// Cannot modify readonly property Project::$uuid</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,5);function D(I,G){const a=o("ExternalLinkIcon");return c(),l(r,null,[u,n("h2",k,[d,b,n("a",m,[g,p(a)])]),h,n("h2",y,[_,f,n("a",v,[w,p(a)])]),P,n("h2",x,[$,q,n("a",S,[U,L,p(a)])]),H,n("h2",C,[j,A,n("a",B,[N,p(a)])]),E,n("h2",M,[z,F,n("a",O,[V,p(a)])]),T],64)}var K=t(i,[["render",D],["__file","index.html.vue"]]);export{K as default};
