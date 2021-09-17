/*
[rewrite_local]
#富豪小镇
https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions url script-request-body https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js
[MITM]
hostname = sunnytown.hyskgame.com
#loon
https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions url script-request-body https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js, requires-body=true, timeout=10, tag=富豪小镇
#surge
柠檬富豪小镇 = type=https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions,requires-body=1,max-size=0,script-path=https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js,script-update-interval=0
*/

// [task_local]
//#柠檬富豪小镇
// */10 8-23 * * * https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js, tag=富豪小镇, enabled=true

// [task_local]
//#富豪小镇
// */10 8-23 * * * qlfhxz.js, tag=富豪小镇, enabled=true

const $ = new Env('富豪小镇');
const notify = $.isNode() ? require('./sendNotify') : '';
let status;
status = (status = ($.getval("tfbstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let fhxzurlArr = []
let fhxzurl = $.isNode() ? (process.env.fhxzurl ? process.env.fhxzurl : "") : ($.getdata('fhxzurl') ? $.getdata('fhxzurl') : "")
let fhxzurls = ""
let arr=[1,2,3,4,5,6,7,8,9]
let lottery = '[{"type":"lottery_draw","data":{"priceType":3001}}]'
let gj = '[{"type":"pet_buyPet","data":{}}]'
let cd = '[{"type":"pet_feedPetFood","data":{}}]'
let rqq = '[{"type":"carBox_receiveBoxReward","data":{}}]'
let wzc = '[{"type":"carBox_receiveCarReward","data":{}}]'
let id = ""
let market_getItemList = '[{"type":"market_getItemList","data":{}}]'

let qtjs = '[{"type":"farmland_speedUpAll","data":{"farmlandDefId":0}}]'
let rw1 = '[{"type":"dailyQuest_receiveReward","data":{"questDefId":1002,"questType":1}}]'
let dailyQuest = '[{"type":"dailyQuest_getQuestList","data":{"questType":1}}]'

if ($.isNode() && process.env.fhxzurl) {
  if (process.env.fhxzurl.indexOf('@') > -1) {
    fhxzurlArr = process.env.fhxzurl.split('@');
  } else if (process.env.fhxzurl.indexOf('\n') > -1) {
    fhxzurlArr = process.env.fhxzurl.split('\n');
  } else {
    fhxzurlArr = [process.env.fhxzurl]
  }
}

!(async() => {
  if (typeof $request !== "undefined") {
    fhxzck()
  } else {
      console.log(`-------------共${fhxzurlArr.length}个账号-------------\n`)
      for (let i = 0; i < fhxzurlArr.length; i++) {
        if (fhxzurlArr[i]) {
          fhxzurl = fhxzurlArr[i];
          $.index = i + 1;
          console.log(`\n开始【富豪小镇 ${$.index}】`)
          await dailyQuestd();
          await $.wait(Math.floor(Math.random() * 100) + 1000);
          await quantijs(); //全体加速
          await $.wait(Math.floor(Math.random() * 100) + 1000);
          await jqgj(); //机器管家
          await $.wait(Math.floor(Math.random() * 1000) + 15000);
          await gjcd(); //管家充电
          await $.wait(Math.floor(Math.random() * 100) + 7000);
          await zdcj(); //自动抽奖
          await $.wait(Math.floor(Math.random() * 100) + 7000);
          await krqq(); //热气球
          await $.wait(Math.floor(Math.random() * 100) + 1000);
          await wzcc(); //物资车
          await $.wait(Math.floor(Math.random() * 100) + 1000);
          await txlb(); //提现列表
          await $.wait(Math.floor(Math.random() * 1000) + 10000);
          console.log(`\n开始修理工厂\n`)
          await repairAll(arr);
          console.log(`\n开始收取产品\n`)
          await harvestAll(arr);
          console.log(`\n开始生产产品\n`)
          await plantAll(arr);
          console.log(`\n开始获取订单信息\n`)
          await marketgetItemList();
        }
      }
  }
})()
  .catch ((e) => $.logErr(e))
  .finally(() => $.done())


function fhxzck() {
  if ($request.url.indexOf("system_getGpvGameOptions") > -1) {
    const fhxzurl = $request.url
    id = fhxzurl.match(/token=(\S+)/)
    $.log(id)
    if (fhxzurl) $.setdata(fhxzurl, `fhxzurl${status}`)
    $.log(fhxzurl)
    $.msg($.name, "", '富豪小镇' + `${status}` + '数据获取成功！')
  }
}

//抽奖
function zdcj(timeout = 0) {
  return new Promise((resolve) => {

    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=lottery_draw',
      body: lottery,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`抽奖次数不足`)
        } else {
          $.log(`抽奖成功`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//开启管家
function jqgj(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=pet_buyPet',
      body: gj,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log("机器管家开启今日任务已完成")
        } else {
          $.log(`机器管家开启成功: `)
          await gjcd();
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//管家充电
function gjcd(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=pet_feedPetFood',
      body: cd,
    }
    $.post(url, async(err, resp, data) => {
      //$.log('充电'+data) 
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`机器管家充电今日任务已完成`)
        } else {
          $.log(`充电成功剩余次数: `+lb[0].data.petHouse.remainingFeedTimes)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//热气球
function krqq(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id)  
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=carBox_receiveBoxReward',
      body: rqq,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`热气球还未到达或次数已用完`)
        } else {
          $.log(`热气球开启成功剩余次数: `+lb[1]["data"]["carBoxInfo"].boxRemainingTimes)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//物资车
function wzcc(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id)  
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=carBox_receiveCarReward',
      body: wzc,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`物资车还未到达或次数已用完`)
        } else {
          $.log(`物资车开启成功剩余次数: `+lb[1]["data"]["carBoxInfo"].carRemainingTimes)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//自动提现
function txlb(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=market_getItemList',
      body: market_getItemList,
    }
    $.post(url, async(err, resp, data) => {
      try {
        //$.log(data) 
        data = JSON.parse(data);
        var lb = data
        if (lb[0].data.marketItemList[0].funcParam == 3001) {
          $.log(`提现列表获取成功\n提现 id: `+lb[0].data.marketItemList[0].itemDefId + "\n满足将会自动提现")
          txid1 = lb[0].data.marketItemList[0].itemDefId
          await $.wait(1000);
          await tx3mao(); //提现3毛
        } else {
          $.log(`3毛今日已提现或广告不足`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

function tx3mao(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=market_exchange',
      body: '[{"type":"market_exchange","data":{"itemDefId":' + txid1 + '}}]',
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`3毛今日已提现`)
        } else {
          $.log(`3毛提现成功`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

function dailyQuestd(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=dailyQuest_getQuestList',
      body: dailyQuest,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        for (let i = 0; i < 7; i++) {
          if (i == 1) {
            continue
          }
            $.log(lb[0]["data"]["questList"][i].title +`\t`+ lb[0]["data"]["questList"][i].displayProgress +`/`+ lb[0]["data"]["questList"][i].displayTotalProgress + `\t已完成`)
            if(Number(lb[0]["data"]["questList"][i].displayProgress)>=Number(lb[0]["data"]["questList"][i].displayTotalProgress)){
                $.message=`订单`+ lb[0]["data"]["questList"][i].title +`已可以完成`
            }
            else{
                $.message=`订单`+ lb[0]["data"]["questList"][i].title +`还不能完成`
            }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

function marketgetItemList(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=market_getItemList',
      body: market_getItemList,
    }
    $.post(url, async(err, resp, data) => {
      try {
        data = JSON.parse(data);
        var lb = data
        var label, target = ""
        for (let i = 0; i < 10; i++) {
          if (lb[0]["data"]["marketItemList"][i].title == "观看20个视频"){
            label = ""
          }
          switch (lb[0]["data"]["marketItemList"][i].label) {
            case "2":
              label = "初级";
              break;
            case "3":
              label = "中级";
              break;
            case "4":
              label = "高级";
              break;
            default:
              break;
          }
          if (lb[0]["data"]["marketItemList"][i].progress >= lb[0]["data"]["marketItemList"][i].targetNumber) {
            target = "可以提交"
          }
          $.log(`物品：`+lb[0]["data"]["marketItemList"][i].title + `\t等级：` + label + `\t库存：` + lb[0]["data"]["marketItemList"][i].progress + `\t需求：` + lb[0]["data"]["marketItemList"][i].targetNumber + target)
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//全体加速
function quantijs(timeout = 0) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=farmland_speedUpAll',
      body: qtjs,
    }
    $.post(url, async(err, resp, data) => {
      //$.log(data) 
      try {
        data = JSON.parse(data);
        var lb = data
        if (lb[0].type == 'system_error') {
          $.log(`今日签到任务已完成`)
        } else {
          $.log(`全体加速成功剩余次数：`+lb[0]["data"]["speedUpInfo"].remainingAllTimes)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//普通加速
async function speedUpAll(Array) {
    for(const i of Array){
        await speedUp(i);
        await $.wait(Math.floor(Math.random() * 100) + 1000);
    }
}

function speedUp(num) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id) 
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=farmland_speedUp',
      body: `[{"type":"farmland_speedUp","data":{"farmlandDefId":${num},"priceType":2002}}]`,
    }
    $.post(url, async(err, resp, data) => {
      try {
        if (data.match(/farmland_speedUp/) == 'farmland_speedUp') {
          $.log(`${num}号工厂普通加速成功`)
        } else {
          $.log(`${num}号工厂普通加速失败或已完工`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, 0)
  })
}

async function plantAll(Array) {
    for(const i of Array){
        await plant(i);
        await $.wait(Math.floor(Math.random() * 100) + 1000);
    }
}

function plant(num) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    //$.log(id)  
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=farmland_plant',
      body: `[{"type":"farmland_plant","data":{"farmlandDefId":${num},"priceType":2001}}]`,
    }
    $.post(url, async(err, resp, data) => {
      try {
        if (data.match(/farmland_plant/) == 'farmland_plant') {
          $.log(`${num}号工厂生产成功`)
        } else {
          $.log(`${num}号工厂还在生产中`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, 0)
  })
}

async function repairAll(Array) {
    for(const i of Array){
        await repair(i);
        await $.wait(Math.floor(Math.random() * 100) + 1000);
    }
}

function repair(num) {
    return new Promise((resolve) => {
      id = fhxzurl.match(/Token=\S+&/)
      //$.log(id) 
      let url = {
        url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=farmland_repair',
        body: `[{"type":"farmland_repair","data":{"farmlandDefId":${num}}}]`,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (data.match(/farmland_repair/) == 'farmland_repair') {
            $.log(`${num}号工厂修理成功`)
            await $.wait(Math.floor(Math.random() * 1000) + 30000);
          } else {
            $.log(`${num}号工厂无需修理`)
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      }, 0)
    })
}

async function harvestAll(Array) {
    for(const i of Array)
    {
        await harvest(i);
        await $.wait(Math.floor(Math.random() * 100) + 1000);
    }
  }

function harvest(num) {
  return new Promise((resolve) => {
    id = fhxzurl.match(/Token=\S+&/)
    let url = {
      url: 'https://sunnytown.hyskgame.com/api/messages?access' + id + 'msgtype=farmland_harvest',
      body: `[{"type":"farmland_harvest","data":{"farmlandDefId":${num}}}]`,
    }
    $.post(url, async(err, resp, data) => {
      try {
        if (data.match(/farmland_harvest/) == 'farmland_harvest') {
          $.log(`${num}号工厂收取成功`)
        } else {
          $.log(`${num}号工厂还在生产中`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, 0)
  })
}


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
