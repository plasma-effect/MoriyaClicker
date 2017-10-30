var shinko = 0;
var shinkopersecond = 0;
var shinkoperclick = 10;
var money = 0;
var moneypersecond = 0;
var objects = [[0, 10, 1]];
var booster = 1.01;
function add_shinko(v) {
    shinko += v;
    var s = document.getElementById("shinko");
    s.textContent = "信仰：" + Math.floor(shinko / 10);
}
function add_shinkopersecond(v) {
    shinkopersecond += v;
    var s = document.getElementById("shinkopersecond");
    s.textContent = "信仰/秒：" + Math.floor(shinkopersecond / 10) + "." + (shinkopersecond % 10);
}
function add_shinkoperclick(v) {
    shinkoperclick += v;
    var s = document.getElementById("shinkoperclick");
    s.textContent = "信仰/クリック：" + Math.floor(shinkoperclick / 10) + "." + (shinkoperclick % 10);
}
function add_money(v) {
    money += v;
    var s = document.getElementById("money");
    s.textContent = "お布施：" + money + "円";
}
function add_moneypersecond(v) {
    moneypersecond += v;
    var u = document.getElementById("moneypersecond");
    u.textContent = "お布施/秒：" + moneypersecond + "(円/秒)";
}
function click_action() {
    add_shinko(shinkoperclick);
}
var flags = [
    [false, function () { return shinkoborder(100, 1); }],
    [false, function () { return shinkoborder(1000, 2); }],
    [false, function () { return shinkoborder(10000, 4); }],
    [false, function () { return shinkoborder(100000, 8); }],
    [false, function () { return shinkoborder(1000000, 16); }],
    [false, function () { return itemborder(0, 10, 1); }],
    [false, function () { return itemborder(0, 50, 10); }],
    [false, function () { return itemborder(0, 100, 100); }],
];
function main_loop() {
    for (var i = 0; i < flags.length; ++i) {
        flags[i][0] = flags[i][0] || flags[i][1]();
    }
    add_money(moneypersecond);
    add_shinko(shinkopersecond);
}
function shinkoborder(v, u) {
    if (shinko >= v) {
        add_moneypersecond(u);
        return true;
    }
    return false;
}
function helperclick(v) {
    var n = Math.floor(objects[v][1] * Math.pow(booster, objects[v][0]));
    if (money >= n) {
        add_money(-n);
        ++objects[v][0];
        add_shinkopersecond(objects[v][2]);
        var s = document.getElementById("object" + v + "n");
        s.textContent = "値段：" + Math.floor(objects[v][1] * Math.pow(booster, objects[v][0])) + "円";
        var t = document.getElementById("object" + v + "k");
        t.textContent = "個数：" + objects[v][0] + "個";
    }
}
function itemborder(ind, count, size) {
    if (objects[ind][0] >= count) {
        add_moneypersecond(size);
        return true;
    }
    return false;
}
