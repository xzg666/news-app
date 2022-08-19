<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{isEdit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content-item" v-for="(item,index) in labelList" @click="del(index)">
					{{item.name}}
					<uni-icons v-if="isEdit" class="icons-close" type="clear" size="20" color="red"></uni-icons>
				</view>
				<view class="noData" v-if="labelList.length === 0 && !loading">
					暂无标签
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">推荐标签</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content-item" v-for="(item,index) in list" @click="add(index)">
					{{item.name}}
				</view>
			</view>
			<view class="noData" v-if="list.length === 0 && !loading">
				暂无标签
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit:false,
				labelList:[],
				list:[],
				loading:true
			}
		},
		onLoad(){
				this.getLabel()
		},
		methods: {
			editLabel(){
				if(this.isEdit){
					//编辑
					this.isEdit = false
					this.setUpdateLabel(this.labelList)
				}else{
					//完成
					this.isEdit = true
				}
			},
			add(index){
				if(!this.isEdit)return
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			},
			del(index){
				if(!this.isEdit)return
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			setUpdateLabel(label){
				let newArrIds = []
				label.forEach(item=>{
					newArrIds.push(item._id)
				})
				uni.showLoading()
				
				this.$api.update_label({
					label:newArrIds
				}).then(res=>{
					uni.hideLoading()
					uni.showLoading({
						title:'更新成功',
						icon:'none'
					})
					uni.$emit('labelChange')
					
				}).catch(()=>{
					uni.hideLoading()
					
				})
			},
			getLabel(){
				this.loading = true
				this.$api.get_label({
					type:'all'
				}).then(res=>{
					const {data} = res
					console.log(res.data)
					this.labelList = data.filter(item=>item.current)
					this.list = data.filter(item=> !item.current)
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.label{
		width: 100%;
		.label-box{
			width: 100%;
			height: 100;
			background-color: #fff;
			margin-bottom: 12px;
			padding: 10px;
			box-sizing: border-box;
			.label-header{
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label-edit{
				color: #30b33a;
				font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				.label-content-item{
					position: relative;
					padding: 2px 10px;
					margin-top: 10px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					.icons-close{
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
			.noData{
				width: 100%;
				text-align: center;
				padding: 50px 0;
				color: #999;
				font-size: 14px;
			}
		}
	}
</style>
