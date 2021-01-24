<template>
  <div class="blogDetailsPage flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid row">
    <div class="col-8 offset-2">
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
          <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
          <form @submit.prevent="createComment">
            <div class="form-group">
              <input type="text"
                     class="form-control"
                     name="commentBody"
                     id="commentBody"
                     placeholder="Leave a comment"
                     v-model="state.newComment.body"
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-2">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBlogModal" v-if="state.account.id == state.blog.creatorId">
        Edit
      </button>
      <ModalComponent />
      <router-link :to="{name: 'Home'}">
        <button type="button" class="btn btn-danger" v-if="state.account.id == state.blog.creatorId" @click="deleteBlog">
          Delete
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BlogDetails',
  setup() {
    // REVIEW why use this? what does useRoute do?
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      blog: computed(() => AppState.activeBlog),
      newComment: { blog: route.params.id },
      comments: computed(() => AppState.comments)
    })
    onMounted(async() => {
      try {
        await blogsService.getBlogById(route.params.id)
        await blogsService.getComments(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    onBeforeRouteLeave(() => {
      AppState.activeBlog = {}
    })

    return {
      state,
      async createComment() {
        try {
          commentsService.createComment(state.newComment, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteBlog() {
        try {
          blogsService.deleteBlog(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }

}
</script>

<style>

</style>
