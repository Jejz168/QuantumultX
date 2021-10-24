/*
10.18

软件：  爱企查
收益：  每天250左右爱豆
注意事项 ： 运行js时不要打开软件app

获取ck：  打开软件点击我的，右上角签到即可获取

重写：
QX重写：https://aiqicha.baidu.com/zxcenter url script-request-header ifaqc.js

主机名：hostname = aiqicha.baidu.com

*/

const $ = new Env('爱企查');
let status;

status = (status = ($.getval("aqcstatus") || "1")) > 1 ? `${status}` : "";

const aqcckArr = [], aqccount = ''

let aqcck = $.getdata('aqcck')
let aqctz = ($.getval('aqctz') || '1');
$.message = '';

let mrrw = {
  CX10002: "每日签到",
  CX10001: "每日登陆",
  CX11001: "查询企业",
  CX11002: "查询老板",
  CX11003: "查询老赖",
  CX11004: "查询商标",
  CX11005: "查询地图",
  CX11006: "浏览新闻",
  CX11007: "浏览监控日报",
  CX11009: "查询关系",
  CX12001: "添加监控",
  CX12002: "添加关注",
  CX12005: "分享任务",
  CX12007: "高级搜索",
  CX12009: "浏览互助",
  CX12011: "点赞观点",
};

const aqchd = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36",
  referer:
    "https://aiqicha.baidu.com/m/s?t=3&q=%E5%B0%8F%E7%B1%B3&VNK=e73b55ef",
  "X-Requested-With": "XMLHttpRequest",
  Host: "aiqicha.baidu.com",
  cookie: "",
};

function rand() {
  let key = ["苹果", "华为", "百度", "一个", "暴风", "王者"];
  let i = Math.floor(Math.random() * key.length);
  return key[i];
}


