<template>
  <div class="login">
    <tabbar :active="2"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from "@/components/Tabbar.vue";

export default {
  name: 'login',
  components: {
    Tabbar
  }
}
</script>
