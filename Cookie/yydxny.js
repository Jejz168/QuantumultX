/*
爷爷的小农院
下载地址：http://yydxny.catautoelevadores.com.ar/yydxny.html?os=ios&env=production&userId=335272335&pkgId=313

[rewrite_local]
#爷爷的小农院
https://bp-api.coohua.com/bubuduo-yydxny/sync/syncData url script-request-header https://raw.githubusercontent.com/crygirl02/Scripts/main/REG/fhxz.js
[MITM]
hostname = bp-api.coohua.com
#loon
https://bp-api.coohua.com/bubuduo-yydxny/sync/syncData url script-request-header https://raw.githubusercontent.com/crygirl02/Scripts/main/REG/fhxz.js, requires-header=true, timeout=10, tag=柠檬爷爷的小农院
#surge
爷爷的小农院 = type=https://bp-api.coohua.com/bubuduo-yydxny/sync/syncData,requires-header=1,max-size=0,script-path=https://raw.githubusercontent.com/crygirl02/Scripts/main/REG/fhxz.js,script-update-interval=0

-------------青龙或者其他容器运行-------------
-------------青龙拉取-------------
ql raw http://nm66.top/yydxny.js
放配置里 定时如下面 抓包查看请求头里 或者随便一条带有accesskey的
export yyxnyhd='{"bs":"CDMA","osVersion":"iOS 14.30","pkgId":"313","Host":"bp-api.coohua.com","Accept-Encoding":"gzip, deflate, br","deviceId":"0","gps":"default","brand":"Apple","channel":"AppStore","Connection":"keep-alive","Cache-Control":"no-cache","accessKey":"抓包替换的","hotVersion":"2.91","appVersion":"1.0.4","User-Agent":"ygzy-mobile/1 CFNetwork/1209 Darwin/20.2.0","os":"iOS","Accept-Language":"zh-cn","romVersion":"iOS 14.30","Content-Type":"application/json","oaid":"","currentChannel":"AppStore","blackBox":"","Content-Length":"487","wechatId":""}'

手动抓包替换上面1个 放在配置里面 多账号用@隔开
定时如下面
*/
// cron "*/10 8-23 * * *" yydxny.js, tag:爷爷的小农院
// [task_local]
//#柠檬爷爷的小农院
// */10 8-23 * * * yydxny.js, tag=爷爷的小农院, enabled=true
const $ = new Env('爷爷的小农院');
let status;
status = (status = ($.getval("yyxnystatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let yyxnyhdArr = []
let yyxnyhd = $.isNode() ? (process.env.yyxnyhd ? process.env.yyxnyhd : "") : ($.getdata('yyxnyhd') ? $.getdata('yyxnyhd') : "")
let yyxnyhds = ""
let arr=[0,1,2,3,4,5]
const logs = 0;
let products = '{"10101":"小麦","10102":"大豆","10103":"黄瓜","10104":"番茄","10105":"南瓜","10106":"辣椒","10107":"草莓","10108":"葡萄","10109":"土豆","10110":"胡萝卜","10111":"茄子","10112":"甘蔗","10113":"蓝莓","10114":"棉花","10115":"薰衣草","20101":"馒头","20102":"面条","20103":"豆腐","20104":"豆皮","20105":"豆浆","20106":"腌黄瓜","20107":"番茄酱","20108":"南瓜干","20109":"干辣椒","20110":"草莓干","20111":"葡萄干","20112":"包子","20113":"南瓜饼","20114":"豆瓣酱","20115":"什锦果汁","20116":"酱油","20117":"大豆油","20118":"啤酒","20119":"葡萄酒","20120":"豆腐乳"}'
let oemConf='{"20101":{"name":"馒头","plant":[{"plantID":10101,"num":1},{"plantID":"","num":0}]},"20102":{"name":"面条","plant":[{"plantID":10101,"num":2},{"plantID":"","num":0}]},"20103":{"name":"豆腐","plant":[{"plantID":10102,"num":1},{"plantID":"","num":0}]},"20104":{"name":"豆皮","plant":[{"plantID":10102,"num":2},{"plantID":"","num":0}]},"20105":{"name":"豆浆","plant":[{"plantID":10102,"num":3},{"plantID":"","num":0}]},"20106":{"name":"腌黄瓜","plant":[{"plantID":10103,"num":2},{"plantID":"","num":0}]},"20107":{"name":"番茄酱","plant":[{"plantID":10104,"num":2},{"plantID":"","num":0}]},"20108":{"name":"南瓜干","plant":[{"plantID":10105,"num":2},{"plantID":"","num":0}]},"20109":{"name":"干辣椒","plant":[{"plantID":10106,"num":2},{"plantID":"","num":0}]},"20110":{"name":"草莓干","plant":[{"plantID":10107,"num":2},{"plantID":"","num":0}]},"20111":{"name":"葡萄干","plant":[{"plantID":10108,"num":2},{"plantID":"","num":0}]},"20112":{"name":"包子","plant":[{"plantID":10101,"num":2},{"plantID":10103,"num":1}]},"20113":{"name":"南瓜饼","plant":[{"plantID":10101,"num":2},{"plantID":10105,"num":1}]},"20114":{"name":"豆瓣酱","plant":[{"plantID":10102,"num":2},{"plantID":10106,"num":2}]},"20115":{"name":"什锦果汁","plant":[{"plantID":10107,"num":2},{"plantID":10108,"num":2}]},"20116":{"name":"酱油","plant":[{"plantID":10101,"num":2},{"plantID":10102,"num":2}]},"20117":{"name":"大豆油","plant":[{"plantID":10102,"num":4},{"plantID":"","num":0}]},"20118":{"name":"啤酒","plant":[{"plantID":10101,"num":4},{"plantID":"","num":0}]},"20119":{"name":"葡萄酒","plant":[{"plantID":10108,"num":4},{"plantID":"","num":0}]},"20120":{"name":"豆腐乳","plant":[{"plantID":20103,"num":2},{}]}}'

if ($.isNode() && process.env.yyxnyhd) {
  if (process.env.yyxnyhd.indexOf('@') > -1) {
    yyxnyhdArr = process.env.yyxnyhd.split('@');
  } else if (process.env.yyxnyhd.indexOf('\n') > -1) {
    yyxnyhdArr = process.env.yyxnyhd.split('\n');
  } else {
    yyxnyhdArr = [process.env.yyxnyhd]
  }
}

!(async() => {
  if (typeof $request !== "undefined") {
    yyxnyck()
  } else {
      if(!$.isNode()){
          yyxnyhdArr.push($.getdata('yyxnyhd'))
          let yyxnycount = ($.getval('yyxnycount') || '1');
          for (let i = 2; i <= yyxnycount; i++) {
            yyxnyhdArr.push($.getdata(`yyxnyhd${i}`))
            }
    console.log(`------------- 共${yyxnyhdArr.length}个账号-------------\n`)
      for (let i = 0; i < yyxnyhdArr.length; i++) {
        if (yyxnyhdArr[i]) {
          yyxnyhd = yyxnyhdArr[i];
          $.index = i + 1;
        
          console.log(`\n开始【爷爷的小农院${$.index}】`)
      await account()
      $.log("\n开始收获农产品\n")
      await harvestAll(arr)
      $.log("\n开始收取加工品\n")
      await oemHarvestAll(arr)
      await allAcc()
      //await unlockLandAll(arr)
      //await unlockKitchenAll(arr)
      //await unLockPlanAll()
      await Order()
      await bank()
      await used()
      for (let j = 0; j < 10; j++) {
        await updateLevel("house")
        await updateLevel("kitchen")
        await updateLevel("road")
        await updateLevel("stall")
        await updateLevel("warehouse")
      }
      await task()
      await exchangeOrder()
      await stallShopping()
      await visitor()
  }
 }
 }
 }
})()
  .catch ((e) => $.logErr(e))
  .finally(() => $.done())


function yyxnyck() {
  if ($request.url.indexOf("sync") > -1) {
     const yyxnyhd = JSON.stringify($request.headers)
     if (yyxnyhd) $.setdata(yyxnyhd, `yyxnyhd${status}`)
     $.log(yyxnyhd)
     $.msg($.name, "", '爷爷的小农院' + `${status}` + '数据获取成功！')
   }
}

function account() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/account`,
      headers: JSON.parse(yyxnyhd),
      body: "null",
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          bankNoteCount = result.result.userMessage.bankNoteCount
          money = result.result.userMessage.money
          redBagTotal = result.result.userMessage.redBagTotal
          nickname = result.result.userMessage.nickName
          $.log(`欢迎你：${nickname}\n当前资产：\n金钱：${bankNoteCount}\t存钱罐：${money}\t余额：${redBagTotal}`)
          num = redBagTotal * 0.0001
          $.log("\n可提金额约：" + num.toFixed(2)+"元\n")
          if (redBagTotal >= 3000) {}
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function Order() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/message?`,
      headers: JSON.parse(yyxnyhd),
      //body: `{"isVideo":true}`,
    }
    $.get(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.redBagOrderFin == false) {
            $.log("\n当前订单等级：" + result.result.redBagOrderLevel+"\n")
            const productsJSON = JSON.parse(products)
            const OrderList = result.result.redBagOrderConf.list
            const harvests = result.result.harvests
            const oemharvests = result.result.oemHarvests
            const oemConfJSON= JSON.parse(oemConf)
            OrderList.forEach(function(OrderListitem) {
              harvests.forEach(function(harvestsitem) {
                if (harvestsitem.index == OrderListitem.index) {
                  $.log("货物：" + productsJSON[OrderListitem.index] + "\t需求：" + OrderListitem.count + "\t库存：" + harvestsitem.count)
                  if(harvestsitem.count<OrderListitem.count){
                      plantAll(arr,OrderListitem.index)                  
                  }
                }
              })
              oemharvests.forEach(function(oemharvestsitem) {
                if (oemharvestsitem.index == OrderListitem.index) {
                  $.log("货物：" + productsJSON[OrderListitem.index] + "\t需求：" + OrderListitem.count + "\t库存：" + oemharvestsitem.count)
                  if(oemharvestsitem.count<OrderListitem.count){
                    harvests.forEach(function(harvestsitem){
                        if(harvestsitem.count<oemConfJSON[oemharvestsitem.index].plant[0].num){
                            plantAll(arr,oemConfJSON[oemharvestsitem.index].plant[0].plantID)
                        }
                        if(oemConfJSON[oemharvestsitem.index].plant[1].num==0){}
                        else if(harvestsitem.count<oemConfJSON[oemharvestsitem.index].plant[1].num){
                            plantAll(arr,oemConfJSON[oemharvestsitem.index].plant[1].plantID)
                        }
                      })
                        makeKitchenAll(arr,OrderListitem.index)
                  }
                }
              })
            })
            $.log("\n下一订单等级：" + result.result.redBagOrderNext.level+"\n")
            const OrderListNext = result.result.redBagOrderNext.list
            OrderListNext.forEach(function(OrderListNextItem){
              harvests.forEach(function(harvestsitem) {
                if (harvestsitem.index == OrderListNextItem.index) {
                  $.log("货物：" + productsJSON[OrderListNextItem.index] + "\t需求：" + OrderListNextItem.count + "\t库存：" + harvestsitem.count)
                  if(harvestsitem.count<OrderListNextItem.count){
                      plantAll(arr,OrderListNextItem.index)
                  }
                }
              })
              oemharvests.forEach(function(oemharvestsitem) {
                if (oemharvestsitem.index == OrderListNextItem.index) {
                  $.log("货物：" + productsJSON[OrderListNextItem.index] + "\t需求：" + OrderListNextItem.count + "\t库存：" + oemharvestsitem.count)
                  if(oemharvestsitem.count<OrderListNextItem.count){
                      harvests.forEach(function(harvestsitem){
                          if(harvestsitem.count<oemConfJSON[oemharvestsitem.index].plant[0].num){
                              plantAll(arr,oemConfJSON[oemharvestsitem.index].plant[0].plantID)
                          }
                          if(oemConfJSON[oemharvestsitem.index].plant[1].num==0){}
                          else if(harvestsitem.count<oemConfJSON[oemharvestsitem.index].plant[1].num){
                              plantAll(arr,oemConfJSON[oemharvestsitem.index].plant[1].plantID)
                          }
                      })
                        makeKitchenAll(arr,OrderListNextItem.index)
                  }
                }
              })              
            })
            $.log("\n")
          }
          else{
            $.log("\n当前等级订单可以完成，下次运行自动处理\n")
          }
          } else {
            console.log(`\n${result.message}`)
          }
        } catch (e) {
          $.logErr(e, response);
        } finally {
          resolve();
      }
    })
  })
}

