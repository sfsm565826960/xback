# XBack

用于捕获历史返回、物理键返回事件

# Usage

1. 导入，支持CommonJS、AMD、ES6的import
```
<script src="xback.js"></script>

import XBack from 'xback.js'

var XBack = require('xback.js')
```
2. 注册XBack和监听事件
```
var xBack = XBack.init(window, function (event) {
  // TODO XBack Event, eg:
  confirm('back?') && event.back()
})
```
3. 代码返回
```
xBack.back()
```
4. 更改监听事件
```
xBack.listen(function (event) {
  // TODO XBack Event, eg:
  confirm('back?') && event.back()
})
```
5. 注销XBack
```
xBack.uninit()
```

# Note

1. 原理：利用History API实现，若浏览器不支持则无法实现。
2. 启动XBack后，每一次地址变化都会产生两个历史记录（地址相同，记录为xback和placeholder）
```
例如：访问了 example.html#1 和 example.html#2
历史记录：
state         url
PLACEHOLDER   example.html#2
XBACK         example.html#2
PLACEHOLDER   example.html#1
XBACK         example.html#1
```
3. 注销XBack后，会压入历史记录，使浏览器正常返回。
```
例如：访问了 example.html#1 和 example.html#2 后，注销了XBack
历史记录：
state         url
null          example.html#2
null          example.html#1
PLACEHOLDER   example.html#2
XBACK         example.html#2
PLACEHOLDER   example.html#1
XBACK         example.html#1
```
> 不足：原来的历史记录被保留。