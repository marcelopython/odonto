var D=Object.defineProperty,F=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var $=(a,e,t)=>e in a?D(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,p=(a,e)=>{for(var t in e||(e={}))z.call(e,t)&&$(a,t,e[t]);if(S)for(var t of S(e))P.call(e,t)&&$(a,t,e[t]);return a},h=(a,e)=>F(a,T(e));import{_ as m,G as C,S as w,j as r,k as d,l as s,w as g,U as I,Z as f,E as k,F as M,R as E,c as i,B as l,u as _,m as b,n,q as R,v,b as c}from"./index.e62267ef.js";import{_ as j}from"./PageWrapper.6420503f.js";import{P as V,h as O}from"./moment.c32dae88.js";import{B}from"./Modal.5f794cae.js";import{w as x}from"./multiselect.b7f78364.js";const U={class:"relative overflow-x-auto shadow-md sm:rounded-lg p-2"},Y={key:0,class:"flex"},q={class:"col-6 mb-3"},K=s("label",{for:"search",class:"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"},"Your Email",-1),L={class:"relative"},Z=s("div",{class:"flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"},[s("svg",{class:"w-5 h-5 text-gray-500 dark:text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})])],-1),G={class:"w-full text-sm text-left text-gray-500 dark:text-gray-400"},H=s("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[s("tr",null,[s("th",{scope:"col",class:"px-6 py-3"},"Nome"),s("th",{scope:"col",class:"px-6 py-3"},"Valor"),s("th",{scope:"col",class:"px-6 py-3"},"Valor Min."),s("th",{scope:"col",class:"px-6 py-3"},"Data"),s("th",{scope:"col",class:"px-6 py-3"},[s("span",{class:"sr-only"},"Edit")])])],-1),J={scope:"row",class:"px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"},Q={class:"px-6 py-4"},W={class:"px-6 py-4"},X={class:"px-6 py-4"},ee=s("td",{class:"px-6 py-4 text-right"},[s("a",{href:"#",class:"font-medium text-blue-600 dark:text-blue-500 hover:underline"},"Edit")],-1),te=new w,se={props:{load:{default:!1}},data(){return{dataservice:[],search:""}},components:{Buttons:m,Pagination:V},watch:{load:function(){this.load&&this.services()}},computed:h(p({},C(["permission"])),{getAnddress:function(){return(a,e=!0)=>{let t=a.neighborhood+" - "+a.street+" - "+a.number;return t.length>20&&e?t.slice(0,20)+"...":t}},formatMoney:function(){return a=>Number(a).toLocaleString(void 0,{maximumFractionDigits:2,minimumFractionDigits:2})}}),methods:{searchService(){setTimeout(()=>{this.services()},500)},async services(a="1"){let e="";a.url?e="service?page="+a.url.split("?page=")[1]:e="service?page="+a;let t="";return this.search.split("+").length>1?t=this.search.split("+")[1]:t=this.search,await te.get(e+"&search="+t).then(o=>{this.dataservice=o.data})},tooltipAddress(){const a=document.getElementsByClassName("tooltip-address"),e=document.getElementsByClassName("content-address"),t={placement:"bottom",triggerType:"hover"};[...a].forEach((o,u)=>{new Tooltip(o,e[u],t)})},async paginate(a){await this.services(a),this.tooltipAddress()}},async mounted(){this.permission("service.read")&&this.paginate(1)}},N=Object.assign(se,{name:"Index",setup(a){return(e,t)=>(r(),d("div",U,[e.permission("service.read")?(r(),d("div",Y,[s("div",q,[K,s("div",L,[Z,g(s("input",{onKeyup:t[0]||(t[0]=(...o)=>e.searchService&&e.searchService(...o)),"onUpdate:modelValue":t[1]||(t[1]=o=>f(search)?search.value=o:null),type:"search",id:"search",class:"block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Buscar",required:""},null,544),[[I,e.search]])])])])):k("",!0),s("table",G,[H,s("tbody",null,[(r(!0),d(M,null,E(e.dataservice.data,o=>(r(),d("tr",{class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",key:o.id},[s("th",J,l(o.name),1),s("td",Q,[s("span",null,l(e.formatMoney(o.amount)),1)]),s("td",W,[s("span",null,l(e.formatMoney(o.amount_min)),1)]),s("td",X,[s("span",null,l(_(O)(o.created_at).format("DD/MM/YYYY")),1)]),ee]))),128))])]),i(V,{onChangePage:e.paginate,links:e.dataservice.links},null,8,["onChangePage","links"])]))}});new w;const ae={class:"p-4 sm:p-6"},oe=s("h2",{class:"text-xl font-semibold leading-tight"},"Atendimentos",-1),re=c(" Or\xE7amento "),ne=s("div",{class:"mb-3"},[s("span",{style:{"margin-bottom":"15px"}},"1. Selecione o Paciente")],-1),le=s("div",{class:"mb-3"},[s("span",{style:{"margin-bottom":"15px"}},"2. Selecione o(s) servi\xE7o(s)")],-1),ie=s("div",{class:"mb-3"},[s("span",{style:{"margin-bottom":"15px"}},"3. Informe a quantidade por servi\xE7o")],-1),de=c(": "),ce=["onKeyup"],ue=s("div",{class:"mb-3"},[s("span",{style:{"margin-bottom":"15px"}},"4. Enviar para o cliente.")],-1),me={style:{width:"20%","margin-bottom":"15px"}},ge=s("label",{for:"amount",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"}," Desconto ",-1),pe={style:{display:"flex","justify-content":"space-around"}},he={style:{width:"45%"}},be=c("Valor "),ve={class:"bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900",style:{"font-size":"18px"}},ye=s("br",null,null,-1),fe=s("br",null,null,-1),ke=c("Enviar"),_e={style:{width:"45%"}},xe=c("M\xEDnimo "),we={class:"bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900",style:{"font-size":"18px"}},Se=s("br",null,null,-1),$e=s("br",null,null,-1),Ce=c("Enviar"),Me={class:"flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 mt-5"},Ee=s("button",{"data-modal-toggle":"extralarge-modal",type:"button",class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Cadastrar ",-1),y=new w,Ve={components:{Index:N,BaseModal:B,Multiselect:x},data(){return{customerSelected:null,serviceSelected:[],services:[],inCreate:!1,loadCreate:!1,loadList:!1,dataClassModal:null,customers:[]}},computed:h(p({},C(["permission"])),{nameService:function(){return a=>this.services.find(e=>{if(e.value==a)return e.name}).name},getAmount:function(){let a=0;return this.serviceSelected.forEach(e=>{let t=this.services.find(o=>o.value==e);console.log("service",t),a+=Number.parseFloat(t.amount)*+t.item}),a.toFixed(2)},getAmountMin:function(){let a=0;return this.serviceSelected.forEach(e=>{let t=this.services.find(o=>o.value==e);a+=Number.parseFloat(t.amount_min)*+t.item}),a.toFixed(2)}}),methods:{formatarMoeda(a){var e=a.target,t=e.value;t=t+"",t=parseInt(t.replace(/[\D]+/g,"")),t=t+"",t=t.replace(/([0-9]{2})$/g,",$1"),t.length>6&&(t=t.replace(/([0-9]{3}),([0-9]{2}$)/g,".$1,$2")),e.value=t,t=="NaN"&&(e.value="")},async sendZap({amount:a}){let e=await y.get("customer/show/"+this.customerSelected),t="";this.serviceSelected.forEach(A=>{t+=this.nameService(A)+", "});let o=`
            Ol\xE1 *${e.data.name.split(" ")[0]}*

_Segue nosso or\xE7amento_.

*Valor*: R$ ${a}

*Forma de pagamento*: Cart\xE3o / 3

*Servi\xE7o(s)*: ${t.slice(0,-2)}
        `,u=`https://web.whatsapp.com/send?phone=${e.data.phone}&text=`+window.encodeURIComponent(o);window.open(u,"_blank").focus()},changeTotal(a,e){this.services.find((t,o)=>{t.value==e&&(this.services[o].item=a)})},async getCustomer(){(await y.get("customer/list")).data.forEach(e=>{this.customers.push({value:e.id,name:e.name})})},async getServicies(){(await y.get("service/list")).data.forEach(e=>{this.services.push({value:e.id,name:e.name,amount:e.amount,amount_min:e.amount_min,item:1})})},modal(){const a=document.getElementById("modal-call"),e={placement:"bottom-left",backdropClasses:"bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",onHide:()=>{},onShow:()=>{this.data={name:null,amount:null,amount_min:null,description:null}},onToggle:()=>{console.log("modal has been toggled")}};return new Modal(a,e)},showModal(){this.dataClassModal=this.modal(),this.dataClassModal.show()},cancel(){this.dataClassModal.hide(),this.$emit("cancel")}},mounted(){this.getCustomer(),this.getServicies()}},ze=Object.assign(Ve,{name:"Call",setup(a){return(e,t)=>(r(),b(j,{title:"Atendimentos"},{header:n(()=>[s("div",ae,[oe,s("div",null,[e.permission("call.create")?(r(),b(m,{key:0,variant:"info",class:R("float-right mb-3"),onClick:e.showModal},{default:n(()=>[re]),_:1},8,["onClick"])):k("",!0)])])]),default:n(()=>[e.permission("call.read")?(r(),b(N,{key:0,load:e.loadList},null,8,["load"])):k("",!0),i(B,{size:"large",id:"modal-call",title:"Or\xE7amento"},{body:n(()=>[s("div",null,[ne,i(_(x),{modelValue:e.customerSelected,"onUpdate:modelValue":t[0]||(t[0]=o=>f(customerSelected)?customerSelected.value=o:null),placeholder:"Selecionar o Paciente","track-by":"name",label:"name","close-on-select":!0,search:!0,options:e.customers},null,8,["modelValue","options"])]),g(s("div",null,[le,i(_(x),{modelValue:e.serviceSelected,"onUpdate:modelValue":t[1]||(t[1]=o=>f(serviceSelected)?serviceSelected.value=o:null),mode:"tags",placeholder:"Selecionar os servi\xE7os","track-by":"name",label:"name","close-on-select":!1,search:!0,options:e.services},null,8,["modelValue","options"])],512),[[v,e.customerSelected]]),g(s("div",null,[ie,(r(!0),d(M,null,E(e.serviceSelected,o=>(r(),d("div",{style:{display:"inline-block","margin-left":"15px"},key:o},[s("strong",null,l(e.nameService(o)),1),de,s("input",{onKeyup:u=>e.changeTotal(u.target.value,o),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",type:"number",style:{width:"55px"},value:"1"},null,40,ce)]))),128))],512),[[v,e.serviceSelected&&e.serviceSelected.length]]),g(s("div",null,[ue,s("div",null,[s("div",me,[ge,s("input",{type:"tel",onKeyup:t[2]||(t[2]=(...o)=>e.formatarMoeda&&e.formatarMoeda(...o)),id:"amount_discount",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:""},null,32)])]),s("div",pe,[s("div",he,[s("span",null,[be,s("span",ve,"R$ "+l(e.getAmount),1)]),ye,fe,s("div",null,[i(m,{onClick:t[3]||(t[3]=o=>e.sendZap({amount:e.getAmount})),style:{width:"100%"},variant:"black"},{default:n(()=>[ke]),_:1})])]),s("div",_e,[s("span",null,[xe,s("span",we,"R$ "+l(e.getAmountMin),1)]),Se,$e,i(m,{onClick:t[4]||(t[4]=o=>e.sendZap({amount:e.getAmountMin})),style:{width:"100%"},variant:"black"},{default:n(()=>[Ce]),_:1})])])],512),[[v,e.serviceSelected&&e.serviceSelected.length]])]),footer:n(()=>[s("div",Me,[Ee,s("button",{"data-modal-toggle":"extralarge-modal",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",onClick:t[5]||(t[5]=(...o)=>e.cancel&&e.cancel(...o))}," Voltar ")])]),_:1})]),_:1}))}});export{ze as default};
