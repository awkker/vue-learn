<template>
    
    <div class="userprofile">
        <content>
        <div class="row">
            <div class="col-3">
                <UserProfileinfo v-bind:user="user" v-on:follow="follow" v-on:unfollow="unfollow"/>
                <UserProfileWrite @post_post="post_post"/>
            </div>
            <div class="col-9">
                <UserProfilePosts v-bind:posts="posts"/>
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

export default {
    name: 'userprofile',
    components: {
        content,
        UserProfileinfo,
        UserProfilePosts,
        UserProfileWrite
    },
    setup(){
        const route = useRoute();
        console.log(route.params.id);
        const user=reactive({
            id : 1,
            username:"Cao Xunyi",
            first_name:"Cao",
            last_name:"Xunyi",
            fans:114514,
            avatar:"https://cdn.acwing.com/media/user/profile/photo/486193_lg_1bcf94bf9d.jpg",
            is_followed: false,
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

        const posts = reactive({
            count:3,
            posts:[
                {
                    id:1,
                    userID:1,
                    title:"Post 1",
                    content:"忽如一夜春风来",
                },
                {
                    id:2,
                    userID:1,
                    title:"Post 2",
                    content:"待到山花烂漫时",
                },
                {
                    id:3,
                    userID:1,
                    title:"Post 3",
                    content:"君子之交淡如水",
                }
            ]
        })
        return {
            user,
            follow,
            unfollow,
            posts,
            post_post
        }
    }
}
</script>

<style scoped>
</style>