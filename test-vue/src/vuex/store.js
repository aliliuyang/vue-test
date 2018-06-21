import Vue from 'vue'
import Vuex from 'Vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex);

const state = {
	shopID:null,//商品id
    shopcode:null,//商品编号
    shopname:null,//商品名称
    shopcolor:null,//商品颜色
    shopprice:null,//商品价格
    shopImg:null,
	goodDetails:{},
	carts:[],//购物车列表
	goods:[],
	shop_num:0,
	total:null,//总价
	carts:localStorage["carts"]?JSON.parse(localStorage["carts"]): [],
	orders:localStorage["orders"]?JSON.parse(localStorage["orders"]): [],
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
