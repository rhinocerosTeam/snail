import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import calendar from '@/components/common/calendar';
import planRouter from './plan';
import _ from 'lodash';

Vue.use(Router)

export default new Router({
  routes: _.union(
    [
      {
        path: '/',
        name: 'Hello',
        component: HelloWorld
      },
    ],
    planRouter)


})
