// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/LoginRouter'

//ele ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import axios from 'axios';//cnpm install axios qs -S
Vue.prototype.$http = axios;

//vuex npm install vuex --save
import Vstore from './store/index'

//icon
import './Utils/iconfont'

//滑块组件
import VueSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueSwiper);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store:Vstore,
  render:h=>h(App)
})
