<template>
  <div class="page">

    <div class="terminal">
      <div class="cmd">
        <q-input
          type="text"
          prefix="$>>"
          autofocus
          dense
          borderless
          v-model="text"
        />
      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 90%;

  .terminal {
    background-color: #F2C037;
    height: 500px;
    width: 700px;
  }
}
</style>
