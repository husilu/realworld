<template>
  <div class="editor-page">
    <div class="container page">
      <ul class="error-messages">
        <template v-for='(messages, field) in errors'>
          <li v-for='(message, index) in messages' :key='index'>
            {{field}} {{message}}
          </li>
        </template>
      </ul>
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model='params.title' />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="params.body" />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="params.description"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" @keyup.enter="addTag" v-model='tagName' />
                <div class="tag-list">
                  <span v-for="(item, index) in params.tagList" :key='index' class='tag-default tag-pill'>
                    <i class='ion-close-round' @click='scHandler(index)'></i>{{item}}</span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click='postArticle' :disabled='publoading'>
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postArticle, getArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      errors: {},
      params: {
        title: "",
        body: "",
        description: "",
        tagList: []
      },
      tagName: "",
      publoading: false
    };
  },
  async mounted() {
    if (this.$route.params.slug) {
      let res = await getArticle(this.$route.params.slug);
      let { article } = res.data;
      this.params.title = article.title;
      this.params.body = article.body;
      this.params.description = article.description;
      this.params.tagList = article.tagList;
    }
  },
  methods: {
    async postArticle() {
      this.publoading = true;
      try {
        let res = await postArticle({ article: this.params });
        this.publoading = false;
        this.$router.push({
          name: "article",
          params: {
            slug: res.data.article.slug
          }
        });
      } catch (err) {
        this.publoading = false;
        // console.log("请求失败", err);
        this.errors = err.response.data.errors;
      }
    },
    addTag() {
      this.params.tagList.push(this.tagName);
      this.tagName = "";
    },
    scHandler(index) {
      this.params.tagList.splice(index, 1);
    }
  }
};
</script>

<style>
</style>