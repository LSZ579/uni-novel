# uni-novel
### 利用业余时间写的一个demo，复刻小程序版,还有很多界面还没实现
### 安装依赖npm install
## 封装api请求

````const api = (url = '', date = {}, type = 'get', search = '', header = {

	'content-type': 'application/x-www-form-urlencoded'
}) => {
	uni.getStorage({
		key: 'token',
		success: function(res) {
			console.log(res.data);
			header.token = res.data;
		}
	});
	return new Promise((resolve, reject) => {
		console.log(resolve, reject)
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
```
