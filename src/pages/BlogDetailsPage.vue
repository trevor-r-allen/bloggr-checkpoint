<template>
  <div class="blogDetails flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid">
    <div class="row">
      <div class="col-10"></div>
    </div>
    <div class="row">
      <div class="col-8 offset-1">
        <div class="card">
          <img class="card-img-top" :src="state.blog.imgUrl" alt="">
          <div class="card-body">
            <h3 class="card-title">
              {{ state.blog.title }}
              <h6 v-if="state.blog.creator">
                Created by: {{ state.blog.creator.name }}
              </h6>
            </h3>
            <p class="card-text">
              {{ state.blog.body }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-1">
        <button type="button" class="btn btn-primary" v-if="state.user.id == state.blog.creatorId">
          Edit
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommentComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BlogDetails',
  setup() {
    // REVIEW why use this? what does useRoute do?
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.activeBlog),
      // TODO set up to properly display only comments with this blog's id
      comments: computed(() => AppState.comments)
    })
    onMounted(async() => {
      try {
        await blogsService.getBlogById(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    onBeforeRouteLeave(() => {
      // AppState.activeBlog = {}
    })

    return {
      state

    }
  }

}
</script>

<style>

</style>
