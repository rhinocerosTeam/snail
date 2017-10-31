<template>
  <div>

    <div class="nav">
      <div class="prev"></div>
      <div class="title">{year} - {mouth} - {day}</div>
      <div class="next"></div>
    </div>
    <ul class="week">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul class="days">
      <li v-for="obj in daysList">
        {obj.text}
      </li>
    </ul>

  </div>
</template>

<script>


  export default {
    name:"日历",
    data(){
        return {
          date:new Date(),
          year:this.date.getFullYear(),
          mouth:this.date.getMonth(),
          week:this.date.getDay(),
          day:this.date.getDate(),
          hour:this.date.getHours(),
          minute:this.date.getMinutes(),
          second:this.date.getSeconds(),
          daysList:[],
          

        }
    },

    methods:{




      setDateList(){

        let index = 0;


      }


    }


  }



</script>

