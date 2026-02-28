<template>
    <div class="userprofileposts">
        <div class="card">
            <div class="card-body">
                <div v-for="post in posts.posts" :key="post.id">
                    <div class="content">
                         <div class="card">
                            <div class="card-body">
                                <div>{{post.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfilePosts',
    props:{
        posts:{
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>
.content{
    margin-top: 10px;
}
</style>