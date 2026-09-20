import Vue from 'vue';
import VueRouter from 'vue-router';
import TodosIssues from '@/views/TodosIssues';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/todos-issues' },
  { path: '/todos-issues', name: 'TodosIssues', component: TodosIssues },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
