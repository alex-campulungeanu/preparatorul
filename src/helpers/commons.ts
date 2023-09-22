import figlet from 'figlet'
import boxen from 'boxen'
import chalk from 'chalk'

import { name, messages } from './messages'

const showWelcome = () => {
  const { welcome, thanks } = messages
  
  const asciiArt = figlet.textSync(name, {
    font: 'ANSI Shadow'
  })
  console.log(boxen(`\n ${chalk.green(asciiArt)}`, {
      margin: 1,
      // float: "center",
      padding: 1,
      borderStyle: "round",
      borderColor: "gray",
    }
  ))
  console.log(`${welcome} \n`)
}

export {
  showWelcome
}