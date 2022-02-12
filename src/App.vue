<template>
  <div class="terminal">
    <div class="terminal-header">
      <h6>{{title}}</h6>
      <q-icon
        class="icon-close"
        color="red"
        name="fas fa-times-circle"
      />
    </div>
    <div class="terminal-window">
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
          class="input-box"
          type="text"
          :prefix="`$ ${prompt}`"
          autofocus
          dense
          borderless
          @keyup.enter="commandEntry"
          @keyup="handleEvent"
        />
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
      handler () {
        this.inputCommand = ''
      }
    }
  },
  methods: {
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
        const descriptionCommand = this.getDescriptionCommand
        _.forEach(descriptionCommand, (description, command) => {
          this.pushToList(`"${command}" ----> ${description}`)
        })
        return
      }

      const messagesCommand = this.getMessagesCommand(this.inputCommand)
      this.pushToList(`${this.prompt} ${this.inputCommand}`)
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
      this.messageList.push(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.terminal {
  position: relative;
  width: 70vw;
  border-radius: 4px;
  height: 70vh;
  text-overflow: ellipsis;
  overflow: auto;
}

.terminal-header {
  background-color: black;
  color: white;
  display: flex;
  justify-content: flex-end;
  border-radius: 10px 10px 0 0;

  h6 {
    margin: 0;
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
  }

  .icon-close {
    align-self: center;
    margin-right: 15px;

  }
}

.terminal-window {
  background-color: gray;
  height: 65vh;
  border-radius: 0 0 10px 10px;
  color: white;

}

.terminal .terminal-window .cursor {
  margin: 0;
  background-color: white;
  animation: blink 1s step-end infinite;
  -webkit-animation: blink 1s step-end infinite;
  margin-left: -5px;
}


</style>
