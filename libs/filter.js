(function() {
    var Filter = function(options){
        options = options || {};
        this.placeHolder = options.placeHolder || '*';
        this.englishList = [].concat.apply(require('badwords-list').array, options.englishList || []);
        this.chineseList = [].concat
            .apply(require('./badWordsChinese.json').words, options.chineseList || [])
            .sort(function(a, b){return b.length - a.length;});
    };

    Filter.prototype = {
        isProfane: function(string){
            var i;
            // Chinese part
            var length = this.chineseList.length;
            for (i = (length - 1); i >= 0; i--) {
                if (string.indexOf(this.chineseList[i]) > -1) {
                    return true;
                }
            }
            // English part
            var words = string.split(" ");
            for (i = 0; i < words.length; i++) {
                var word = words[i].toLowerCase();
                if (this.englishList.indexOf(word) > -1) {
                    return true;
                }
            }
            return false;
        },
        replaceWord: function(string, target){
            var t = "", i;
            for(i=0; i < target.length; i++){
                t += this.placeHolder;
            }
            return string.replace(new RegExp(target, 'g'), t);
        },
        cleanWord: function(word){
            var t = "", i;
            for(i=0; i < word.length; i++){
                t += this.placeHolder;
            }
            return t;
        },
        clean: function(string){
            var i;
            // Chinese part
            var length = this.chineseList.length;
            for (i = 0; i < length; i++) {
                if (string.indexOf(this.chineseList[i]) > -1) {
                    string = this.replaceWord(string, this.chineseList[i]);
                }
            }
            // English part
            var words = string.split(" ");
            for (i = 0; i < words.length; i++) {
                var word = words[i].toLowerCase();
                if (this.englishList.indexOf(word) > -1) {
                    words[i] = this.cleanWord(words[i]);
                }
            }
            return words.join(' ');
        }
    };

    module.exports = Filter;
}());