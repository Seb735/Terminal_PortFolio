<template>
    <div class="terminal">
      <div class="cmd">
        <q-input
          v-model="text"
          type="text"
          prefix="$>>"
          autofocus
          dense
          borderless
        />
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
.terminal {
  background-color: #F2C037;
  height: 100%;
  width: 100%;
}

</style>
