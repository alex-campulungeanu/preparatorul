import chalk from 'chalk'

const name = 'Preparatorul'
const coloredName = chalk.green(name)

const messages = {
  welcome: `Welcome to ${coloredName} ! A cli to update project with common configuration files`,
  complete: 'Setup is complete !',
  thanks: `Thanks for using ${coloredName}`
}

export { name, messages }