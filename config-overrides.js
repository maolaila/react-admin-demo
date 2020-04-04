const { override, fixBabelImports,addLessLoader } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   // 使用less-loader对源码的样式进行覆盖
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {'@primary-color': '#1DA57A'}
   })
 );