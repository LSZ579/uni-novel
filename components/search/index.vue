<template>
	<view class="tmp-box">
		<view class='filterBox'>
			<view class='filter-input'>
				<image class='filterImg' src='../../static/images/filter.png'></image>
				<input class="text" type='text' :value="inputVal" @confirm='handleFllter' placeholder='搜索'></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputVal: "",

			};
		},
		methods: {
			handleFllter(e) {
				// console.log(e.detail.value)
				this.$emit("confirm", e.detail.value)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.filterBox {
		padding: 8px 16px;
		background-color: #fff;
		.filter-input {
			height: 40px;
			background-color: #eeeff0;
			border-radius: 20px;
			display: flex;
			align-items: center;
			padding-left: 20px;
			.filterImg {
				width: 16px;
				height: 16px;
				margin-right: 10px;
			}

			.text {
				width: 80%;
				background-color: #eeeff0;
				font-size: 16px;
				color: #000;
			}
		}
	}
</style>
