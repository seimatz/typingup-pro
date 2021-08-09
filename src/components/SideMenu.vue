<template>
  <div class="column is-2">
      <aside class="menu is-hidden-mobile">
          <p class="menu-label">
              Languages
          </p>
          <ul class="menu-list">
            <li><a href="/language/english" v-bind:class="{'is-active': language === 'English'}">English</a></li>
            <li><a href="/language/french" v-bind:class="{'is-active': language === 'French'}">French</a></li>
            <li><a href="/language/german" v-bind:class="{'is-active': language === 'German'}">German</a></li>
            <li><a href="/language/italian" v-bind:class="{'is-active': language === 'Italian'}">Italian</a></li>
            <li><a href="/language/portuguese" v-bind:class="{'is-active': language === 'Portuguese'}">Portuguese</a></li>
            <li><a href="/language/russian" v-bind:class="{'is-active': language === 'Russian'}">Russian</a></li>
            <li><a href="/language/spanish" v-bind:class="{'is-active': language === 'Spanish'}">Spanish</a></li>
          </ul>
          <p class="menu-label">
              Contents
          </p>
          <ul class="menu-list">
            <li><a href="/contents/howtouse" v-bind:class="{'is-active': post === 'howtouse'}">How to use</a></li>
            <li><a href="/contents/feedback" v-bind:class="{'is-active': post === 'feedback'}">Feedback</a></li>
          </ul>

      </aside>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['language', 'post'],
  data () {
    return {
    }
  },
  created: function(){
  },
  methods: {
  }
}
</script>
