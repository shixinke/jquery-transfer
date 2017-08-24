# jquery transfer

一个使用jquery实现的穿梭框插件

## 文档目录

- [插件效果](#插件效果)
- [插件基本用法](#插件基本用法)
- [插件参数](#插件参数)
- [致谢](#致谢)
- [作者](#作者)


## 插件效果

基本用法：

![基本用法](https://github.com/shixinke/jquery-transfer/blob/master/screenshots/basic.png)

选项过滤：

![选项过滤](https://github.com/shixinke/jquery-transfer/blob/master/screenshots/search.png)

## 插件依赖

- jquery
- bootstrap（依赖bootstrap部分样式）

## 插件基本用法

    $('#container').transfer({
		soruce:'#source',
        target:'#target'
    });

## 插件参数

<table>
   <tr>
		<th>参数名</th>
        <th>说明</th>
        <th>默认值</th>
   </tr>
   <tr>
       <td>itemTpl</td>
       <td>每个选项模板内容</td>
       <td></td>
   </tr>
    <tr>
       <td>source</td>
       <td>第一个下拉框选择器</td>
       <td>select:first</td>
   </tr>
   <tr>
       <td>sourceTtitle</td>
       <td>列表标题</td>
       <td>列表1</td>
   </tr>
   <tr>
       <td>target</td>
       <td>第二个下拉框选择器</td>
       <td>select:last</td>
   </tr>
   <tr>
       <td>targetTitle</td>
       <td>列表标题</td>
       <td>列表2</td>
   </tr>
    <tr>
       <td>iconPrefix</td>
       <td>字体图标前缀</td>
       <td>iconfont</td>
   </tr>
   <tr>
       <td>iconSearch</td>
       <td>搜索图标</td>
       <td>icon-search</td>
   </tr>
   <tr>
       <td>iconLeft</td>
       <td>向左图标</td>
       <td>icon-arrow-left</td>
   </tr>
   <tr>
       <td>iconRgiht</td>
       <td>向右图标</td>
       <td>icon-arrow-right</td>
   </tr>
</table>

## 致谢

- 插件样式采用了ElementUI的穿梭框插件样式
- 感谢bootstrap-transfer插件为开发提供了思路

## 作者

author : shixinke <ishixinke@qq.com>

website : [http://www.shixinke.com](http://www.shixinke.com)
