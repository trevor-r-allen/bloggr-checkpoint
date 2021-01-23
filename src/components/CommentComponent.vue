<template>
  <div class="card">
    <div class="card-body">
      <h5 v-if="commentProp.creator" class="card-title">
        {{ commentProp.creator.name }}
        <span class="text-danger">
          <i class="fa fa-pencil-square-o" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="state.commentEditable = !state.commentEditable"></i>
          <i class="fa fa-trash-o" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="deleteComment"></i>
        </span>
      </h5>
      <p class="card-text" :contenteditable="state.commentEditable" @blur="editComment">
        {{ commentProp.body }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      commentEditable: false
    })
    return {
      state,
      async editComment(event) {
        try {
          await commentsService.editComment(props.commentProp.id, event.target.innerText)
          logger.log(event.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.commentProp.id)
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