!(async () => {
    if (typeof $request !== "undefined") {
        aqchqck()
    } else {
        aqcckArr.push($.getdata('aqcck'))
        let aqccount = ($.getval('aqccount') || '1');
        for (let i = 2; i <= aqccount; i++) {
            aqcckArr.push($.getdata(`aqcck${i}`))
        }
        console.log(
            `\n============ 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ============\n`);
            console.log(`共有【${aqcckArr.length}】个账号`);
        for (let i = 0; i < aqcckArr.length; i++) {
            if (aqcckArr[i]) {
                aqcck = aqcckArr[i];
                aqchd.cookie = aqcck;
                $.index = i + 1;
                console.log(`\n\n开始第【${$.index}】个账号任务`)
                ytaskList = [];
                taskList = [];
                claimList = [];
                alltaskList = [];
                await aqccxrw(`${$.index}`);
                await $.wait(3000);
                await zxrw();
                console.log(`等待30秒后重新查询`)
                await $.wait(30000);                
                ytaskList = [];
                taskList = [];
                claimList = [];
                alltaskList = [];
                await aqccxrw(`${$.index}`);
                await zxrw();
                await $.wait(3000);
                ytaskList = [];
                taskList = [];
                claimList = [];
                alltaskList = [];
                await aqccxrw(`${$.index}`);
                await lqad();
                await $.wait(3000);
                await cxad();
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取ck
//原始链接：https://aiqicha.baidu.com/zxcenter/cumulativeSignInAjax
function aqchqck() {
    if ($request.url.indexOf("cumulativeSignInAjax") > -1) {
        const aqcck = $request.headers["Cookie"]
        if (aqcck) $.setdata(aqcck, `aqcck${status}`)
        $.log(aqcck)
        $.msg($.name, "", `爱企查${status}获取Cookie成功`)
    }
}


//版块
//get方式模板
function aqcmb(api, timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/${api}`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              qqfh = JSON.parse(data)
              if (qqfh.status == 0) {
                console.log(`任务完成`);
              }
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//奖励详情
function lqadxx(api, timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/${api}`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              qqfh = JSON.parse(data)
              if (qqfh.status == 0) {
                console.log(`获得${qqfh.data.totalScore}爱豆`);
              }
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//浏览监控日报
async function lljkrb(timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/zxcenter/monitorDailyReportListAjax?page=1&size=10`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              qqfh = JSON.parse(data)
              let list = qqfh.data.list
              if (list) {
                for(k=0; k<2 && k<list.length; k++){
                  await aqcmb(`zxcenter/monitorDailyReportDetailAjax?reportdate=${list[k].reportDate}`)
                }
              }
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//分享好友
function fxhy(timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/usercenter/getShareUrlAjax`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              qqfh = JSON.parse(data)
              uid = qqfh.data.match(/uid=(.+)/)
              if (uid){
                uid = uid[1];
                aqchd["cookie"] = "";
                let t = Date.now();
                aqchd["referer"] = "https://" + qqfh.data + "&VNK=" + t;
                aqchd["Zx-Open-Url"] = "https://" + qqfh.data + "&VNK=" + t;
                await $.wait(3000)
                await aqcmb(`m/?uid=${uid}`);
                await $.wait(3000)
                await aqcmb(`m/getuserinfoAjax?uid=${uid}`);
                aqchd.cookie = aqcck;
              }
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//领取爱豆
async function lqad() {
  if(claimList.length>0){
    for(l=0; l<alltaskList.length; l++){
      klrw = alltaskList[l]
      await lqadxx(`zxcenter/claimUserTaskAjax?taskCode=${klrw.title}`)
      await $.wait(1000)
    }
  }else{
    console.log(`奖励已全部领取`);
  }
}

//查询任务完成状态
ytaskList = [];
taskList = [];
claimList = [];
alltaskList = [];
async function aqccxrw(api,timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/usercenter/checkTaskStatusAjax`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              test = JSON.parse(data)
              let obj = test.data
              if (test.status == 0) {
                Object.keys(obj).forEach(function (key){
                  if(mrrw[key]){
                    let task = obj[key]
                    task.title = key
                    alltaskList.push(task)
                    if(task.count == task.totalcount) (ytaskList.push(task));
                    if(task.canClaim != 0) (claimList.push(key));
                    if(task.count != task.totalcount) (taskList.push(task))
                  }
                })
              }
              console.log(`账号【${api}】共有【${alltaskList.length}】个任务\n`);
              console.log(`【${ytaskList.length}】个任务已完成\n`);
              console.log(`【${taskList.length}】个任务未完成\n`);
              console.log(`【${claimList.length}】个任务可领取奖励`);
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//做任务模块
async function zxrw(){
  if(taskList.length > 0){
    for(j=0; j<taskList.length; j++){
      dqrw = taskList[j]
      if(dqrw.title == "CX10002"){
        console.log("签到");
        await aqcmb(`usercenter/userSignAjax`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11001"){
        console.log("查询企业");
        await aqcmb(`s/getHeadBrandAndPersonAjax?q=${encodeURI(rand())}`)
        await $.wait(2000)
        await aqcmb(`search/advanceFilterAjax?o=0&p=1&q=${encodeURI(rand())}&t=111`);
        await $.wait(2000)
      }else if(dqrw.title == "CX11002"){
        console.log("开始查询老板");
        await aqcmb(`person/relevantPersonalAjax?page=1&q=${encodeURI(rand())}&size=10`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11003"){
        console.log("开始查询老赖");
        await aqcmb(`c/dishonestAjax?q=${encodeURI(rand())}&t=8&s=10&p=1&f=%7B%22type%22:%221%22%7D`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11004"){
        console.log("查询商标");
        await aqcmb(`c/markproAjax?q=${encodeURI(rand())}&p=1&s=10&f=%7B%7D&o=%7B%7D`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11005"){
        console.log("查询地图");
        await aqcmb(`map/getAdvanceFilterListAjax?longitude=113.76343399&latitude=23.04302382&distance=2&page=1`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11006"){
        console.log("浏览新闻");
        await aqcmb(`m/getYuqingDetailAjax?yuqingId=993090dcb7574be014599996098459e3`)
        await $.wait(3000)
      }else if(dqrw.title == "CX11007"){
        console.log("浏览监控日报");
        await lljkrb()
        await $.wait(3000)
      }else if(dqrw.title == "CX11009"){
        console.log("查询关系");
        await aqcmb(`relations/findrelationsAjax?from=8ec1f3a262ebe1ad407352af2236573d&to=8d4ba86a2bf31782a4b52d9748bdcfdb&pathNum=5`)
        await $.wait(3000)
      }else if(dqrw.title == "CX12001"){
        console.log("添加监控");
        for(id of [29829264524016, 28696417032417, 31370200772422, 31242153386614,]){
          await aqcmb(`zxcenter/addMonitorAjax?pid=${id}`)
          await $.wait(2000)
        }
        await aqcmb(`zxcenter/addMonitorAjax?pid=29710155220353`)
        await $.wait(3000)
        await aqcmb(`zxcenter/cancelMonitorAjax?pid=29710155220353`)
        await $.wait(3000)
      }else if(dqrw.title == "CX12002"){
        console.log("添加关注");
        await aqcmb(`my/addCollectAjax?pid=31610236813812`)
        await $.wait(2000)
        await aqcmb(`my/addCollectAjax?pid=11260803240695`)
        await $.wait(2000)
      }else if(dqrw.title == "CX12005"){
        console.log("分享好友");
        await fxhy()
        await $.wait(3000)
      }else if(dqrw.title == "CX12007"){
        console.log("高级搜索");
        await aqcmb(`search/advanceSearchAjax?q=${encodeURI(rand())}&t=11&p=1&s=10&o=0&f=%7B%22searchtype%22:[%221%22]%7D`)
        await $.wait(3000)
      }else if(dqrw.title == "CX12009"){
        console.log("浏览互助");
        await aqcmb(`smart/questionDetailAjax?nid=${sjnid()}`)
        await $.wait(3000)
        await aqcmb(`smart/updownAjax?nid=${sjnid()}&parentId=1117782787078627916&undoType=0`)
        await $.wait(3000)
      }else if (dqrw.title == "CX12011"){
        console.log("点赞观点");
        await aqcmb(`smart/updownAjax?nid=8421281631433891398&parentId=1117791818342196711&undoType=0`)
        await $.wait(3000)
        await aqcmb(`smart/updownAjax?nid=16296401006584455401&parentId=1117782787078627916&undoType=0`)
        await $.wait(3000)
      }
    }
  }else if(taskList.length == 0){
    console.log("恭喜！任务都做完了");
  }
}

//获取随机nid函数
nidArr = [];
function sjnid() {
  return new Promise((resolve) => {
      let url = {
          url: `https://aiqicha.baidu.com/smart/getHomeQuestionListAjax?page=2&size=10&type=recommend`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              qqfh = JSON.parse(data)
              if (qqfh.status == 0) {
                var u = qqfh.data.list
                for(j=0; j<u.length; j++){
                  sp = u[j]
                  nidArr.push(sp.nid)
                }
              }
              var g = Math.floor(Math.random() * nidArr.length);
              console.log(nidArr[g]);
              return nidArr[g];
          } catch (e) {
          } finally {
            resolve()
          }
      }, timeout)
  })
}

//查询爱豆
function cxad(timeout = 0) {
  return new Promise((resolve) => {                   
      let url = {
          url: `https://aiqicha.baidu.com/usercenter/getScoreRankListAjax?type=1`,
          headers: aqchd,
      }
      $.get(url, async (err, resp, data) => {
          try {
              rwdt = JSON.parse(data)
              console.log(`账号【${rwdt.data[3].userName}】:共有${rwdt.data[3].score}爱豆`);
              $.message = `账号【${rwdt.data[3].userName}】:共有${rwdt.data[3].score}爱豆`
              message()
              //$.msg($.name, "", `账号【${rwdt.data[3].userName}】:共有${rwdt.data[3].score}爱豆`)                     
          } catch (e) {
          } finally {
              resolve()
          }
      }, timeout)       
  })
}

//通知函数
function message() {
  if(aqctz == 1){
      $.msg($.name,``,$.message)}
  }

//env模块    不要动  
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }