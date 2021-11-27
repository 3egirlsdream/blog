<template>
<v-card >
  <v-card-title class="headline">请先登录</v-card-title>
   <v-card-text >
      <v-form
   class="ma-2"
    ref="form"
    lazy-validation
  >

    <v-text-field
      v-model="name"
      label="用户名"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      class="input-group--focused"
      :type="visible ? 'text' : 'password'"
      :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="visible = !visible"

      label="密码"
      required
    ></v-text-field>

    <v-btn
      color="primary"
      class="mr-4"
      @click="login"
    >
      登录
    </v-btn>

    <v-btn
      color="error"
      @click="$emit('cancel')"
    >
      取消
    </v-btn>
  </v-form>
    </v-card-text>

  </v-card>
</template>
<script>
import fsCfg from "../assets/js/fw.js";
import framework from "../assets/js/framework.js";
export default {
  name: "LoginCard",
  data(){
    return {
      name:'',
      password:'',
      visible:false,
    }
  },
  props: {
  },
  methods:{
    login(){
      let url = `/api/Auth/GetToken?name=${this.name}&pwd=${this.password}`;
      fsCfg.http('get', url).then((res)=>{
        if(res.success){
          framework.setStorage('__token__', res.data);
          this.$emit('logined');
        }
        else{
          alert(res.message.content)
        }
      });
    }
  },
  computed: {

  },
};
</script>

<style lang="sass">
.v-card.v-card--material
  > .v-card__title
    > .v-card--material__title
      flex: 1 1 auto
      word-break: break-word
</style>
