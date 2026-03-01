<template>
    <div class="loginview">
        <content>
            <div class="row justify-content-md-center">
                <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">确认密码</label>
                    <input v-model="password_confirm" type="password" class="form-control" id="password_confirm" placeholder="请输入密码">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
                </div>
            </div>
            
        </content>
    </div>
</template>

<script>

import content from '../components/content.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/index';
import $ from 'jquery'

export default {
    name: 'loginview',
    components: {
        content
    },
    setup(){
        const store = useStore();
        let username=ref('');
        let password=ref('');
        let password_confirm=ref('');
        let error_message=ref('');
        
        const register = () => {
            error_message.value="";
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/user/",
                type:"GET",
                data:{
                    username:username.value,
                    password:password.value,
                    password_confirm:password_confirm.value,
                },
                success(resp){
                    if(resp.result==="success"){
                        store.dispatch("login",{
                            username:username.value,
                            password:password.value,
                            success(){
                                router.push({name:'userlist'});
                            },
                            error(){
                                error_message.value="注册失败";
                            }
                        })
                    }else{
                        error_message.value=resp.result;
                    }
                },
            })
            
        }   
        return {
            username,
            password,
            password_confirm,
            error_message,
            register
        }   
    }
}
</script>

<style scoped>
button{
    width: 100%;
}
.error-message{
    color: red;
}
</style>