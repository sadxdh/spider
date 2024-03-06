function generateDeviceFingerprint() {

  var fingerprint = '';
  // 收集设备特征信息
  var userAgent = navigator.userAgent;
  var screenResolution = window.screen.width + 'x' + window.screen.height;
  var language = navigator.language;
  var plugins = '';
  for (var i = 0; i < navigator.plugins.length; i++) {
    plugins += navigator.plugins[i].name + ',';
  }
  // 统一化特征数据
  var normalizedData = userAgent + screenResolution + language + plugins;
  // 哈希特征数据
  fingerprint = md5(normalizedData); // 使用MD5算法进行哈希处理，需要引入MD5算法库
  return fingerprint;
}
// 示例使用了MD5.js库，需要引入相应的库文件

<script src="md5.js"></script>
console.log(generateDeviceFingerprint())

