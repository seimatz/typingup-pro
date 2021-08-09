<template>
  <div class="container">

    <div class="columns">
      <SideMenu :post="post"></SideMenu>

      <div class="column is-8">
          <component :is="item"></component>
      </div>

    </div>
  </div>



</template>

<script>
import SideMenu from '@/components/SideMenu';
import Howtouse from '@/components/post-howtouse';
import Feedback from '@/components/post-feedback';

export default {
  name: 'contents',
  components: {
    SideMenu,
    howtouse: Howtouse,
    feedback: Feedback,
  },
  data () {
    return {
      post: '',
      item: 'howtouse'
    }
  },
  created: function() {
    this.post = this.$route.params.post;
    this.item = this.post;
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
