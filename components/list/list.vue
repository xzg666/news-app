<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCacheData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper> 
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		name:"list",
		props:{
			tab:{
				type:Array,
				default:()=>[]
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		components:{
				listItem
		},
		data() {
			return {
				list:[],
				// {0:[],1:[]}
				listCacheData:{},
				//每个轮播图页面都存着一个page状态
				load:{},
				pageSize:10
			};
		},
		watch:{
			tab(newVal){
				if(newVal.length === 0) return
				this.listCacheData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created(){
			this.getList(0)
		},
		methods:{
			loadmore(){
				if(this.load[this.activeIndex].loading === 'nomore') return
					console.log('加载更多')
					this.load[this.activeIndex].page++
					this.getList(this.activeIndex)
			},
			change(e){
				const current = e.detail.current
				this.$emit('change',current)
				//只有当数据不存在或者长度为0的时候才请求(缓存！)
				if(!this.listCacheData[current] || this.listCacheData[current].length === 0){
					this.getList(current)
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_list({
					name:this.tab[current]?.name,
					page:this.load[current]?.page,
					pageSize:this.pageSize
				}).then(res=>{
					const {data} = res
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'nomore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						//强制渲染
						this.$forceUpdate()
						return
					}
					let oldList = this.listCacheData[current] || []		
					oldList.push(...data)
					this.$set(this.listCacheData,current,oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
.home-swiper{
	height: 100%;
	
}
</style>