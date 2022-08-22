<template>
	<view class="my">
		<view class="my-header" :style="{'background':`url(${userinfo.avatar})`}">
			<view class="bg-cover"></view>
			<view class="my-header-logo">
				<view class="my-header-logo-box" >
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="my-header-name">{{userinfo.author_name}}</view>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<view class="my-header-info-title">被关注</view>
					<view>{{userinfo.follow_count}}</view>
				</view>
				<view class="my-header-info-box">
					<view class="my-header-info-title">粉丝</view>
					<view>{{userinfo.fans_count}}</view>
				</view>
				<view class="my-header-info-box">
					<view class="my-header-info-title">积分</view>
					<view>{{userinfo.integral_count === "" ? 0 :userinfo.integral_count}}</view>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content-list">
				<view class="my-content-list-title" @click="openArticle">
					<uni-icons type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
			<view class="my-content-list" @click="openAdvise">
				<view class="my-content-list-title">
					<uni-icons type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods: {
			openArticle(){
				uni.navigateTo({
					url:'/pages/my-article/my-article'
				})
			},
			openAdvise(){
				uni.navigateTo({
					url:'/pages/advise/advise'
				})
			}
		}
	}
</script>

<style lang="scss">

	.my{
		.my-header{
			width: 100%;
			height: 180px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-size: cover;
			position: relative;
			z-index: -1;
			.bg-cover{
				width: 100%;
				height: 100%;
				position: absolute;	
				background-color: rgba(0,0,0,.2) ;
				backdrop-filter: blur(5px);
				top: 0;
				right: 0;
				left: 0;
				z-index: -1;
			}
			.my-header-logo{
				.my-header-logo-box{
					text-align: center;
					image{
						width: 50px;
						height: 50px;
						border-radius: 50%;
					}
				}
			}
			.my-header-info{
				display: flex;
				width: 80%;
				.my-header-info-box{
					flex: 1;
					text-align: center;
					margin-top: 10px;
					color: #888;
					font-size: 12px;
					.my-header-info-title{
						font-size: 14px;
					}
				}
			}
		}
		.my-content{
			width: 100%;
			.my-content-list{
				display: flex;
				justify-content: space-between;
				padding: 8px 10px;
				box-sizing: border-box;
				border-bottom: #f5f5f5 1px solid;
			}
		}
	}

</style>
