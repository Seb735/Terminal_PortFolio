import _ from 'lodash'

export default {
  // Vérifie que la commande existe dans le store
  existCommand: (state) => (inputCommand) => _.has(state, [inputCommand]),

  // Récupère les descriptions des commandes
  getDescriptionCommand: (state) => {
    const descriptionCommand = {}
    _.map(state, (s) => {
      descriptionCommand[s.command] = s.description
    })
    return descriptionCommand
  },

  // Récupère les messages à afficher lors de l'appel de la commande
  getMessagesCommand: (state, getters) => (inputCommand) => {
    if (getters.existCommand(inputCommand) || !inputCommand) {
      return _.get(state, [inputCommand, 'messages'], [])
    }

    return [
      'Commande invalide',
      'Utilisez "help" pour connaître les commandes'
    ]
  }
}
