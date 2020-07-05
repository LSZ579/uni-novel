import {web} from "./config.js"

const serviceModule = {
    shang: {
        url: web.www+'/getList',
        method: 'get'
    },
    datas:{
        url:web.webUrl+'basic/data/hospital.php',
        method: 'get'
    }
};

const ApiSetting = { ...serviceModule
}
export default ApiSetting