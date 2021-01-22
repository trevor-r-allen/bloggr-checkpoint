const { AppState } = require('../AppState')
const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class BlogsService {
  async getBlogs() {
    try {
      const res = await api.get('api/blogs')
      AppState.blogs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getBlogById(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      AppState.activeBlog = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get('api/blogs/' + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createBlog(blog) {
    try {
      const res = await api.post('api/blogs', blog)
      AppState.blogs.push(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async editBlog(id, blogEdit) {
    try {
      const res = await api.put('api/blogs/' + id, blogEdit)
      const index = AppState.blogs.indexOf(blog => blog.id === id)
      AppState.blogs = AppState.blogs.splice(index, 1, res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBlog(id) {
    try {
      await api.delete('api/blogs/' + id)
      AppState.blogs = AppState.blogs.filter(blog => !(blog.id === id))
    } catch (error) {
      logger.error(error)
    }
  }
}

export const blogsService = new BlogsService()
