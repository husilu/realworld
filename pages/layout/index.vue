<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link to='/' class="navbar-brand">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link to='/' class="nav-link" exact>Home</nuxt-link>
          </li>
          <template v-if='user'>
            <li class="nav-item">
              <nuxt-link to='/neweditor' class="nav-link">
                <i class="ion-compose"></i>&nbsp;New Article</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to='/settings' class="nav-link">
                <i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: user.username
                }
              }" class="nav-link"><img :src="user.image" alt="" class='user-pic'>{{user.username}}</nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link to='/login' class="nav-link">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to='/register' class="nav-link">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- 子路由 -->
    <nuxt-child />
    <!-- 底部内容 -->
    <footer>
      <div class="container">
        <nuxt-link to='/' class="logo-font">&nbsp;conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LayoutIndex",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  methods: {}
};
</script> 
<style>
</style>
