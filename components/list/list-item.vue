<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card v-for="(item,index) in list" :key="index" :item="item" :mode="item.mode"></list-card>
		<uni-load-more v-if="list.length===0 || list.length >9" iconType="snow" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>[]
			},
			load:{
				type:Object,
				default:()=>({
					loading:"loading"
				})
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.swiper-item{
		height: 100%;
		.list-scroll{
			height: 100%;
		}
	}
</style>