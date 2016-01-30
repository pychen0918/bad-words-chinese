var Filter = require('../libs/filter');
var chai = require('chai');
var expect = chai.expect;

describe("Test dirtyWordFilter", function(){
    describe("Data validation", function(){
        var filter = new Filter();

        it("should have valid Chinese word list", function(){
            var i;
            expect(filter.chineseList.length).to.be.at.least(1);
            for(i=0;i<filter.chineseList.length;i++){
                expect(filter.chineseList[i]).to.be.a('string');
                expect(filter.chineseList[i]).to.match(/[\u4e00-\u9fff]/);
            }
        });
        it("should have valid English word list", function(){
            var i;
            expect(filter.englishList.length).to.be.at.least(1);
            for(i=0;i<filter.englishList.length;i++){
                expect(filter.englishList[i]).to.be.a('string');
                expect(filter.englishList[i]).to.match(/[a-zA-Z0-9-_]/);
            }
        });
        it("should have a valid default placeholder", function(){
            expect(filter.placeHolder).to.be.eql('*');
        });
    });

    describe("Create filter", function(){
        it("should be able to accept placeholder option #1", function(){
            var testFilter = new Filter({placeHolder: '+'});
            expect(testFilter.placeHolder).to.be.eql('+');
        });
        it("should be able to accept placeholder option #2", function(){
            var testFilter = new Filter({placeHolder: '嗶'});
            expect(testFilter.placeHolder).to.be.eql('嗶');
        });
        it("should be able to accept placeholder option #3", function(){
            var testFilter = new Filter({placeHolder: '***'});
            expect(testFilter.placeHolder).to.be.eql('***');
        });
        it("should be able to accept placeholder option #4", function(){
            var testFilter = new Filter({placeHolder: '消音'});
            expect(testFilter.placeHolder).to.be.eql('消音');
        });
        it("should be able to accept englishList option #1", function(){
            var testFilter = new Filter({englishList: ['showmethemoney']});
            expect(testFilter.englishList).to.contain('showmethemoney');
            expect(testFilter.englishList.length).to.be.at.least(2);
        });
        it("should be able to accept englishList option #2", function(){
            var testFilter = new Filter({englishList: ['showmethemoney', 'iseedeadpeople', 'whosyourdaddy']});
            expect(testFilter.englishList).to.contain('showmethemoney');
            expect(testFilter.englishList).to.contain('iseedeadpeople');
            expect(testFilter.englishList).to.contain('whosyourdaddy');
            expect(testFilter.englishList.length).to.be.at.least(4);
        });
        it("should be able to accept chineseList option #1", function(){
            var testFilter = new Filter({chineseList: ['北京烤鴨']});
            expect(testFilter.chineseList).to.contain('北京烤鴨');
            expect(testFilter.chineseList.length).to.be.at.least(2);
        });
        it("should be able to accept chineseList option #2", function(){
            var testFilter = new Filter({chineseList: ['北京烤鴨','乾燒蝦仁','三杯雞']});
            expect(testFilter.chineseList).to.contain('北京烤鴨');
            expect(testFilter.chineseList).to.contain('乾燒蝦仁');
            expect(testFilter.chineseList).to.contain('三杯雞');
            expect(testFilter.chineseList.length).to.be.at.least(4);
        });
        it("should be able to accept mixed option", function(){
            var testFilter = new Filter(
                {
                    placeHolder: '+',
                    englishList: ['showmethemoney', 'iseedeadpeople', 'whosyourdaddy'],
                    chineseList: ['北京烤鴨','乾燒蝦仁','三杯雞']
                }
            );
            expect(testFilter.placeHolder).to.be.eql('+');
            expect(testFilter.englishList).to.contain('showmethemoney');
            expect(testFilter.englishList).to.contain('iseedeadpeople');
            expect(testFilter.englishList).to.contain('whosyourdaddy');
            expect(testFilter.englishList.length).to.be.at.least(4);
            expect(testFilter.chineseList).to.contain('北京烤鴨');
            expect(testFilter.chineseList).to.contain('乾燒蝦仁');
            expect(testFilter.chineseList).to.contain('三杯雞');
            expect(testFilter.chineseList.length).to.be.at.least(4);
        });
    });

    describe("#isProfane (Chinese test)", function(){
        var filter = new Filter();

        it("should detect Chinese bad word in exact match", function(){
            expect(filter.isProfane("王八")).to.be.eql(true);
            expect(filter.isProfane("幹你")).to.be.eql(true);
        });
        it("should detect Chinese bad word in a sentence #1", function(){
            expect(filter.isProfane("你王八蛋")).to.be.eql(true);
            expect(filter.isProfane("我幹你娘")).to.be.eql(true);
        });
        it("should detect Chinese bad word in a sentence #2", function(){
            expect(filter.isProfane("大 王八 哥")).to.be.eql(true);
            expect(filter.isProfane("我 幹你 娘")).to.be.eql(true);
        });
        it("should detect Chinese bad word in a sentence #3", function(){
            expect(filter.isProfane("美國海關查扣一隻走私大王八哥鳥")).to.be.eql(true);
            expect(filter.isProfane("蔡阿幹你娘家做的雞精很補")).to.be.eql(true);
        });
        it("should not detect Chinese bad word if they are separated #1", function(){
            expect(filter.isProfane("王 八")).to.be.eql(false);
            expect(filter.isProfane("幹|你")).to.be.eql(false);
        });
        it("should not detect Chinese bad word if they are separated #2", function(){
            expect(filter.isProfane("王a八")).to.be.eql(false);
            expect(filter.isProfane("幹$你")).to.be.eql(false);
        });
        it("should not detect Chinese bad word if they are separated #3", function(){
            expect(filter.isProfane("王：八")).to.be.eql(false);
            expect(filter.isProfane("幹，你")).to.be.eql(false);
        });
        it("should not detect Chinese bad word if they are separated #4 ", function(){
            expect(filter.isProfane("老王有八個兒子")).to.be.eql(false);
            expect(filter.isProfane("當上幹部之後，你就會變得很忙")).to.be.eql(false);
        });
    });

    describe("#isProfane (English test)", function(){
        var filter = new Filter();

        it("should detect English bad word in exact match", function(){
            expect(filter.isProfane("5h1t")).to.be.eql(true);
            expect(filter.isProfane("fuck")).to.be.eql(true);
            expect(filter.isProfane("son-of-a-bitch")).to.be.eql(true);
            expect(filter.isProfane("s_h_i_t")).to.be.eql(true);
        });
        it("should detect English bad word in a sentence #1", function(){
            expect(filter.isProfane("You eat 5h1t")).to.be.eql(true);
            expect(filter.isProfane("Go fuck yourself")).to.be.eql(true);
            expect(filter.isProfane("you little son-of-a-bitch")).to.be.eql(true);
            expect(filter.isProfane("you piece of s_h_i_t")).to.be.eql(true);
        });
        it("should detect English bad word in a sentence #2", function(){
            expect(filter.isProfane("YOU EAT 5H1T")).to.be.eql(true);
            expect(filter.isProfane("Go Fuck Yourself")).to.be.eql(true);
            expect(filter.isProfane("yOu lItTlE sOn-Of-A-bItCh")).to.be.eql(true);
            expect(filter.isProfane("you piece of S_H_i_t")).to.be.eql(true);
        });
        it("should not detect English bad words in a word", function(){
            expect(filter.isProfane("u3nsa15h1tl1password1")).to.be.eql(false);
            expect(filter.isProfane("Fuckthis")).to.be.eql(false);
            expect(filter.isProfane("You-little-son-of-a-bitch")).to.be.eql(false);
            expect(filter.isProfane("Hello S_H_I_T_T_Y")).to.be.eql(false);
        });
        it("should not detect English bad words if they are separated", function(){
            expect(filter.isProfane("5h, 1t, 3s")).to.be.eql(false);
            expect(filter.isProfane("Fuc Kitchen")).to.be.eql(false);
            expect(filter.isProfane("son-of - a-bitch")).to.be.eql(false);
            expect(filter.isProfane("Fill this: S____ H____I _T ")).to.be.eql(false);
        });
    });

    describe("#isProfane (Mixed test)", function(){
        var filter = new Filter();

        it("should detect Chinese bad word in a mixed sentence", function(){
            expect(filter.isProfane("'幹你娘' is a swear word in Chinese")).to.be.eql(true);
            expect(filter.isProfane("Sometimes people call me 王八蛋")).to.be.eql(true);
            expect(filter.isProfane("吃屎吧you")).to.be.eql(true);
        });
        it("should detect English bad word in a mixed sentence", function(){
            expect(filter.isProfane("fuck you 是一句英文髒話")).to.be.eql(true);
            expect(filter.isProfane("人們有時會叫我 son-of-a-bitch")).to.be.eql(true);
            expect(filter.isProfane("你 eat shit")).to.be.eql(true);
        });
    });

    describe('#replaceWord', function(){
        var filter = new Filter();
        // We use it with Chinese target only
        it("should do nothing if the string does not contain target", function(){
            var string = "你這個傢伙";
            var target = "王八蛋";
            expect(filter.replaceWord(string, target)).to.be.eql("你這個傢伙");
        });
        it("should replace the target in the string #1", function(){
            var string = "王八蛋你王八蛋";
            var target = "王八蛋";
            expect(filter.replaceWord(string, target)).to.be.eql("***你***");
        });
        it("should replace the target in the string #2", function(){
            var string = "王八蛋you王八蛋";
            var target = "王八蛋";
            expect(filter.replaceWord(string, target)).to.be.eql("***you***");
        });
    });

    describe('#cleanWord', function(){
        var filter = new Filter();
        // We use it on English only
        it("should mask the word with the place holder of equal length", function(){
            expect(filter.cleanWord("hello")).to.be.eql("*****");
            expect(filter.cleanWord("hello,world")).to.be.eql("***********");
            expect(filter.cleanWord("")).to.be.eql("");
        });
    });

    describe('#clean', function(){
        var filter = new Filter();

        it("should do nothing if the string contains no bad words", function(){
            var s1 = "我家門前有小河";
            var s2 = "This is a book.";
            var s3 = "根據 schedule，我們已經 delay 15天了";

            expect(filter.clean(s1)).to.be.eql(s1);
            expect(filter.clean(s2)).to.be.eql(s2);
            expect(filter.clean(s3)).to.be.eql(s3);
        });

        it("should be able to replace the bad words in the string", function(){
            var s1 = "你王八蛋，我幹你娘";
            var s2 = "You motherfucker piece of shit";
            var s3 = "你王八蛋，you motherfucker";

            expect(filter.clean(s1)).to.be.eql("你***，我***");
            expect(filter.clean(s2)).to.be.eql("You ************ piece of ****");
            expect(filter.clean(s3)).to.be.eql("你***，you ************");
        });
    });
});
