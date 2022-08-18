<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x :show-scrollbar="false">
			<view class="tab-scroll-box">
				<view class="tab-scroll-box-item" :class="{active:activeIndex === index}" v-for="(item,index) in list" :key="index" @click="clickTab(item,index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icon">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		props:{
			list:{
				type:Array,
				default:()=>[]
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		//可以监听data，props的变化
		watch:{
			tabIndex(newValue){
				this.activeIndex = newValue
			}
		},
		methods:{
			clickTab(item,index){
				this.activeIndex = index
				console.log(index)
				this.$emit('tab',{
					data:item,
					index
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		align-items: center;
		overflow: hidden;
		.tab-scroll{
			.tab-scroll-box{
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				height: 45px;
				.tab-scroll-box-item{
					flex-shrink: 0;
					padding: 0 10px ;
					color:#333;
					font-size: 14px;
					&.active{
						color: $na-base-color;
					}
				}
				
			}
		}
		.tab-icon{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}

</style>