<template>
  <div class="container-full">
		<div class="container-header">
			<el-button type="default">撤销</el-button>
			<el-button type="default">重做</el-button>
			<el-button type="default">插入图片</el-button>
			<el-button type="default">预览</el-button>
			<el-button type="danger">清空画布</el-button>
			<el-button type="primary">保存</el-button>
		</div>
  	<div class="container-main">
			<!-- 左侧的组件 -->
			<div class="l-aside">
				<div @dragstart="handleDragStart" class="component-list">
					<div v-for="(item, index) in componentList" :key="index" class="list" draggable :data-index="index">
						<el-button :icon="item.icon">{{ item.label }}</el-button>
					</div>
				</div>
			</div>
			<!-- 主体内容 -->
			<div class="content">
				
			</div>
			<!-- 右侧配置 -->
			<div class="r-aside"></div>
		</div>
  </div>
</template>
<script>
import { getItem } from '@/utils/storage'
export default {
  data() {
    return {
    	componentList: [
    		{
    			label: '按钮',
    			icon: 'el-icon-thumb',
    			template: 'button'
    		},
    		{
    			label: '文本',
    			icon: 'el-icon-edit',
    			template: 'text'
    		},
    		{
    			label: '图片',
    			icon: 'el-icon-picture',
    			template: 'pictrue'
    		}
    	]
    }
  },
  mounted() {
  },
  methods: {
  	handleDragStart(e) {
  		console.log(e)
	    e.dataTransfer.setData('index', e.target.dataset.index)
		}
  }
}
</script>
<style lang="scss" scoped>
	.container-full{
		display: flex;
		flex-direction: column;
		background-color: #eee;
		.container-header{
			height: 60px;
			display: flex;
			align-items: center;
			padding: 0 15px;
			border-bottom: 1px solid #eee;
			background-color: #fff;
		}
		.container-main{
			flex: 1;
			display: flex;
			justify-content: space-between;
			.l-aside{
				width: 12%;
			}
			.content{
				width:58%;
			}
			.r-aside{
				width: 12%;
			}
			.l-aside, .content, .r-aside{
				background-color: #fff
			}
		}
	}	
</style>