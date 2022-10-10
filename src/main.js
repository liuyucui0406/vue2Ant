import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router/index.js'
import store from './store/index.js'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
