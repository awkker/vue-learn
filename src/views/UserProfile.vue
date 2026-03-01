<template>
    
    <div class="userprofile">
        <content>
        <div class="row">
            <div class="col-3">
                <UserProfileinfo v-bind:user="user" v-on:follow="follow" v-on:unfollow="unfollow"/>
                <UserProfileWrite v-if="is_me" @post_post="post_post"/>
            </div>
            <div class="col-9">
                <UserProfilePosts v-bind:user="user" v-bind:posts="posts"
                 @delete_post="delete_post"/>
            </div>
        </div>
        </content>
    </div>
</template>

<script>

import content from '../components/content.vue'
import UserProfileinfo from '../components/UserProfileinfo.vue';
import UserProfilePosts from '../components/UserProfilePosts.vue';
import UserProfileWrite from '../components/UserProfileWrite.vue';
import {reactive} from 'vue'
import {ref} from 'vue'
import { useRoute } from 'vue-router';
import $ from 'jquery'
import { useStore } from 'vuex';
import {computed} from 'vue'

export default {
    name: 'userprofile',
    components: {
        content,
        UserProfileinfo,
        UserProfilePosts,
        UserProfileWrite
    },
    setup(){
        const store =useStore();
        const route = useRoute();
        console.log('Route params:', route.params);
        const userId = parseInt(route.params.id);
        console.log('User ID:', userId, typeof userId);
        const user=reactive({})
        const posts = reactive({posts: [], count: 0})

        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type:"GET",
            data : {
                user_id: userId,
            },
            headers:{
                Authorization:"Bearer "+ store.state.user.access,
            },
            success(resp){
                user.id=resp.id;
                user.username=resp.username;
                user.photo=resp.photo;
                user.fans=resp.fans;
                user.is_followed=resp.is_followed;
            }
        })

        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type:"GET",
            data : {
                user_id: userId,
            },
            headers:{
                'Authorization':'Bearer '+store.state.user.access,
            },
            success(resp){
                posts.posts=resp;
            }
        });

        const is_me=computed(()=>{
            return store.state.user.id===userId;
        })

        const follow = () => {
            if(user.is_followed)return;
            user.is_followed = true;
            user.fans += 1;
        }
        const unfollow = () => {
            if(!user.is_followed)return;
            user.is_followed = false;
            user.fans -= 1;
        }

        const post_post = (content) => {
            posts.count++;
            posts.posts.unshift({
                id:posts.count,
                userID:1,
                content:content,
        })
        }

        const delete_post = post_id => {
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count=posts.posts.length;
        }

        return {
            user,
            follow,
            unfollow,
            posts,
            post_post,
            is_me,
            delete_post
        }
    }
}
</script>

<style scoped>
</style>