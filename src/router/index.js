import Vue from 'vue';
import VueRouter from 'vue-router';

import List from '../components/List.vue';
import Person from '../components/Person.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: List },
    { path: '/person/:id', component: Person },
    { path: '*', component: NotFound },
  ],
});
