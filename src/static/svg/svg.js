const fs = require('fs');
const path = require('path');

console.log('--------------开始转换啦--------------');
/**
 * 当前文件夹地址
 */
const root = path.dirname(__filename);
const fileList = fs
  .readdirSync(root)
  .filter(o => {
    return o.endsWith('.svg');
  })
  .map(o => {
    return {
      name: o.replace('.svg', ''),
      filePath: path.resolve(root, o)
    };
  });

let result = '/* eslint-disable */ ';
let exportValue = '';
fileList.forEach(file => {
  exportValue += `${file.name},`;
  result += `let ${file.name} = "${filePathToBase64(file.filePath)}";`;
});
result += `export { ${exportValue} };`;
function filePathToBase64(path) {
  return `data:image/svg+xml;base64,${fs
    .readFileSync(path)
    .toString('base64')}`;
}

//如果是 JavaScript 开发，把 index.ts 换成 index.js
fs.writeFileSync(path.resolve(root, 'index.ts'), result);
console.log('--------------转换完成啦--------------');
