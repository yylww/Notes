# svn不常用命令记录

### svn添加全局忽略
1. cd ~/.subversion
2. vim config
3. 修改global-ignores

### svn忽略node_module文件夹
1. svn propset svn:ignore 'node_module' .
2. svn commit -m 'ignore node_module'

### svn删除忽略
1. svn proplist
2. svn propget svn:ignore
3. svn propdel svn:ignore