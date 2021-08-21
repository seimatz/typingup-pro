<template>
  <div class="container">

    <div class="columns">
      <SideMenu :post="post"></SideMenu>

      <div class="column is-8">
        <div class="box has-text-left">
          <h1 class="title"> 404 Page Not Found</h1>
        </div>
      </div>

    </div>
  </div>



</template>

<script>
import SideMenu from '@/components/SideMenu';

export default {
  name: 'notFound',
  components: {
    SideMenu,
  },
  data () {
    return {

    }
  }

}
</script>
