<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Bloggr</h1>
      </div>
      <div class="col" v-if="state.user.isAuthenticated">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createBlogModal">
          Create Blog
        </button>
        <ModalComponent />
      </div>
    </div>
    <div class="row">
      <BlogComponent v-for="blog in state.blogs" :key="blog.id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user)

    })
    onMounted(() => {
      try {
        blogsService.getBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
