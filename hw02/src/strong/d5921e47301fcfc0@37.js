function _1(md){return(
md`# HW2 Strong baseline-1 (1pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _cons(data){return(
data.map(item => item.Constellation)
)}

function _5(yCounts,cons,data)
{
  yCounts.length = 0;
  let minCons = Math.min(...cons);
  let maxCons = Math.max(...cons);
  let constellation = ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]

  constellation.forEach(function(element) {
    yCounts.push({constellation:constellation.indexOf(element), gender:"male", count:0, consName: element});
    yCounts.push({constellation:constellation.indexOf(element), gender:"female", count:0, consName: element})
  })
  data.forEach(x => {
    let i = (x.Constellation - minCons) * 2 + (x.Gender == "男"? 0:1);
    yCounts[i].count++;
  })
  return yCounts
}


function _6(Plot,yCounts){return(
Plot.plot({
  grid: true,
  y: {label: "count"},
  x: {label: "constellation",
      domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
     },
  marks: [
    Plot.barY(yCounts, {x: "consName", y: "count" ,tip: true , fill:"gender"}),
    Plot.ruleY([0])
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("cons")).define("cons", ["data"], _cons);
  main.variable(observer()).define(["yCounts","cons","data"], _5);
  main.variable(observer()).define(["Plot","yCounts"], _6);
  return main;
}
