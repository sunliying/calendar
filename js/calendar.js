/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-19 13:51:27
 * @version $Id$
 */
//取元素可内置通用函数来设置
function g(selector){
    var first=selector.substr(0,1);
    if(first=="#"){
        method="getElementById";(selector.slice(1));
    }else if(first=="."){
        method="getElementsByClassName";
    }else{
        method="getElementsByTagName";
    }
    return document[method](selector.substr(1));
}
var warpper=(function(){
	var calendar=g("#calendar");
	var title=calendar.getElementsByTagName("h3").item(0).getElementsByTagName("div").item(0);
	var spans=calendar.getElementsByTagName("h3").item(0).getElementsByTagName("span");
	var time=document.forms[0].elements[0];  //取得表单元素
	var oUl=document.createElement("ol");   
	var currentData=new Date;               //控制外部的月份变化
	var currentYear=currentData.getFullYear();               //年份最初是固定不变的
	var currentMonth=currentData.getMonth();
    change(currentMonth);
 /*   spans[0]=true;                很无奈，这段代码为什么不管用？？？？？？？？？？返回的是一个元素，现将其置为一个布尔值，原值丢失。
    spans.onclick=function(){
    	if (spans[0]) {
    		change(--currentMonth);
    	}else{
    	  change(++currentMonth);	
    	}
    }  */
    time.onfocus=function(){
   //time.onclick=function(){
      calendar.style.display="block";
    }
	spans[0].onclick=function(){
        change(--currentMonth);           //传入变化的月
	}
	spans[1].onclick=function(){
        change(++currentMonth);
	}              
	function  change(month){    //整体与单页的分离
		oUl.innerHTML="";                    //是列表每次变化前清空
	    var activeData=new Date(currentYear,month,1);           //得到外部传入的所需的年月
        var year=activeData.getFullYear();
        var month=activeData.getMonth();
        title.innerHTML=year+"年"+(month+1)+"月";	//动态生成标题，注意月份从零开始
        //注意getDay和getDate的区别，先找出当月中的一号
	    var diff=1-activeData.getDay();  //getDay找出了它所在的周，用一减就得到了循环遍历的开始
	    activeData.setDate(diff);   //使时间重置为第一个，这时候已经在次set了，下面不便用上面得到的年月；
        for (var i = 0; i < 42; i++) {     //循环总共进行42次
            oLi=document.createElement("li");
            var date=activeData.getDate();
            oLi.innerHTML=date;
            //oLi.dateValue=year+"-"+(month+1)+"-"+date;       //这样写月份不对
            oLi.dateValue=activeData.getFullYear()+"-"+(activeData.getMonth()+1)+"-"+date;   //这样写才对
            if(activeData.getMonth()!=month){        //因为setData在不断累加，所以activeDate所指的某一天可以不属于当前月份
            	oLi.style.color="#fff";
            }
            oLi.onclick=function(){
                time.value=this.dateValue;    
            	calendar.style.display="none";
            }
/*            oLi.onclick=function(){
                time.value=year+"-"+(month+1)+"-"+date;    //value不会随着onclick的变化而变化。。。而且还不对，为什么？？？
            	calendar.style.display="none";              //他们不是在同一时间点上运行的，此次调用需要计算。。。
            }                 */
            activeData.setDate(date+1);
            oUl.appendChild(oLi);     //逐个添加
    	 };
        calendar.appendChild(oUl);  
    }
})();
//1.外部封装自执行函数。
//2.内部封装一个传入一个月份就能表示此月份的日期的函数
//3.设置控制月份变化的变量，将左右键绑定事件，调用上述函数并传入变量
//4.整个日历都是可以动态创建的，利用calendar=document.createElement("div");calendar.id="calendar";document.appendChild(calendar);
//注意创建的内容是要加引号的，变量不加。设置属性不加括号。
//还有一个问题，无法在点击其他地方时日历消失。。。。。。
//这么吊的sublime