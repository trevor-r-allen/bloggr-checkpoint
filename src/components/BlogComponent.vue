<template>
  <div class="blog col-3 my-auto">
    <router-link :to="{name: 'BlogDetails', params: {id: blogProp.id}}">
      <div class="card my-2">
        <img class="card-img-top" :src="blogProp.imgUrl || 'https://place-hold.it/200x200'" alt="">
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
.card{

}
</style>
