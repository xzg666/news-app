<template>
	<view @click="open">
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="listcard listcard-base">
			<view class="listcard-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">{{item.classify}}</view>
					<view class="listcard-content-des-brow mt">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		
		<!-- 多图模式 -->
		<view v-else-if="item.mode === 'column'" class="listcard mode-column">
			<view class="listcard-content">
				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-img">
					<view v-if="index < 3" class="listcard-img-item" v-for="(item,index) in item.cover " :key="index">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">{{item.classify}}</view>
					<view class="listcard-content-des-brow">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-else="item.mode === 'image'" class="listcard mode-img">
			<view class="listcard-content">
				<view class="listcard-img">
						<image :src="item.cover[0]" mode="aspectFill"></image>
				</view>
				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">{{item.classify}}</view>
					<view class="listcard-content-des-brow">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:()=>({})
			}
		},
		name:"list-card",
		data() {
			return {
				
			};
		},
		methods:{
			open(){
				const item  = this.item
				// this.$emit('click',item)
				const params = {
					_id:item._id,
					title:item.title,
					author:item.author,
					create_time:item.create_time,
					thumbs_up_count:item.thumbs_up_count,
					browse_count:item.browse_count
				}
				console.log('打开详情页面',params);
				// 传参注意长度
				uni.navigateTo({
					url:'/pages/home-detail/home-detail?params='+JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
.listcard{
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
	margin: 10px;
	&.listcard-base{
		padding: 5px 10px;
	}
	.listcard-img{
		image{
			width: 65px;
			height: 65px;
			border-radius: 5px;
			overflow: hidden;
		}
	}
	.listcard-content{
		padding: 2px 0px 0 20px;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-content: space-between;
		.listcard-content-title {
			position: relative;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 8px;
			padding-right: 24px;
			box-sizing: border-box;
		}
		.listcard-content-des{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.listcard-content-des-label{
				font-size: 14px;
				color: $na-base-color;
				padding: 0 2px;
				box-sizing: border-box;
				border: $na-base-color 1px solid;
				border-radius: 5px;
				
			}
			.listcard-content-des-brow{
				font-size: 14px;
				color: #333;
				
			}
		}
	}
	&.mode-column{
		.listcard-content{
			padding: 5px 10px;
			.listcard-img{
				display: flex;
				justify-content: space-around;
				.listcard-img-item{
					flex: 1;
					image{
						width: 98%;
					}
				}
			}
		}
	}
	&.mode-img{
		.listcard-content{
			padding: 5px 10px;
			.listcard-img{
				image{
					width: 100%;
					height: 80px;
				}
				
			}
		}
	}
}
</style>