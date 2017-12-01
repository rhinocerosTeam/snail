
<template>
  <div class="addPlan">
    增加计划{{title}}

  </div>
</template>

<script>


  import {param2} from '@/constant/export'
  import p1 , * as ALLParam  from '@/constant/export'

 // param1 = '333';

  console.log("param2---->",param2)
  console.log("p1",p1)
  console.log("ALLParam--->",ALLParam)


  export default {
    name:"增加计划",

    data(){
      return {
        title:"12312312",
      }
    }


  }
</script>
