<template>
  <div class="card">
    <div class="card-body">
      <h4 v-if="commentProp.creator" class="card-title">
        {{ commentProp.creator.name }}
      </h4>
      <p class="card-text">
        {{ commentProp.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {

  }

}
</script>

<style>

</style>
