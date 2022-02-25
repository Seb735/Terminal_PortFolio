<template>
  <div
    class="terminal"
    @click="toFocus"
  >

    <div class="terminal-header">
      <h6>{{title}}</h6>
      <q-icon
        class="icon-close"
        color="red"
        name="fas fa-times-circle"
      />
    </div>

    <div class="terminal-window q-pt-sm">

      <div
        v-if="messageList.length > 0"
        class="msg q-px-sm"
      >
        <q-list>
          <q-item
            v-for="(message, index) in messageList"
            :key="index"
            class="q-pl-sm q-py-none"
          >
            <q-item-section
              class="messageLine"
            >
              <span
                v-if="message.label"
                :class="`${message.type} q-pl-sm`"
              >
                {{ `${message.label} : `}}
              </span>
              <span class="q-pl-sm">{{ message.text }}</span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="cmd q-px-sm">
        <q-input
        ref="inputLine"
        v-model="inputCommand"
        class="input-box"
        type="text"
        dense
        borderless
        @keyup.enter="commandEntry"
        @keyup="handleEvent"
      />
        <div class="displayCmd">
          <span class="q-pr-xs">$  {{ prompt }}</span><span> {{ inputCommand }}</span><span class="cursor"></span>
        </div>

      </div>

    </div>

  </div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
import _ from 'lodash'

const storeCommand = createNamespacedHelpers('command')
export default {
  name: 'App',
  data () {
    return {
      title: `${process.env.APP.name}`,
      inputCommand: '',
      messageList: [],
      indexHistory: 0,
      commandHistory: [],
      prompt: '~>'
    }
  },
  computed: {
    ...storeCommand.mapGetters({
      getMessagesCommand: 'getMessagesCommand',
      getDescriptionCommand: 'getDescriptionCommand'
    })
  },
  watch: {
    messageList: {
      deep: true,
      handler () {
        this.inputCommand = ''
      }
    }
  },
  methods: {
    toFocus() {
      this.$refs.inputLine.focus()
    },
    commandEntry () {
      if (!this.inputCommand) {
        this.pushToList(this.prompt)
        return
      }

      this.commandHistory.push(this.inputCommand)
      this.indexHistory = this.commandHistory.length

      if (this.inputCommand === 'clear'){
        this.messageList = []
        return
      }
      if (this.inputCommand === 'help') {
        this.pushToList({text: `${this.prompt} ${this.inputCommand}`})
        const descriptionCommand = this.getDescriptionCommand
        _.forEach(descriptionCommand, (description, command) => {
          this.pushToList({label: command, text:description})
        })
        return
      }

      const messagesCommand = this.getMessagesCommand(this.inputCommand)
      this.pushToList({text: `${this.prompt} ${this.inputCommand}`})
      _.forEach(messagesCommand, (msg) => {
        this.pushToList(msg)
      })
    },
    handleEvent (evt) {
      switch (evt.key) {
        case 'ArrowUp':
          this.indexHistory = this.indexHistory === 0 ? 0 : this.indexHistory - 1
          this.inputCommand = this.commandHistory[this.indexHistory]
          break;
        case 'ArrowDown':
          this.indexHistory = this.indexHistory === this.commandHistory.length ? this.commandHistory.length : this.indexHistory + 1
          this.inputCommand = this.commandHistory[this.indexHistory]
          break;
        default:
          break;
      }
    },
    pushToList (msg = {}) {
      this.messageList.push(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
