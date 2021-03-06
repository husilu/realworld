<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link to='/login' v-if='!isLogin'>Have an account?</nuxt-link>
            <nuxt-link to='/register' v-if='isLogin'>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for='(messages, field) in errors'>
              <li v-for='(message, index) in messages' :key='index'>
                {{field}} {{message}}
              </li>
            </template>

          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if='!isLogin'>
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model='user.username' required />
            </fieldset>
            <fieldset class="form-group">
              <input v-model='user.email' class="form-control form-control-lg" type="email" placeholder="Email" required />
            </fieldset>
            <fieldset class="form-group">
              <input v-model='user.password' class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="loading">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
// 仅在客户端加载 js-cookie包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
        username: ""
      },
      errors: {} // 错误信息
    };
  },
  methods: {
    async onSubmit() {
      // 提交表单请求登录
      this.loading = true;
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        this.loading = false;
        // console.log(data);
        // 为了防止刷新页面，数据丢失 我们需要把数据持久化
        Cookie.set("user", data.user);
        // TODO 保存用户的登录状态
        this.$store.commit("setUser", data.user);
        // 跳转到首页
        this.$router.push("/");
      } catch (err) {
        // console.log("请求失败", err);
        this.loading = false;
        this.errors = err.response.data.errors;
      }
    }
  }
};
</script>

<style>
</style>