<template>
    <div class="userprofilewrite">
        <div class="card edit">
            <div class="card-body">
                <div>
                    <div class="mb-3">
                    <label for="edit-post" class="form-label">编辑</label>
                    <textarea v-model="content" class="form-control" id="edit-post" rows="3" placeholder="请输入内容"></textarea>
                    <button type="button" class="btn btn-primary" @click="post_post">发布</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import { ref } from 'vue';
import $ from 'jquery'
import {useStore} from 'vuex'
export default {
    name: 'UserProfileWrite',
    setup(props,context){
        const store = useStore();
        let content = ref('');

        const post_post = () => {
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/post/",
                type:"POST",
                data:{
                    content:content.value,  
                },
                headers:{
                    Authorization:"Bearer "+store.state.user.access,
                },
                success(resp){
                    if(resp.result==="success"){
                        context.emit('post_post',content.value);
                        content.value = '';
                    }
                }
            })
        }

        return {
            content,
            post_post
        }
    }
}
</script>

<style scoped>
.edit{
    margin-top: 10px;
}

button{
    margin-top: 10px;
    padding: 3px 6px;
    font-size: 12px;
}
</style>