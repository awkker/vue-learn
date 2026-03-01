<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-3 img-field">
                        <img :src="user.photo" class="img-fluid" alt="">
                    </div>
                    <div class="col-9">
                        <div class="username">{{user.username}}</div>
                        <div class="fans">粉丝：{{user.fans}}</div>
                        <button v-if="!user.is_followed" type="button" class="btn btn-secondary" @click="follow">+ 关注</button>
                        <button v-else type="button" class="btn btn-primary" @click="unfollow">已关注</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import $ from 'jquery'
import {useStore} from 'vuex'

export default {
    name: 'UserProfileinfo',
    props: {
        user:{
            type: Object,
            required: true,
        },
    },
    setup(props,context){
        const store = useStore();
        const follow = () => {
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':'Bearer '+store.state.user.access,
                },
                success(resp){
                    if(resp.result==="success"){
                        context.emit('follow');
                    }
                }
            })
        };
        const unfollow = () => {
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':'Bearer '+store.state.user.access,
                },
                success(resp){
                    if(resp.result==="success"){
                        context.emit('unfollow');
                    }
                }
            })
        };
        return {
            follow,
            unfollow
        }
    }
}
</script>

<style scoped>
img{
    border-radius: 50%;
}
.username{
    font-size: 24px;
    font-weight: bold;
}
.fans{
    font-size: 16px;
    color: #6c757d;
}
button{
    padding: 3px 6px;
    font-size: 12px;
}
.img-field{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>