<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @change="inputChange"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="isHistory">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content-item" v-for="item in historyList" @click="openHistory(item)">{{item.name}}</view>
				</view>
				<view v-else class="noData">
					暂无搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-card  mode="base" :item="item" v-for="item in searchList" @click.native="setHistory"></list-card>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="noData">
					暂无相关数据
				</view>
				
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isHistory:true,
				searchList:[],
				value:'',
				loading:false
			}
		},
		computed:{
				...mapState(['historyList'])
		},
		methods: {
			inputChange(val){
				this.value = val
				if(!val){
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(val)
					return
				}
				//防抖
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=>{
						this.mark = false
						this.getSearch(val)
					},1000)
				}
			},
			setHistory(){
				console.log(123,this.value)
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			openHistory(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			clear(){
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title:'清空完成'
				})
			},
			getSearch(value){
				if(!value){
					this.searchList = []
					this.isHistory = true
					return
				}
				this.isHistory = false
				this.loading = true
				this.$api.get_search({
					value
				}).then(res=>{
					console.log(res)
					const {data} = res
					this.loading = false
					this.searchList = data
					console.log(this.searchList.length,this.loading)
				}).catch(()=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		width: 100%;
		.home-list{
			padding: 10px;
			background-color: #fff;
			
			.label-box{
				.label-header{
					display: flex;
					justify-content: space-between;
					margin-bottom: 15px;
					.label-title{
						color: $na-base-color;
					}
					.label-clear{
						color: #30b33a;
						font-weight: bold;
					}
				}
				.label-content{
					display: flex;
					flex-wrap: wrap;
					padding-right: 20px;
					box-sizing: border-box;
					.label-content-item{
						padding: 2px 8px ;
						border: #333 1px solid;
						border-radius: 8px;
						margin: 0 10px 10px 0;
						
					}
				}
				
			}
		}
	}
	.noData{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px 0;
		color: #333;
	}

</style>
