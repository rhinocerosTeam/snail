
<template>
  <div class="addPlan">
    增加计划{{title}}

  </div>
</template>

<script>

  import conf from '@/constant/export'


  import * as param from '@/constant/export-default'
  import paramDefault from '@/constant/export-default'


  import {param1,param2} from '@/constant/export-default'

  console.log("conf---->",conf)
  console.log("param---->",param)
  console.log("paramDefault---->",paramDefault)
  console.log("param1,param2---->",param1,param2)

  export default {
    name:"增加计划",

    data(){
      return {
        title:"12312312",
      }
    }


  }
</script>
