<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-3">
                        <img src="https://cdn.acwing.com/media/user/profile/photo/486193_lg_1bcf94bf9d.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="col-9">
                        <div class="username">{{fullName}}</div>
                        <div class="fans">粉丝：{{user.fans}}</div>
                        <button v-if="!user.is_followed" type="button" class="btn btn-secondary" @click="follow">+ 关注</button>
                        <button v-else type="button" class="btn btn-primary" @click="unFollow">已关注</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
    name: 'UserProfileinfo',
    props: {
        user:{
            type: Object,
            required: true,
        },
    },
    setup(props,context){
        let fullName = computed(() => {
            return props.user.first_name + ' ' + props.user.last_name
        });

        const follow = () => {
            context.emit('follow');
        };

        const unFollow = () => {
            context.emit('unfollow');
        };

        return {
            fullName,
            follow,     
            unFollow
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
</style>