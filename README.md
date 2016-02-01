# bad-words-chinese
A dirty word filter module supports Chinese and English
這個模組可以偵測與過濾中、英文髒話。

## Installation 安裝方式
```
npm install bad-words-chinese
```

## Usage 使用方法
```
var Filter = require('bad-words-chinese'),
  filter = new Filter();

console.log(filter.clean("I'm CEO, Bitch")); //I'm CEO, *****
console.log(filter.clean("我是執行長，婊子")); //我是執行長，**
console.log(filter.isProfane("I'm CEO")); // false
console.log(filter.isProfane("我是執行長，婊子"));   // true
```

### Placeholder Overrides 變更符號
```
var Filter = require('bad-words');
var customFilter = new Filter(
  { 
    placeHolder: 'x'
  }
);

customFilter.clean('I'm CEO, Bitch'); //I'm CEO, xxxxx
```

### Add words to the blacklist 加入髒話關鍵字
```
var filter = new Filter(
  { 
    englishList: ['big', 'fat', 'pig'], 
    chineseList: ['大', '胖', '豬'] 
  }
); 

console.log(filter.clean("You are a big fat pig")); //You are a *** *** ***
console.log(filter.clean("你這隻大胖豬")); //你這隻***

```

## Testing 測試方法
```
npm test
```

##Release Notes 更新紀錄
- v1.0.0 / Feb 1 2016: First release

## License 授權

The MIT License (MIT)

Copyright (c) 2016 Peiyu Chen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the"Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.