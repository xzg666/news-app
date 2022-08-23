<template>
	<view class="scroll">
		<scroll-view class="scroll-list" scroll-y @scrolltolower="loadmore">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"list-scroll",
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
.scroll{
		height: 100%;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.scroll-list{
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>