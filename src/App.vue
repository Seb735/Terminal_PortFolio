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
          :prefix="prefix"
          autofocus
          dense
          borderless
          @keyup.enter.prevent="commandEntry"
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
      prefix: '$ ~ '
    }
  },
  computed: {
    ...storeCommand.mapGetters({
      existCommand: 'existCommand',
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
    commandEntry (evt) {

      if (evt.keyCode !== 13) {
        console.log(evt)
        this.handleEvent(evt)
      }

      if(!this.inputCommand) {
        this.messageList.push(this.inputCommand)
        return
      }

      this.commandHistory.push(this.inputCommand)
      this.historyIndex = this.commandHistory.length

      if (this.inputCommand === 'clear'){
        this.messageList = []
        return
      }
      if (this.inputCommand === 'help') {
        const descriptionCommand = this.getDescriptionCommand
        _.forEach(descriptionCommand, (description, command) => {
          this.messageList.push(`"${command}" : ${description}`)
        })
        return
      }

      const messagesCommand = this.getMessagesCommand(this.inputCommand)
      console.log(messagesCommand)

      this.messageList.push(this.prefix + this.inputCommand)
      _.forEach(messagesCommand, (msg) => {
        this.messageList.push(msg)
      })
    }
  },
  handleEvent (evt) {
    console.log(evt)
    switch (evt.keyCode) {
      case 38: // Arrow up
        this.historyIndex = this.historyIndex === 0 ? 0 : this.historyIndex - 1
        this.inputCommand = this.commandHistory[this.historyIndex]
        break;
      case 40: // Arrow down
        this.historyIndex = this.historyIndex === this.commandHistory.length ? this.commandHistory.length : this.historyIndex + 1
        this.inputCommand = this.commandHistory[this.historyIndex]
        break;
      default:
        break;
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
