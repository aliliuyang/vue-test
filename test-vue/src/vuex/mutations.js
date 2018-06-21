const ADD_CART = 'ADD_CART'
const ADD_NUM = 'ADD_NUM'
const REDUCE = 'REDUCE'
const REMOVE = 'REMOVE'
const CLEAR = 'CLEAR'
const BUY = 'BUY'
const DELETE = 'DELETE'
export default{
	[ADD_CART] (state,{//加入购物车
		shop_num,//商品数量
		shopID,//商品id
	    shopcode,//商品编号
	    shopname,//商品名称
	    shopcolor,//商品颜色
	    shopprice,//商品价格
		shopImg,//商品图片
		
	}){
		let goodDetails = state.goodDetails
		if(!state.carts.length){
			goodDetails = {
				"num":shop_num,
				"id":shopID,
				"code":shopcode,
				"name":shopname,
				"color":shopcolor,
				"price":shopprice,
				'pic':shopImg
			}
			state.carts.push(goodDetails)
			localStorage.setItem('carts',JSON.stringify(state.carts))
		}else {
			goodDetails = {
				"num":shop_num,
				"id":shopID,
				"code":shopcode,
				"name":shopname,
				"color":shopcolor,
				"price":shopprice,
				'pic':shopImg
			}
			var IsSameID = false;
			state.carts.forEach(function(item,index){
				if(item.id == goodDetails.id){
					item.num = item.num + goodDetails.num;
					IsSameID = true;
				}
			})
			if(!IsSameID){
				state.carts.push(goodDetails)
				localStorage.setItem('carts',JSON.stringify(state.carts))
			}
		}
	},
	[BUY](state,data){//立即购买
		state.orders.push(data)
		localStorage.setItem("orders",JSON.stringify(state.orders));
	},
	[DELETE](state,index){//删除订单
		state.orders.splice(index,1)
		localStorage.removeItem("orders",JSON.stringify(state.orders))
	},
	[ADD_NUM](state,index){
		state.carts[index].num ++
		localStorage.setItem("carts",JSON.stringify(state.carts));
	},
	[REDUCE](state,index){
    	if(state.carts[index].num == 1){
    		state.carts[index].num =1
    		localStorage.setItem("carts",JSON.stringify(state.carts));
    	}else{
    		state.carts[index].num --
    		localStorage.setItem("carts",JSON.stringify(state.carts));
    	}
    },
    [REMOVE] (state,index){
//      	var carts = JSON.parse(localStorage.getItem('carts'))
		state.carts.splice(index,1)
		localStorage.setItem("carts",JSON.stringify(state.carts));
    },
    [CLEAR] (state){
    	state.carts.splice(0,state.carts.length)
    	localStorage.setItem("carts",JSON.stringify(state.carts));
    }
}
