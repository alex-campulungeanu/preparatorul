#! /usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import figlet from 'figlet'

import { askProjectType, askConfirm, askWhatFilesToCopy } from './helpers/questions'
import { getFilesFromTemplate, getCurrentDirectory} from './helpers/files'
import * as appConstants from './config/constants'
import { name, messages } from './helpers/messages'

interface Choices {
  name: string,
  value: string,
  checked?: boolean
}

const init = async (): Promise<string> => {
  const { welcome, thanks } = messages

  const asciiArt = figlet.textSync(name, {
    font: 'ANSI Shadow'
  })
  console.log(`\n ${chalk.green(asciiArt)}`)
  console.log(`${welcome} \n`)

  const type = await askProjectType()
  const templateFiles = getFilesFromTemplate(type.projectType)
  const choices: Array<Choices> = []
  templateFiles.forEach((file: string) => {
    if (fs.existsSync(path.join(getCurrentDirectory(), file))) {
      choices.push({
        name: `${file} ${chalk.red('already exists / will be rewritten !')}`,
        value: file,
      })
    } else {
      choices.push({
        name: `${chalk.green(file)}`,
        value: file,
        checked: true,
      })
    }
  })

  // ask what files should be copied
  const filesToCopy = await askWhatFilesToCopy(choices)
  
  const resp = await askConfirm('Are you sure you want to save the files ?')
  if(resp.confirm) {
    // copy files from package module tu current directory where package is called
    filesToCopy.files.forEach((file: string) => {
      const filePath = path.join(__dirname, appConstants.templatesDir, type.projectType, file);
      const newPath = path.join(path.join(getCurrentDirectory(), file))
      fs.copyFileSync(filePath, newPath)
    })
    return Promise.resolve(`Files saved, ${thanks}`) // TODO: print a list with copied files
  } else {
    return Promise.resolve(`You've changed your mind !`)
  }

}

//clear the terminal before starting
console.clear()
init()
  .then((r) =>  console.log(r))
  .catch(err => console.log('Ooops, something happend !')) //TODO: separate user error vs node error

