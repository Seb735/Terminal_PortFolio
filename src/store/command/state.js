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
      `Veuillez préciser le type de projets que vous souhaitez voir`,
      `--personal  Pour les projets personnels`,
      `--work  Pour les projets professionnels`
    ],
    subCommands: {
      personnal: {
        messages: []
      },
      work: {
        messages: [
          `Seku`
        ]
      }
    }
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

