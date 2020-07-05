const httpServer = (opts, data) => {

    let httpDefaultOpts = {
        url: opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'json',
    }

    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
}
export default httpServer