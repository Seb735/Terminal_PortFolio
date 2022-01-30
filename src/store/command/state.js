export default {
  about: {
    command: 'about',
    description: 'À propos du créateur',
    messages: [

    ]
  },
  contact: {
    command: 'contact',
    description: 'Moyen permettant de contacter le créateur',
    messages: [
        `Téléphone: ${process.env.APP.contact.phone}`,
        `Mail: ${process.env.APP.contact.mail}`,
        `LinkedIn: ${process.env.APP.contact.linkedIn}`,
        `GitHub: ${process.env.APP.contact.gitHub}`
    ]
  },
  version: {
    command: 'version',
    description: 'Retourne la version actuelle du terminal',
    messages: [
        `La version est ${process.env.APP.version}`
    ]
  },
  clear: {
    command: 'clear',
    description: 'Efface les messages affiché dans le terminal'
  }
}

