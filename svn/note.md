<h1>svn不常用命令记录</h1>

<h3>svn添加全局忽略</h3>
<ol>
  <li>cd ~/.subversion</li>
  <li>vim config</li>
  <li>修改global-ignores</li>
</ol>

<h3>svn忽略node_module文件夹</h3>
<ol>
  <li>svn propset svn:ignore 'node_module' .</li>
  <li>svn commit -m 'ignore node_module'</li>
</ol>

<h3>svn删除忽略</h3>
<ol>
  <li>svn proplist</li>
  <li>svn propget svn:ignore</li>
  <li>svn propdel svn:ignore</li>
</ol>