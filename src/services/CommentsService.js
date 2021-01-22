import { blogsService } from './BlogsService'

const { AppState } = require('../AppState')
const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class CommentsService {
  async createComment(comment, id) {
    try {
      await api.post('api/comments', comment)
      blogsService.getComments(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async editComment(id, commentEdit) {
    try {
      const res = await api.put('api/comments/' + id, commentEdit)
      const index = AppState.comments.indexOf(comment => comment.id === id)
      AppState.comments = AppState.comments.splice(index, 1, res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(id) {
    try {
      await api.delete('api/comments' + id)
      AppState.comments = AppState.comments.filter(comment => !(comment.id === id))
    } catch (error) {
      logger.error(error)
    }
  }
}

export const commentsService = new CommentsService()
