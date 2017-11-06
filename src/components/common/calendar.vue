<template>
  <div class="calendar">

    <div class="nav">
      <div class="prev"></div>
      <div class="title">{{year}} - {{mouth}} - {{day}}</div>
      <div class="next"></div>
    </div>
    <ul class="days">
      <li>
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </li>
      <li v-for="sort in daysList">
        <div v-for="obj in sort" :style="{background:obj.type != 'this'?'rgba(128, 128, 128, 0.2)':'white'}"> {{obj && obj.day}}</div>
      </li>
    </ul>

    <ul class="nealyDays">
      <li>
        <div v-for="obj in nearlyDayList.weekList" :style="{background:obj.type != 'this'?'rgba(128, 128, 128, 0.2)':'white'}"> {{obj && obj.week}}</div>
      </li>
      <li>
        <div v-for="obj in nearlyDayList.dayList" :style="{background:obj.type != 'this'?'rgba(128, 128, 128, 0.2)':'white'}"> {{obj && obj.day}}</div>
      </li>
    </ul>


  </div>
</template>

<script>

  import Moment from "moment";
  const WEEK = ["日","一","二","三","四","五","六"]

  export default {
    name:"calendar",
    data(){
        return {
          date:new Date(), //Date
          year:0, //年
          mouth:0, //月
          week:0, //周 0（周日） 到 6（周六）
          day:0, //日
          hour:0, //小时
          minute:0, //分钟
          second:0, //秒数
          daysList:[], //日历
          nearlyDayList:{
            weekList:[],
            dayList:[]
          },
          allDayNum:0, //每个月的总天数
        }
    },

    created(){

      this.year = this.date.getFullYear();
      this.mouth = this.date.getMonth();
      this.week = this.date.getDay();
      this.day = this.date.getDate();
      this.hour=this.date.getHours(); //小时
      this.minute=this.date.getMinutes(); //分钟
      this.second=this.date.getSeconds(); //秒数
      this.allDayNum=new Date(this.year,this.mouth,0).getDate(); //每个月的总天数


      this.setDateList();

      this.getNearlyDays();


    },
    methods:{

      /*
      * 根据日期得到week
      * */
      getWeek(year,mouth,day){
        return new Date(year,mouth,day).getDay();
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
          this.daysList[i+firstWeek]={day:(i+1),type:'this'};
        }

        var nextDay=1;

        // 下个月
        for(var i=firstWeek+ this.allDayNum;i<35;i++){
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

          this.nearlyDayList.dayList.push({day:_day,type:'this'});
          this.nearlyDayList.weekList.push({week:WEEK[_week],type:'this'});

        }





      }




    }


  }



</script>

