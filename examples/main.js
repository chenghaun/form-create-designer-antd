/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:17:33
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-06 15:15:11
 * @Description: 
 * @contact_information: ext.chenghuan8@jd.com
 */
import {createApp} from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import formCreate from '@form-create/ant-design-vue';
import App from './App.vue';
import FcDesigner from '../src/index';

const app = createApp(App);

app.use(Antd);
app.use(formCreate);
app.use(FcDesigner);


app.mount('#app')
