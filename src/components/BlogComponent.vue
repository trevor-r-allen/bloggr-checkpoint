<template>
  <div class="blog col">
    <router-link :to="{name: 'BlogDetailsPage', params: {id: blogProp.id}}">
      <div class="card">
        <img class="card-img-top" :src="blogProp.imgUrl" alt="">
        <div class="card-body">
          <h4 class="card-title">
            {{ blogProp.title }}
          </h4>
          <p class="card-text">
            {{ blogProp.creator.name }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {

  }

}
</script>

<style>

</style>
