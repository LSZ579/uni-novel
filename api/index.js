const baseUrl = 'https://lsz520.xyz/public/index.php/api/v1/'

import store from '../store'
//const baseUrl = 'http://y.cn/public/index.php/api/v1/'
const api = (url = '', date = {}, type = 'get', search = '', header = {
	'content-type': 'application/x-www-form-urlencoded'
}) => {
	uni.getStorage({
		key: 'token',
		success: function(res) {
			console.log(res.data);
			header.token = res.data;
		}
	});
	uni.showLoading({
		title:'正在加载'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			uni.hideLoading()
			if (response[1].data.error_code == 1001) {
				uni.showModal({
					title: '登录已失效',
					content: '请重新登录，才能使用完整功能',
					cancelText: '拒绝',
					confirmText: '去登录',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: '/pages/login/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})
			}
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
			console.log(22222222, error)
		})
	});
}
export default api
