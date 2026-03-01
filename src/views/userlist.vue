<template>
    <div class="userlist">
        <content>
            <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)"> 
                <div class="card-body">
                    <div class="row">
                        <div class="col-1 img-field">
                            <img :src="user.photo" class="img-fluid" alt="">
                        </div>
                        <div class="col-11">
                            <div class="username">{{user.username}}</div>
                            <div class="follower-count">{{user.followerCount}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </content>
    </div>
</template>

<script>

import content from '../components/content.vue'
import $ from 'jquery'
import { ref } from 'vue'
import router from '../router/index';
import { useStore } from 'vuex';
export default {
    name: 'userlist',
    components: {
        content
    },
    setup(){
        const store = useStore();
        let users=ref([]);

        $.ajax({
            url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
            type:'get',
            success:function(resp){
                users.value=resp;
            }
        })

        const open_user_profile=(user_id)=>{
            if(store.state.user.is_login){
                router.push({name:'userprofile',params:{id:user_id}});
            }else{
                router.push({name:'loginview'});
            }
        }

        return {
            users,
            open_user_profile
        }        
    }
}
</script>

<style scoped>
.img-fluid{
    border-radius: 50%;
}
.username{
    font-weight: bold;
    height: 50%;
}
.follower-count{
    font-size: 12px;
    color: #6c757d;
    height: 50%;
}
.card{
    margin-bottom: 10px;
    cursor: pointer;
}
.card:hover{
    box-shadow: 2px 2px 10px lightgray;
    transform: translateY(-2px);
    transition: 500ms;
}
.img-field{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>