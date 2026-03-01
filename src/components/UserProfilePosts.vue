<template>
    <div class="userprofileposts">
        <div class="card">
            <div class="card-body">
                <div v-for="(post, index) in posts.posts" :key="post.id || index">
                    <div class="content">
                         <div class="card">
                            <div class="card-body">
                                <div>{{post.content}}</div>
                                <button 
                                v-if="is_me"
                                type="button"
                                class="btn btn-danger btn-sm"
                                @click="delete_a_post(post.id)">删除</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
import $ from 'jquery'

export default {
    name: 'UserProfilePosts',
    props:{
        posts:{
            type: Object,
            required: true,
        },
        user:{
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }){
        const store = useStore(); 
        const is_me = computed(()=>{
            return store.state.user.id===props.user.id   
        })
        
        const delete_a_post = (post_id) => {
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/post/",
                type:"DELETE",
                data:{
                    post_id,
                },
                headers:{
                    'Authorization':"Bearer "+store.state.user.access,
                },
                success(resp){
                    if(resp.result==="success"){
                        emit('delete_post', post_id);
                    }
                }
            })
        }
        
        return {
            is_me,
            delete_a_post
        }
    }
}
</script>

<style scoped>
.content{
    margin-top: 10px;
}

button{
    padding: 3px 6px;
    font-size: 12px;
    float: right;
}
</style>