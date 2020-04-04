export default {
    // 保存用户数据到缓存
    saveUser(key,info){
        localStorage.setItem(key,JSON.stringify(info))
    },
    getUser(key){
        return JSON.parse(localStorage.getItem(key) || '{}') 
    },
    removeUser(key){
        localStorage.removeItem(key)
    }
}