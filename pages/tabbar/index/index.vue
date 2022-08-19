<template>
	<view class="home">
		<!-- 导航栏 -->
		<navbar></navbar>
		<!-- tab标签栏 -->
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad(){
			uni.$on('labelChange',()=>{
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			getLabel(){
				this.$api.get_label().then(res=>{
					const {data} = res
					data.unshift({
						name:'全部'
					})
					this.tabList = data
				})
			},
			tab({data,index}){
				console.log(data,index)
				this.activeIndex = index
			},
			change(index){
				console.log(index)
				this.tabIndex = index
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
	display: flex;
}
.home{
	width: 100%;
	display: flex;
	flex-direction: column;
	.home-list{
		width: 100%;
		height: 100%;
	}
}

</style>
