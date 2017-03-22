"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DaikuanDataService = (function () {
    function DaikuanDataService() {
    }
    DaikuanDataService.prototype.getBrands = function () {
        return ["本田", "宝骏", "吉利", "大众", "哈佛", "现代", "五菱", "丰田", "众泰", "长安", "奥迪", "广汽", "日产", "长城", "雪铁龙", "斯巴鲁", "雪佛兰"];
    };
    DaikuanDataService.prototype.getPrices = function () {
        return [[0, 3], [3, 5], [5, 8], [8, 10], [10, 15], [15, 20], [20, 30], [30, 45], [45, 100]];
    };
    DaikuanDataService.prototype.getDownPayments = function () {
        return [[0, 3], [3, 5], [5, 8], [8, 10], [10, 15], [15, 20], [20, 30], [30, 45], [45, 100]];
    };
    DaikuanDataService.prototype.getMonthlyPayments = function () {
        return [[0, 1], [1, 3], [3, 5], [5, 8], [8, 10], [10, 20]];
    };
    DaikuanDataService.prototype.getTypes = function () {
        return ["紧凑型", "中型车", "SUV", "MPV"];
    };
    DaikuanDataService.prototype.getBrandDetails = function () {
        var result = {};
        result["A"] = ["奥迪阿尔法", "罗密欧阿斯顿", "马丁", "Artega"];
        result["B"] = ["奔驰", "宝马", "标致", "北汽制造", "比亚迪", "本田", "奔腾", "保时捷", "宾利", "别克", "布加迪", "宝骏", "北京", "北汽威旺", "巴博斯", "保斐利", "北汽绅宝", "北汽幻速", "北汽新能源", "宝沃", "比速汽车"];
        result["C"] = ["长城", "昌河", "长安轿车", "长安商用", "成功", "长安跨越"];
        result["D"] = ["大众", "东南道奇", "东风风行", "东风风神", "东风启辰", "DS", "东风风度", "东风小康", "东风御风", "东风·郑州日产", "东风风光"];
        result["F"] = ["丰田", "福特", "菲亚特", "福迪", "法拉利", "福田", "飞驰商务车", "福汽启腾"];
        result["G"] = ["广汽吉奥", "GMC", "光冈", "广汽日野", "广汽传祺", "观致汽车", "广汽中兴"];
        result["H"] = ["哈飞", "海马", "汇众", "黄海", "红旗", "华泰", "海马商用车", "海格", "恒天汽车", "哈弗", "华颂", "华泰新能源", "汉腾华凯"];
        result["J"] = ["Jeep", "吉利汽车", "江淮", "江铃", "江南金杯", "金龙", "捷豹", "九龙", "金旅客车", "江铃集团轻汽"];
        result["K"] = ["克莱斯勒", "凯迪拉克", "科尼赛", "克开瑞", "卡尔森", "KTM", "卡威", "科瑞斯的", "凯翼康迪全球鹰电动汽车"];
        result["L"] = ["铃木", "陆风", "力帆", "劳斯莱斯", "路特斯", "兰博基尼", "雷克萨斯", "林肯", "路虎", "雷诺", "莲花", "猎豹汽车", "理念", "蓝海房车", "雷丁电动", "陆地方舟"];
        result["M"] = ["马自达", "MG", "MINI", "玛莎拉蒂", "迈凯伦", "摩根"];
        result["N"] = ["纳智捷"];
        result["O"] = ["讴歌", "欧朗", "欧联"];
        result["Q"] = ["起亚", "奇瑞", "庆铃"];
        result["R"] = ["日产", "荣威"];
        result["S"] = ["斯柯达", "三菱", "smart", "双龙", "斯巴鲁", "世爵", "上汽大通MAXUS", "陕汽通家", "山姆", "赛麟SALEEN", "STARTECH", "上喆汽车", "SWM斯威汽车"];
        result["T"] = ["腾势", "特斯拉", "泰卡特"];
        result["W"] = ["沃尔沃", "五菱", "五十铃", "威麟", "威兹曼", "潍柴英致", "潍柴欧睿"];
        result["X"] = ["雪铁龙", "现代", "雪佛兰", "新凯", "西雅特", "星客特"];
        result["Y"] = ["依维柯", "一汽", "永源", "英菲尼迪", "野马汽车", "宇通", "扬州", "亚星客车", "驭胜", "雅宾纳"];
        result["Z"] = ["中兴", "中华", "众泰", "中欧奔驰房车", "浙江卡尔森", "知豆", "重汽王牌"];
        return result;
    };
    DaikuanDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DaikuanDataService);
    return DaikuanDataService;
}());
exports.DaikuanDataService = DaikuanDataService;
//# sourceMappingURL=dataService.js.map