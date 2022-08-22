<template>
	<view class="follow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab-item" :class="{active:activeIndex === 0}" @click="tap(0)">文章</view>
			<view class="follow-tab-item" :class="{active:activeIndex === 1}" @click="tap(1)">作者</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list-swiper" :current="activeIndex" @change="change">
				<swiper-item class="swiper-item">文章</swiper-item>
				<swiper-item class="swiper-item">作者</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0
			}
		},
		methods: {
			tap(index){
				this.activeIndex = index
			},
			change(e){
				console.log(e)
				this.activeIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
.follow{
	height: 100%;
	.follow-tab{
		display: flex;
		justify-content: center;
		.follow-tab-item{
			padding: 0px 60px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border: $na-base-color 1px solid;
			border-radius: 5px;
			&.active{
				color: $na-base-color;
			}
		}
	}
	.follow-list{
		height: 100%;
		.follow-list-swiper{
			.swiper-item{
				height: 100%;
			}
		}
	}
}
</style>
