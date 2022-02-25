export default {
  welcome: {
    messages: [
    ]
  },
  about: {
    command: 'about',
    description: 'À propos du créateur',
    messages: [
      // {
      //   class: ``,
      //   text:`Bla bla bla`
      // }
    ]
  },
  projects: {
    command: `projects`,
    description: `Liste les projets personnels et professionnels`,
    messages: [

    ]
  },
  contact: {
    command: 'contact',
    description: 'Moyen permettant de contacter le créateur',
    messages: [
      {
        label: `Téléphone`,
        text: `${process.env.APP.contact.phone}`,
        type: ``
      },
      {
        label: `Mail`,
        text: `${process.env.APP.contact.mail}`,
        type: ``
      },
      {
        label: `LinkedIn`,
        text: `${process.env.APP.contact.linkedIn}`,
        type: ``
      },
      {
        label: `GitHub`,
        text: `${process.env.APP.contact.gitHub}`,
        type: ``
      }
    ]
  },
  version: {
    command: 'version',
    description: 'Retourne la version actuelle du terminal',
    messages: [
      {
        text: `La version du terminal est ${process.env.APP.version}`
      }
    ]
  },
  clear: {
    command: 'clear',
    description: 'Efface les messages affiché dans le terminal'
  }
}

