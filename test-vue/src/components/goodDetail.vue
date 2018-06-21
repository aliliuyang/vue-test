<template>
<div class="goodDetail" >
        <div class="goodDetailHeader">
            <a href="#" @click="fanhui">
                <i class="iconfont icon-552cc14536532"></i>
            </a>
                {{goodDetailHeader}}
        </div>
      <div class="goodDetailList">
            <ul style="background: white;">
                <li v-for="(good,index) in goods" :key="good.id">
                    <div class="goodDetaiSwipe">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item> <img v-bind:src="good.imgone" alt="图片"></mt-swipe-item>
                            <mt-swipe-item> <img v-bind:src="good.imgtwo" alt="图片"></mt-swipe-item>
                            <mt-swipe-item> <img v-bind:src="good.imgThree" alt="图片"></mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <div class="goodDetailMain">
                        <div class="gooDetailNumber">商品编号：{{good.number}}</div>
                        <div class="goodDetailName">{{good.name}}</div>
                        <div class="goodDetailColor">{{good.color}}</div>
                        <div class="goodDetailPaid">￥ {{good.price}}</div>
                         <!-- <div  class="goodDetailPaid" >￥{{paid}}</div> -->
                    </div>
                    
                    <div class="goodDetailValue">
                        <div class="_Value">购买数量：</div>
                        <div class="_cartNumber" style="margin-left: 2rem;">
                            <a href="javascript:;" @click="jian(index)" class="goodDetailReduce">-</a>
                            <input type="text"   :value="good.value" readonly="readonly"/>
                            <a href="javascript:;" @click="jia(index)" class="goodDetailAdd">+</a>
                        </div>
                    </div>
                    <div class="goodDetailBox">
                        <mt-navbar v-model="selected" >
                            <mt-tab-item id="tab-container1">图文详情</mt-tab-item>
                            <mt-tab-item id="tab-container2">商品配置</mt-tab-item>
                        </mt-navbar>


                        <mt-tab-container v-model="selected" swipeable>
                            <mt-tab-container-item id="tab-container1">
                               <div class="goodDetailImg">
                                   <p v-for="Image in good.Images">
                                       <img v-bind:src="Image.one" alt="详情图片">
                                    </p>
                                </div>
                            </mt-tab-container-item>

                                <mt-tab-container-item id="tab-container2">
                                    <div class="goodDetailPeizhi">
                                        <table style="width: 100%;border:1px solid #cccccc;margin-top: 5px;border-collapse: collapse;margin-bottom: 10px;" border="1">
                                            <tbody>
                                                <tr v-for="Peizhi in good.Peizhis">
                                                    <td style="width:26%;height:50px">{{Peizhi.left}}</td>
                                                    <td style="width:80%;height:50px">{{Peizhi.right}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </mt-tab-container-item>    

                        </mt-tab-container>

                    </div>
                    

                    <div class="goodDetailFooter">
                        <div class="add">
                            <a href="javascript:void(0);" @click="add_cart(good.value,good.id,good.number,good.name,good.color,good.price,good.imgone)">加入购物车</a>
                            <!-- <input type="button" value="加入购物车" @click="add(index)"> -->
                        </div>
                        <div class="purchase">
                             <a href="javascript:void(0);" @click="pay(index)">立即购买</a>
                        </div>
                    </div>
                    
                </li>
            </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui';  
import { TabContainer, TabContainerItem } from 'mint-ui';
    export default{
        name:"goodDetail",
        data(){
            return{
                active: '1',
                goodDetailHeader:'商品详情',
                selected:"tab-container1" ,
                goods:[]
            }
        },
        mounted:function(){
            this.getData()
        },
        computed:{
            ...mapGetters([
            	'total'
            ]),
            money(){
            	var m = 0;
            	for(var i in this.goods){
            		m += this.goods[i].value * this.goods[i].price;
            	}
            	return m
            }
        },
        methods:{
            // 本地写个json数据文件，模拟后台将数据渲染出来
            getData:function(){
                 var ID = this.$route.query.id;
                 var that = this;
                    axios.get("/static/goodDetail.json").then(function(res) {
                    	for(var i = 0;i < res.data.goodDetails.length;i++){
                    		if(res.data.goodDetails[i].id == ID){
                    			var goods = res.data.goodDetails[i]
                    			that.goods.push(goods)
                    		}
                    	}
                    })
            },
            ...mapMutations([
            	'ADD_CART','BUY'
            ]),
//          ...mapActions([
//          	"ADD_NUM",
//          ]),
            jia(index){
//          	this.ADD_NUM(index)
//          	this.$store.dispatch('add_num_action');
				this.goods[index].value ++
            },
            jian(index){
            	if(this.goods[index].value == 1){
            		this.goods[index].value =1
            	}else{
            		this.goods[index].value --
            	}
            },
            add_cart(shop_num,shopID,shopcode,shopname,shopcolor,shopprice,shopImg){
            	this.ADD_CART({shop_num,shopID,shopcode,shopname,shopcolor,shopprice,shopImg})
            },
            pay(index){
            	console.log(this.goods)
            	console.log(this.goods[index].value)
            	Toast({ message: `成功支付了${this.money}元`, iconClass: 'iconfont icon-goumaichenggong' ,duration: 750});
            	var data = {
            		"num":this.goods[index].value,
					"id":this.goods[index].id,
					"code":this.goods[index].number,
					"name":this.goods[index].name,
					"color":this.goods[index].color,
					"price":this.goods[index].price,
					'pic':this.goods[index].imgone
            	}
            	this.BUY(data)
            },
            //返回上一级
            fanhui:function(){
                this.$router.go(-1)
            },
            
        }
    }
</script>

<style>

.goodDetail{
   position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    background: white;
}
.goodDetailList{
    margin-bottom: 1rem;
}
.goodDetailHeader{
    width: 100%;
    z-index: 1;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 12px;
    background: white;
    position: fixed;
    box-shadow: 0 0 10px #cecece;
    text-align: center;
    font-size: 0.41rem;
   }
.goodDetailHeader i{
    display: block;
    float: left;
    height: 50px;
    padding-left: 0.3rem;
    font-size: 0.71rem;
    color: black;
}
   .goodDetaiSwipe{
       height: 11rem;
       margin-top: 3px;
       background: white;
   }
   .goodDetaiSwipe img{
        width: 70%;
        height: 7rem;
        display: block;
        /* margin-top: 60px; */
        margin: 80px auto;
   }
   .goodDetailMain{
       /* height: 1.8rem; */
       background: white;
       border-bottom: 1px solid #cecece;
       border-top: 1px solid #cecece;
       padding: 0.4rem;
   }
   goodDetailBox{
       height: 1px;
   }
   .goodDetailName{
        color: black;
        font-weight: 800;
        font-size: 0.35rem
   }
   .goodDetailPaid{
       color: red;
       font-size: 0.4rem;
   }
   .goodDetailFooter{
        position: fixed;
        width: 100%;
        bottom: 0rem;
        height: 1.3rem;
        background: #F6F4F7;
        border-top: 1px solid #efefef
   }
   .gooDetailNumber{
       display: none
   }
   .add a{
       display: block;
       width:50%;
       height: 1.3rem;
       line-height:1.3rem;
       text-align: center;
       background: #FF9800;
       color: white;
       font-size: 0.35rem;
       float: left;
   }
   .purchase a{
        float: left;
        display: block;
        width:50%;
        height: 1.3rem;
        line-height:1.3rem;
        text-align: center;
        color: white;
        font-size: 0.35rem;
        background: #E3211E;
   }
   .goodDetailImg{
        margin-top: 4px;
        margin-bottom: 6px;
   }
   .goodDetailImg  img{
       width: 100%;
       height: auto;
       display: block;
   }
   table td{
       font-size: 0.31rem;
       text-align: center;
       color: #000
   }
   .goodDetailValue{
        height: 1rem;
        border-bottom: 1px solid #cecece;
        padding: 0.4rem;
   }
   .goodDetailAdd{
        width: 1rem;
        height: 0.8rem;
        line-height: 0.8rem;
        display: block;
        background: white;
        float: left;
        border: 1px solid #b2b2b2;
        border-left: none;
        text-align: center;
        font-size: 0.5rem;
        color: black;
   }
   .goodDetailReduce{
        width: 1rem;
        height: 0.8rem;
        line-height: 0.8rem;
        display: block;
        background: white;
        float: left;
        border: 1px solid #b2b2b2;
        border-right: none;
        text-align: center;
        font-size: 0.5rem;
        color: black;
   }
   ._cartNumber input{
        width: 1rem;
        height: 0.8rem;
        line-height: 0.8rem;
        float: left;
        border: 1px solid #b2b2b2;
        text-align: center;
        color: black;
   }
   ._Value{
       float: left;
       margin-top: 0.2rem
   }
   .goodDetailColor{
       display: none
   }
   
</style>