function allAcc() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/allAcc`,
      headers: JSON.parse(yyxnyhd),
      body: `{"isVideo": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.moneyAdd == true) {
            $.log("\n全体加速成功，存钱罐增加：" + result.result.moneyIncrease)
          }
        } else {
          console.log(`\n全体加速：${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function harvestAll(Array){
    for(const i of Array){
        await harvest(i)
        await $.wait(Math.floor(Math.random() * 100) + 1000)
    }
}

function harvest(landIndex) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/harvest`,
      headers: JSON.parse(yyxnyhd),
      body: `{"landIndex": ${landIndex}}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log(`${landIndex+1}号地收割成功，收获红包：${result.result.redBagIncrease}\t金币：${result.result.bankNoteIncrease}`)
        } else {
          console.log(`${landIndex+1}号地${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function oemHarvestAll(Array){
    for(const i of Array){
        await oemHarvest(i)
        await $.wait(Math.floor(Math.random() * 100) + 1000)
    }
}

function oemHarvest(kitchenId) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/oemHarvest`,
      headers: JSON.parse(yyxnyhd),
      body: `{"kitchenId": ${kitchenId}}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log(`${kitchenId+1}号灶台，收菜红包增加： + ${result.result.redBagIncrease}`)
        } else {
          console.log(`${kitchenId+1}号灶台，${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function plantAll(Array,seedIndex){
    for(const i of Array){
        await plant(i,seedIndex)
        await $.wait(Math.floor(Math.random() * 100) + 1000)
    }
}

function plant(landIndex, seedIndex) {
  return new Promise((resolve) =>{
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/plant`,
      headers: JSON.parse(yyxnyhd),
      body: `{"landIndex": ${landIndex},"seedIndex": ${seedIndex}, "isVideo": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        const productsJSON = JSON.parse(products)
        if (logs) $.log(data)
        if (result.code == 0) {
          console.log(`${landIndex+1}号地播种${productsJSON[seedIndex]}成功，成熟时间：${result.result.landMessage.countdown}秒`)
          await $.wait(Math.floor(Math.random() * 100) + 1000)
        } else {
          //console.log(`${landIndex+1}号地${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function makeKitchenAll(Array,oemId){
    for(const i of Array){
        await makeKitchen(i,oemId)
        await $.wait(Math.floor(Math.random() * 100) + 1000)
    }
}

function makeKitchen(kitchenId,oemId) {
  return new Promise((resolve) => {
    let nm = {
    url: `https://bp-api.coohua.com/bubuduo-yydxny/game/makeKitchen`,
    headers: JSON.parse(yyxnyhd),
    body: `{"oemId": ${oemId},"kitchenId": ${kitchenId}}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        const productsJSON = JSON.parse(products)
        if (result.code == 0) {
          $.log(`${kitchenId+1}号厨房制作${productsJSON[oemId]}成功，成熟时间： + ${result.result.kitchenMessage.countdown}秒`)
        } else {
          //console.log(`${kitchenId+1}号厨房，${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function unlockLandAll(Array){
  for(const i of Array){
    await unlockLand(i)
    await $.wait(Math.floor(Math.random() * 100) + 1000)
  }
}

function unlockLand(landIndex) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/unlock`,
      headers: JSON.parse(yyxnyhd),
      body: `{"landIndex": ${landIndex},"video": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.landMessage.unlock == true) {
            console.log(`土地解锁成功`)
          }
        } else {
            return;
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

//待查
async function unlockKitchenAll(Array){
  for(const i of Array){
    await unlockKitchen(i)
    await $.wait(Math.floor(Math.random() * 100) + 1000)
  }
}

function unlockKitchen(kitchenId) {
  return new Promise((resolve) => {
    let nm = {
      url: `https: //bp-api.coohua.com/bubuduo-yydxny/game/unlockKitchen`,
      headers: JSON.parse(yyxnyhd),
      body: `{"kitchenId":${kitchenId},"video": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.landMessage.unlock == true) {
            $.log("灶台解锁成功 红包增加：" + result.result.redBagIncrease)
          }
        } else {
            return
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

async function unLockPlanAll(){
  const productsJSON = JSON.parse(products)
  for(var key in productsJSON){
    await unLockPlant(key)
  }
}

function unLockPlant(seedIndex) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/unLockPlant`,
      headers: JSON.parse(yyxnyhd),
      body: `{"seedIndex": ${seedIndex}}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const productsJSON = JSON.parse(products)
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
            $.log(productsJSON[seedIndex] + result.result.unlockSeed)
        } else {
          return
          //console.log(`\n${productsJSON[seedIndex]}:${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function bank() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/sync/guide/bank`,
      headers: JSON.parse(yyxnyhd),
      body: `9999`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log("金钱增加：" + result.result.bankNoteIncrease)
        } else {
          return
          //console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}


function used() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/cloud/used`,
      headers: JSON.parse(yyxnyhd),
      body: `{"isVideo": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.moneyAdd == true) {
            $.log("存钱罐增加：" + result.result.moneyIncrease)
          }
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function updateLevel(a) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/yard/updateLevel?name=${a}&isVideo=true`,
      headers: JSON.parse(yyxnyhd),
    }
    $.get(nm, async(error, response, data) => {
      //console.log(`${JSON.stringify(nm)}`)
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          if (result.result.success == true) {
            $.log("红包增加：" + result.result.redBagIncrease)
          }
        } else {
          return
          //console.log(`\n${result.message}已满级`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function task() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/task/getHomePageTask`,
      headers: JSON.parse(yyxnyhd),
      body: `{}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          tasklist = result.result.homePageTask.homePage
          for (let i = 0; i < tasklist.length; i++) {
            tkid = tasklist[i].taskId
            await dotask(tkid)
          }
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function dotask(taskId) {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/task/finish/daily?taskId=${taskId}&video=true`,
      headers: JSON.parse(yyxnyhd),
      //body: `{}`,
    }
    $.get(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log("领取红包：" + result.result.amount)
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function exchangeOrder() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/exchangeOrder`,
      headers: JSON.parse(yyxnyhd),
      body: `{}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          console.log(`订单成功获得红包：${result.result.redBagIncrease}\n下一等级： ${result.result.redBagOrderLevel}下一等级红包：${result.result.redBagOrderConf.amount}`)
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}
  

function stallShopping() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/stallShopping`,
      headers: JSON.parse(yyxnyhd),
      //body: `{}`,
    }
    $.get(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log("领取红包：" + result.result.redBagIncrease)
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}
  
function visitor() {
  return new Promise((resolve) => {
    let nm = {
      url: `https://bp-api.coohua.com/bubuduo-yydxny/game/visitor`,
      headers: JSON.parse(yyxnyhd),
      body: `{"video": true}`,
    }
    $.post(nm, async(error, response, data) => {
      try {
        const result = JSON.parse(data)
        if (logs) $.log(data)
        if (result.code == 0) {
          $.log("领取存钱罐：" + result.result.moneyIncrease)
        } else {
          console.log(`\n${result.message}`)
        }
      } catch (e) {
        $.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
