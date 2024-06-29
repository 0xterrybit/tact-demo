const fs = require('fs');
const path = require('path');

// import * as fs from 'fs';
// import path from 'path'


// 要处理的文件夹
const dirPath = path.join(__dirname, 'output');

console.log('content:', 'content')

    
const filePath = path.join(__dirname, 'output/rns_did.ts');
let content = fs.readFileSync(filePath, 'utf-8');


 // 匹配所有以 "async function" 和 "function" 作为行开始的行
 const asyncFunctionRegex = /^(async function\s+\w+\([^)]*\)\s*)/gm;
 const functionRegex = /^(function\s+\w+\([^)]*\)\s*)/gm;

content = content.replace(functionRegex, '/* istanbul ignore next */\n$1');
content = content.replace(asyncFunctionRegex, '/* istanbul ignore next */\n$1');

fs.writeFileSync(filePath, content, 'utf-8');


console.log('Post-processing complete.');