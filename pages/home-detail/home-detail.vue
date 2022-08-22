<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button class="detail-header__button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-info">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="handleLike(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsUp(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-up-filled':'hand-up'" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<release ref="popup" @submit="submit"></release>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsList:[],
				replyFormData:{}
			}
		},
		onLoad(query){
			this.formData = JSON.parse(query.params)
			console.log(1,this.formData)
			this.getDetail()
			this.getComments()
		},
		methods: {
			//打开评论页面
			open(){
				uni.navigateTo({
					url:'/pages/detail_comments/detail_comments?id='+this.formData._id
				})
			},
			//点赞
			thumbsUp(id){
				if(this.formData.is_thumbs_up){
					uni.showToast({
						title:'您已点赞',
						icon:'none'
					})
					return
				}
				this.setUpdateThumbsup(id)
			},
			// 收藏
			handleLike(id){
				this.setUpdateLike(id)
			},
			//关注作者
			follow(id){
				this.followAuthor(id)
			},
			// 关闭弹窗
			close(){
				this.$refs.popup.close()
			},
			openComment(){
				this.$refs.popup.open()
			},
			submit(content){
				console.log(content)
				this.setUpdateComment({content,...this.replyFormData})
			},
			reply(e){
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
				this.openComment()
			},
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {data} = res
					this.formData = data
					console.log('getDetail',res);
				})
			},
			setUpdateComment(content){
				const formdata ={
					article_id:this.formData._id,
					...content
				}
				// console.log(formdata);
				uni.showLoading()
				this.$api.update_comment(formdata).then((res)=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComments()
					this.close()
					this.replyFormData = {}
				})
			},
			// 请求评论内容
			getComments(){
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res=>{
					console.log(res);
					const {data} = res
					this.commentsList = data
				})
			},
			// 关注作者
			followAuthor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
				})
			},
			//收藏文章
			setUpdateLike(article_id){
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article')
					uni.showToast({
						title:this.formData.is_like ? '收藏成功':'取消收藏'
					})
				})
			},
			setUpdateThumbsup(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.detail{
	padding: 15px 0;
	padding-bottom: 54px;
	.detail-title{
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header{
		display: flex;
		padding: 0 15px;
		box-sizing: border-box;
		.detail-header__logo{
			width: 40px;
			height: 40px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.detail-header__content{
			padding-left: 10px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header__content-info {
				color: #999;
			
				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: $na-base-color;
		}
	}
	.detail-info{
		margin-top: 20px;
		min-height: 500px;
		// border: 1px red solid;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment{
			padding: 10px;
			box-sizing: border-box;
		}
	}
	.detail-bottom{
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		// z-index: 2;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		.detail-bottom__input{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;
			
			text {
				font-size: 14px;
				color: #999;
			}
		}
		.detail-bottom__icons{
			display: flex;
			padding: 0 10px;
			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
}
</style>
