
export default{
//	getters:{
	//	total:state =>{ 
	//		var total = 0,
	//		 state.cartlist.forEach(cart){
	//		 	console.log(cart)
	//		 	total += cart.num * cart.price
	//		 }
	//          return total
	//	}
			total:state =>{
	            var total=0;
	            state.carts.forEach((cart)=>{
	                total+=cart.price*cart.num
	            })
	            return total
	       },
	       
//	}
}

