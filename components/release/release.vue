<template>
	<view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="close" @click="close">取消</text>
					<text class="release" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" maxlength="200" placeholder="请输入评论内容" v-model="commentsVal"></textarea>
					<view class="popup-count">{{commentsVal.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
	
</template>

<script>
	export default {
		name:"release",
		data() {
			return {
				commentsVal:''
			};
		},
		methods:{
			open(){
				// 打开窗口之前清空内容 
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			close(){
				// 关闭窗口清空内容 
				this.commentsValue = ''
				this.$refs.popup.close()
			},
			submit(){
				if(!this.commentsVal){
					uni.showToast({
						title:'请输入评论内容',
						icon:"none"
					})
					return
				}
				this.$emit('submit',this.commentsVal)
			}
		}
	}
</script>

<style lang="scss">
.popup-wrap{
	width: 100%;
	background-color: #fff;
	padding: 10px;
	box-sizing: border-box;
	.popup-header{
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #666;
		border-bottom: 1px #F5F5F5 solid;
		
		text{
			height: 25px;
			line-height: 25px;
			padding: 0 15px;
		}
	}
	.popup-content {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		.popup-textarea {
			width: 100%;
			height: 200px;
			
		}
		.popup-count {
			display: flex;
			justify-content: flex-end;
			font-size: 12px;
			color: #999;
		}
	}
}
</style>