var shinko = 0;
var shinkopersecond = 0;
var shinkoperclick = 10;
var money = 0;
var moneypersecond = 0;
var objects = [[0, 10, 1]];

function add_shinko(v: number)
{
    shinko+=v;
    var s = <HTMLParagraphElement>document.getElementById("shinko");
    s.textContent = "信仰："+Math.floor(shinko/10);
}

function add_shinkopersecond(v: number)
{
    shinkopersecond+=v;
    var s = <HTMLParagraphElement>document.getElementById("shinkopersecond");
    s.textContent = "信仰/秒："+ Math.floor(shinkopersecond/10)+"."+(shinkopersecond%10);
}

function add_shinkoperclick(v: number)
{
    shinkoperclick+=v;
    var s = <HTMLParagraphElement>document.getElementById("shinkoperclick");
    s.textContent = "信仰/クリック：" + Math.floor(shinkoperclick/10)+"."+(shinkoperclick%10);
}

function add_money(v: number)
{
    money+=v;
    var s = <HTMLParagraphElement>document.getElementById("money");
    s.textContent = "お布施：" + money + "円";
}

function add_moneypersecond(v: number)
{
    moneypersecond += v;
    var u = <HTMLParagraphElement>document.getElementById("moneypersecond");
    u.textContent = "お布施/秒：" + moneypersecond + "(円/秒)";
}

function click_action()
{
    add_shinko(shinkoperclick);
}

var flags: [boolean, ()=>boolean][]=
    [
        [false, ()=>shinkoborder(100, 1)],
        [false, ()=>shinkoborder(1000, 2)],
        [false, ()=>shinkoborder(10000, 4)],
        [false, ()=>shinkoborder(100000, 8)],
        [false, ()=>shinkoborder(1000000, 16)],
        [false, ()=>itemborder(0,10,1)],
        [false, ()=>itemborder(0,50,10)],
        [false, ()=>itemborder(0,100,100)],
    ];
function main_loop()
{
    for(var i = 0; i < flags.length; ++i)
    {
        flags[i][0]=flags[i][0]||flags[i][1]();
    }
    add_money(moneypersecond);
    add_shinko(shinkopersecond);
}

function shinkoborder(v: number, u:number)
{
    if(shinko >= v)
    {
        add_moneypersecond(u);
        return true;
    }
    return false;
}

function helperclick(v: number)
{
    var n = Math.floor(objects[v][1]*Math.pow(1.01,objects[v][0]));
    if(money >= n)
    {
        add_money(-n);
        ++objects[v][0];
        add_shinkopersecond(objects[v][2]);
        var s = <HTMLParagraphElement>document.getElementById("object"+v+"n");
        s.textContent="値段："+Math.floor(objects[v][1]*Math.pow(1.1,objects[v][0]))+"円";
        var t = <HTMLParagraphElement>document.getElementById("object"+v+"k");
        t.textContent="個数："+objects[v][0]+"個";
    }
}

function itemborder(ind: number, count: number, size: number)
{
    if(objects[ind][0]>=count)
    {
        add_moneypersecond(size);
        return true;
    }
    return false;
}