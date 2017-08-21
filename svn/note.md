
# svn不常用命令记录

### svn添加全局忽略
<pre>
cd ~/.subversion
vim config
// modify global-ignores
</pre>  

### svn忽略node_module文件夹
<pre>
svn propset svn:ignore 'node_module' .
svn commit -m 'ignore node_module'
</pre>

### svn删除忽略
<pre>
svn proplist
svn propget svn:ignore
svn propdel svn:ignore
</pre>