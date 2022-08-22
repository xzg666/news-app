<template>
	<view class="feedback">
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea placeholder="请输入你要的反馈" v-model="content"></textarea>
			<!-- <text>{}</text> -->
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feebback-img-box">
			<view class="feebback-img-item" v-for="(item,index) in imgList" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="clear" size="18" color="red"></uni-icons>
				</view>
				<view class="img-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view class="feebback-img-item" v-if="imgList.length < 5" @click="add">
				<view class="img-box">
					<uni-icons class="plus" type="plus" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" @click="submit" type="primary">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				content:''
			}
		},
		methods: {
			add(){
				const count = 5 - this.imgList.length
				uni.chooseImage({
					count,
					success:(res)=>{
						const tempFilePaths = res.tempFilePaths
						console.log(tempFilePaths)
						tempFilePaths.forEach((item,index)=>{
							this.imgList.push({
								url:item
							})
						})
					}
				})
			},
			del(index){
				this.imgList.splice(index,1)
			},
		  	async submit(){
				let imgsPath = []
				uni.showLoading()
				for (let i = 0;i<this.imgList.length;i++) {
					const filePath = this.imgList[i].url
					console.log(this.imgList[i],filePath)
					filePath = await this.uploadFiles(filePath)
					imgsPath.push(filePath)//云存储的地址数组
				}
				uni.hideLoading()

				this.updateFeedback({
					content:this.content,
					feedbackImages:imgsPath
				})
				
			},
			async uploadFiles(filePath){
				const res= await uniCloud.uploadFile({
					filePath:filePath,
					 cloudPath:"file",
				})
				console.log(res)
				return res
			},
			updateFeedback({content,feedbackImages}){
				uni.showLoading()
				this.$api.update_feedback({
					content,
					feedbackImages
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功',
						icon:'none'
					})
					setTimeout(()=>{
						console.log(123)
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})
					},2000)
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.feedback{
	padding: 5px;
	box-sizing: border-box;
	.feedback-title{
		margin: 5px 0;
	}
	.feedback-content{
		border: #999 0.5px solid;
	}
	.feebback-img-box{
		display: flex;
		flex-wrap: wrap;
		
		.feebback-img-item{
			width: 80px;
			height: 80px;
			position: relative;
			border: #999 0.5px solid;
			margin-right: 20px;
			margin-bottom: 20px;
			.close-icon{
				width: 18px;
				height: 18px;
				position: absolute;
				top: -10px;
				right: -10px;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				border-radius: 50%;
			}
			.img-box{
				width: 80px;
				height: 80px;
				line-height: 80px;
				text-align: center;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback-button{
		background-color: $na-base-color;
		margin-top: 20px;
	}
}
</style>
