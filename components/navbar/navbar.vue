<template>
	<view class="navbar" >
		<view class="navbar-fix"> 
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content"  :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<uni-icons type="search" size="18" color="#999"></uni-icons>
					</view>
					<view class="navbar-search-text">uniapp、vue</view>
				</view>
			</view>
		</view>
		<!-- 文字占位 -->
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
		
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight:0,
				navBarHeight:45,
				windowWidth:0
			};
		},
		created(){
			//获取手机系统信息
			const info = uni.getSystemInfoSync()
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			
			//h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
	}
</script>

<style lang="scss">
.navbar{
	width: 100%;
	box-sizing: border-box;
	.navbar-fix{
		background-color: $na-base-color;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		box-sizing: border-box;
		.navbar-content{
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			.navbar-search{
				width: 100%;
				padding: 2px 10px;
				background-color: #fff;
				box-sizing: border-box;
				border-radius: 15px;
				color: #999;
				display: flex;
				.navbar-search-icon{
					margin-top: 2px;
					box-sizing: border-box;
				}
				.navbar-search-text{
					margin-left: 5px;
				}
			}
		}
	}
	

}
</style>