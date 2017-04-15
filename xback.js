/**
 * 用于捕获物理键的Back事件
 * 使用方法：
 * import XBack from 'xback.js'
 * var xBack = XBack.init(window, function () {  // 挂载钩子
 *    // back event
 * })
 * xBack.uninit() // 注销钩子
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : (global.XBack = factory());
})(this, function () {
  return {
    init : function (win, listener) {
      var XBack = {}
      var _history = []
      var _listener = null
      var _win = win
      var elm = _win.document.createElement('span')
      var STATE = 'xBack'
      var PLACEHOLDER = 'PLACEHOLDER'
      var record = () => {
        // console.log('XBack record')
        console.log(_history)
        if (_win.history.state === PLACEHOLDER) return
        if (_history[_history.length - 1] !== _win.location.href) _history.push(_win.location.href)
        _win.history.replaceState(STATE, null, _win.location.href)
        _win.history.pushState(PLACEHOLDER, null, _win.location.href)
      }
      XBack.back = () => {
        switch (_win.history.state) {
          case PLACEHOLDER:
            _win.history.go(-2)
            break
          case STATE:
          default:
            _win.history.go(-1)
        }
        _history.pop()
      }
      var fire = () => {
        var event = _win.document.createEvent('Events')
        event.initEvent(STATE, false, false)
        event.back = XBack.back
        elm.dispatchEvent(event)
      }
      var hooker = (event) => {
        event.state === STATE && fire()
        setTimeout(record, 10) // 降低record优先级，避免history的state未弹出就压入记录导致APP返回死循环
      }
      XBack.listen = (listener) => {
        if (_listener !== null) {
          elm.removeEventListener(STATE, _listener, false)
        }
        _listener = listener
        elm.addEventListener(STATE, listener, false)
      }
      XBack.uninit = () => {
        // console.log('XBack uninit')
        _win.removeEventListener('popstate', hooker)
        _history.forEach(function(item) {
          _win.history.pushState(null, null, item)
        })
      }
      // console.log('XBack init')
      _win.addEventListener('popstate', hooker)
      record()
      if (typeof listener === 'function') {
        XBack.listen(listener)
      }
      return XBack
    }
  }
})