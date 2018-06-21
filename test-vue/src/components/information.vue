<template>
  <div class="information">
        <div class="informationHeader">
            <span>新闻信息</span>
        </div>
        <div class="informationMian" style="margin-top: 1.33rem;">
            <ul>
                <li v-for="(information,index) in informations" class="Mainlist" @click="open(information.id)" :id="information.id">
                    <h3 class="MainTitle" style="color:#434343"> {{information.title}}</h3  >
                    <span class="MianTime">{{information.time}}</span>
                    <div class="informationImg">
                        <img  v-bind:src="information.img" alt="图片">
                    </div>
                    <a href="">阅读全文</a>
                </li>
            </ul>
            
        </div>
        <div class="informationfooter">

        </div>
  </div>
</template>

<script>
	import axios from 'axios'; 
export default {
    name:"information",
    data(){
        return{
            informations:[]
        }
    },
    mounted:function(){
        this.getDate()
    },
    methods:{
        getDate:function(){
            var _this=this;
            axios.get("/static/information.json").then(function(res) {
            	console.log(res.data)
            	for(var i = 0;i < res.data.informations.length;i++){
            		_this.informations.push(res.data.informations[i])
            	}
            })
        },
        open:function(id){
            this.$router.push({path:"news",query:{id:id}})
        },
    }

  
}
</script>


<style>
.informationHeader{
    position: fixed;
    width: 100%;
    -webkit-box-shadow: 0 0 10px #cecece;
    box-shadow: 0 0 10px #cecece;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.35rem;
    padding-left: 0.3rem;
    background: white;
    top: 0;
    font-size: 0.41rem; 
}
.informationHeader i{
    display: block;
    float: left;
    height: 50px;
    padding-left: 0.3rem;
    font-size: 22px;
    color: black;
}
.Mainlist{
    width: 100%;
    height: 7rem;
    background: white;
    margin-top: 5px;
    padding-top: 0.35rem;
}

.MainTitle{
    width: 77%;
    text-align: left;
    margin: auto;
    color: rgb(67, 67, 67);
    font-size: 0.4rem
}
.MianTime{
    width: 78%;
    margin: auto;
    display: block;
    line-height: rem;
    padding: 7px 0px;
    font-size: 0.1rem;
}
.informationImg img{
    width: 100%;
    height: 4.7rem;
}
.Mainlist a{
    float: right;
    font-size: 0.3rem;
    margin-right: 0.75rem;
    margin-top: 0.2rem;
    color: black;
}
</style>
