<template>
  <div class="calendar">

    <div class="nav">
      <div class="prev" @click="prevMouth()" > < </div>
      <div class="title">{{year}} - {{mouth}}</div>
      <div class="next" @click="nextMouth()"> > </div>
    </div>
    <ul class="days"
        v-tap="bigtouch"
        v-longtap="{fn:bigtouch,name:'长按'}"
        v-swipeleft="{fn:bigtouch,name:'左滑'}"
        v-swiperight="{fn:bigtouch,name:'右滑'}"
        v-swipeup="{fn:bigtouch,name:'上滑'}"
        v-swipedown="{fn:bigtouch,name:'下滑'}"

        v-if="isShowBig"

    >
      <li>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        <div>日</div>
      </li>
      <li v-for="sort in daysList" >
        <div v-for="obj in sort" :style="{background:getBackground(obj.type)}"> {{obj && obj.day}}</div>
      </li>
    </ul>

    <ul class="nealyDays"
        v-tap="smalltouch"
        v-longtap="{fn:smalltouch,name:'长按'}"
        v-swipeleft="{fn:smalltouch,name:'左滑'}"
        v-swiperight="{fn:smalltouch,name:'右滑'}"
        v-swipeup="{fn:smalltouch,name:'上滑'}"
        v-swipedown="{fn:smalltouch,name:'下滑'}"
        v-if="!isShowBig">
      <li>
        <div v-for="obj in nearlyDayList.weekList"
             :style="{background:getBackground(obj.type)}">
          {{obj && obj.week}}
        </div>
      </li>
      <li>
        <div v-for="obj in nearlyDayList.dayList"
             :style="{background:getBackground(obj.type)}">
          {{obj && obj.day}}
        </div>
      </li>
    </ul>


  </div>
</template>

<script>

  import Moment from "moment";
  import '@/js/utils/vueTouch';

  const WEEK = ["日","一","二","三","四","五","六"]

  export default {
    name:"calendar",
    data(){
        return {
          dateString:"",
          date:new Date(), //Date
          year:0, //年
          mouth:0, //月
          week:0, //周 0（周日） 到 6（周六）
          day:0, //日
//          hour:0, //小时
//          minute:0, //分钟
//          second:0, //秒数
          daysList:[], //日历
          nearlyDayList:{
            weekList:[],
            dayList:[]
          },
          isShowBig:true,
          allDayNum:0, //每个月的总天数
        }
    },

    created(){

      let data = Moment().format("YYYY-MM-DD")
      this.initDate(data);


      this.getNearlyDays();


    },
    methods:{

      bigtouch:function(s,e){

        let funName = s.name;

        console.log("bigtouch",funName)

        if(funName == '上滑'){
          this.isShowBig=false;
        }

      },

      smalltouch:function(s,e){

        console.log("smalltouch","---->",s.name);
        let funName = s.name;
        if(funName == '下滑'){
          this.isShowBig = true;
        }

      },

      getBackground(type){
        let color;
        if(type == 'current'){
          color='white'
        }else if(type == 'today'){
          color='red'
        }else{
          color='rgba(128, 128, 128, 0.2)'
        }

        return color;


      },


      initDate(data){

        this.dateString = data;
        this.date = new Date(data);
        this.year = this.date.getFullYear();
        this.mouth = this.date.getMonth()+1;
        this.day = this.date.getDate();
        this.week = this.getWeek(this.year, this.mouth,this.day);

//        this.hour=this.date.getHours(); //小时
//        this.minute=this.date.getMinutes(); //分钟
//        this.second=this.date.getSeconds(); //秒数
        this.allDayNum=new Date(this.year,this.mouth,0).getDate(); //每个月的总天数

        this.setDateList()


      },


      prevMouth(){
        this.initDate(Moment(this.dateString).subtract(1, 'M').format("YYYY-MM-DD"))
      },
      nextMouth(){
        this.initDate(Moment(this.dateString).add(1, 'M').format("YYYY-MM-DD"))
      },


      /**
      * 根据日期得到week
      * */
      getWeek(year,mouth,day){
        return (new Date(year+"-"+mouth+"-"+day).getDay() || 7) -1;
      },
      getDayNum(){
        new Date(this.year,this.mouth,0).getDate(); //每个月的总天数
      },



      setDateList(){

        var firstWeek = this.getWeek(this.year,this.mouth,1);
        var preMouthDays = Moment().subtract(1,'M').daysInMonth();


        //上个月
        for(var i=firstWeek-1;i>=0;i--){
          this.daysList[i]={day:(preMouthDays--),type:'pre'};
        }

        //本月
        for(var i=0;i<this.allDayNum;i++){

          let day = i+1;
          let type = Moment().format("YYYY-MM-DD") == Moment(this.year+"-"+this.mouth+"-"+day).format("YYYY-MM-DD")?'today':'current';

          this.daysList[i+firstWeek]={day,type};
        }

        var nextDay=1;
        var allDay = this.allDayNum+firstWeek>35?42:35 ;

        // 下个月
        for(var i=firstWeek+ this.allDayNum;i<allDay;i++){
          this.daysList[i]={day:nextDay++,type:'next'};
        }
        this.daysList = _.chunk(this.daysList,7)

      },

      getNearlyDays(){


        for(let i=-3;i<=3;i++){
          let _day = 0,_m,_week;

          if(i<0){
            _m =  Moment().subtract((-i),'day');
          }else{
            _m = Moment().add((i),'day');
          }

          _day =_m.date();
          _week = _m.days();
          let type = Moment().format("YYYY-MM-DD") == Moment(this.year+"-"+this.mouth+"-"+_day).format("YYYY-MM-DD")?'today':'current';


          this.nearlyDayList.dayList.push({day:_day,type});
          this.nearlyDayList.weekList.push({week:WEEK[_week],type});

        }





      },



    }


  }



</script>

