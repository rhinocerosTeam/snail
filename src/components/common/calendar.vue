<template>
  <div class="calendar">

    <div class="nav">
      <div class="prev"></div>
      <div class="title">{{year}} - {{mouth}} - {{day}}</div>
      <div class="next"></div>
    </div>
    <ul class="week">
      <li>
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </li>
    </ul>
    <ul class="days">



      <li v-for="sort in daysList">

        <div v-for="obj in sort" :style="{background:obj.type != 'this'?'rgba(128, 128, 128, 0.2)':'white'}"> {{obj && obj.day}}</div>
      </li>
    </ul>

  </div>
</template>

<script>

  import Moment from "moment";

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
          allDayNum:0, //每个月的总天数
        }
    },

    mounted(){

      this.year = this.date.getFullYear();
      this.mouth = this.date.getMonth();
      this.week = this.date.getDay();
      this.day = this.date.getDate();
      this.hour=this.date.getHours(); //小时
      this.minute=this.date.getMinutes(); //分钟
      this.second=this.date.getSeconds(); //秒数
      this.allDayNum=new Date(this.year,this.mouth,0).getDate(); //每个月的总天数


      this.setDateList();



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

      }


    }


  }



</script>

