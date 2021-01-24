<template>
  <!-- Create Modal -->
  <div class="modal fade"
       id="createBlogModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createBlogModal"
       aria-hidden="true"
  >
    <!-- :hidden="state.modalVisible" -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createBlogModal">
            Create A New Blog Post
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createBlog">
            <div class="form-group">
              <input type="text"
                     name="Blog title"
                     id="blogTitle"
                     class="form-control"
                     placeholder="Blog title"
                     v-model="state.newBlog.title"
              >
              <textarea class="form-control"
                        name="Body"
                        id="body"
                        rows="5"
                        placeholder="Body"
                        v-model="state.newBlog.body"
              >
              </textarea>
              <input type="text"
                     name="Image url"
                     id="imageUrl"
                     class="form-control"
                     placeholder="Image url"
                     v-model="state.newBlog.imgUrl"
              >
              <input type="text"
                     name="Tags"
                     id="tags"
                     class="form-control"
                     placeholder="Tags"
                     v-model="state.newBlog.tags"
              >
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="isPublished" v-model="state.newBlog.published">
                <label class="form-check-label" for="isPublished">
                  Publish? (If left unchecked draft will be saved)
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div class="modal fade"
       id="editBlogModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editBlogModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editBlogModal">
            Edit This Blog Post
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="editBlog" id="formCreate">
            <div class="form-group">
              <input type="text"
                     name="Blog title"
                     id="blogTitle"
                     class="form-control"
                     placeholder="Blog title"
                     v-model="state.blogEdits.title"
              >
              <textarea class="form-control"
                        name="Body"
                        id="body"
                        rows="5"
                        placeholder="Body"
                        v-model="state.blogEdits.body"
              >
              </textarea>
              <input type="text"
                     name="Image url"
                     id="imageUrl"
                     class="form-control"
                     placeholder="Image url"
                     v-model="state.blogEdits.imgUrl"
              >
              <input type="text"
                     name="Tags"
                     id="tags"
                     class="form-control"
                     placeholder="Tags"
                     v-model="state.blogEdits.tags"
              >
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="isPublished" v-model="state.blogEdits.published">
                <label class="form-check-label" for="isPublished">
                  Publish? (If left unchecked draft will be saved)
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import router from '../router'
export default {
  name: 'ModalComponent',
  setup() {
    const state = reactive({
      modalVisible: false,
      newBlog: {},
      blogEdits: computed(() => AppState.activeBlog),
      activeBlog: computed(() => AppState.activeBlog)
    })
    return {
      state,
      async createBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
          state.newBlog = {}
          // REVIEW why doesn't this work: $('#createBlogModal').modal('hide')
          document.getElementById('closeModal').click()
          // state.modalVisible = true
          router.push({ name: 'BlogDetails', params: { id: state.activeBlog.id } })
        } catch (error) {
          logger.error(error)
        }
      },
      async editBlog() {
        try {
          await blogsService.editBlog(state.blogEdits.id, state.blogEdits)
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
