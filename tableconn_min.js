var Tableconn=function(e,t,n){function i(e){r.url="",r.sql="select *",r.as_feeds=!1,r.gdata=!1,r.parsed=[];for(arg in r)e[arg]!==undefined&&(r[arg]=e[arg])}function s(){var e=r.url.match(/http(s)*:/)?r.url.match(/key=(.*?)(&|#)/i)[1]:r.url,t=r.as_feeds?"feeds/cells/"+e+"/od6/public/basic?":"tq?out=json&key="+e+"&";return"http://spreadsheets.google.com/"+t+"tq="+encodeURIComponent(r.sql)+"&alt=json-in-script&callback=Tableconn.set_gdata"}function o(e){return e.title.$t.length==2&&e.title.$t.substr(1,1)=="1"}function u(e){return e.title.$t.charAt(0)}var r={};return r.set_gdata=function(e){r.gdata=e},typeof this.google=="undefined"&&(this.google={visualization:{Query:{setResponse:r.set_gdata}}}),r.load=function(e,n){i(e);var o=t.createElement("script");o.type="text/javascript",o.src=s()+"&s_id="+(new Date).getTime(),t.getElementsByTagName("head")[0].appendChild(o),safetyCounter=0;var u=setInterval(function(){if(safetyCounter++>20||r.gdata)clearInterval(u),r.parse_raw_data(r.gdata,n)},200)},r.filter=function(e,t){var n=[];for(var i=0;i<r.parsed.length;i++){var s=0;for(param in e)r.parsed[i][param]!==undefined&&r.parsed[i][param]==e[param]&&s++;s>0&&n.push(r.parsed[i])}t(n)},r.prototype={constructor:Tableconn,version:"0.0.1pre"},r.parse_raw_data=function(e,t){function s(e,t,n){typeof r.parsed[e]=="undefined"&&(r.parsed[e]={}),r.parsed[e][t]=n||null}if(e.status=="error")return t(e.errors[0]),!1;var n=r.as_feeds?e.feed.entry:e.table.rows,i={};r.parsed=[];for(var a=0;a<n.length;a++)if(r.as_feeds)o(n[a])?i[u(n[a])]=n[a].content.$t:s(parseInt(n[a].title.$t.substr(1)),i[u(n[a])],n[a].content.$t);else for(var f=0;f<n[a].c.length;f++)s(a,e.table.cols[f].label,n[a].c[f]?n[a].c[f].v:null);r.as_feeds&&r.parsed.splice(0,2),t(r.parsed)},r}(window,document,Tableconn);window.Tableconn=window.TC=Tableconn