<template>
    <div class="terminal">
      <div class="header">
        HEADER
      </div>
      <div
        v-if="messageList.length > 0"
        class="msg"
      >
        <q-list
          dense
        >
          <q-item
            v-for="(message, index) in messageList"
            :key="index"
            dense
          >
            <q-item-section>
              {{ message }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="cmd">
        <q-input
          ref="inputLine"
          v-model="inputCommand"
          type="text"
          :prefix="`$ ${prompt}`"
          autofocus
          dense
          borderless
          @keyup.enter="commandEntry"
          @keyup.up="handleEvent"
          @keyup.down="handleEvent"
          />
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
      inputCommand: '',
      messageList: [],
      indexHistory: 0,
      commandHistory: [],
      prompt: '~> '
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
      handler (v) {
        console.log(v)
        this.inputCommand = ''
      }
    }
  },
  methods: {
    commandEntry () {
      if (!this.inputCommand) {
        this.pushToList()
        return
      }

      this.commandHistory.push(this.inputCommand)
      this.indexHistory = this.commandHistory.length

      if (this.inputCommand === 'clear'){
        this.messageList = []
        return
      }
      if (this.inputCommand === 'help') {
        const descriptionCommand = this.getDescriptionCommand
        _.forEach(descriptionCommand, (description, command) => {
          this.pushToList(`"${command}" ----> ${description}`)
        })
        return
      }

      const messagesCommand = this.getMessagesCommand(this.inputCommand)
      this.messageList.push(this.inputCommand)
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
    pushToList (msg = '') {
      this.messageList.push(`${this.prompt} ${msg}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.terminal {
  background-color: rgba(54, 98, 36, 0.75);
  height: 100%;
  width: 100%;
}

</style>
