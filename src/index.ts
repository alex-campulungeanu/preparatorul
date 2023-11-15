#! /usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import boxen from 'boxen'

import { askProjectType, askConfirm, askWhatFilesToCopy } from './helpers/questions'
import { getFilesFromTemplate, getCurrentDirectory} from './helpers/files'
import * as appConstants from './config/constants'
import { showWelcome } from './helpers/commons'
import { Choices } from './interfaces/Questions'

const init = async (): Promise<string> => {
  showWelcome()

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
    const filesList = filesToCopy.files.map( file => {
      return `${chalk.green('*')} ${file}`
    }).join('\n')
    const cardData = {
      header: chalk.bold.green(`Files copied`),
      files: filesList
    }
    const filesBox = boxen(
      [
        `${cardData.header}`,
        ``,
        `${cardData.files}`,
      ].join('\n'), {
        margin: 1,
        // float: "center",
        padding: 1,
        borderStyle: "single",
        borderColor: "green",
      }
    )
    return Promise.resolve(filesBox) // TODO: print a list with copied files
  } else {
    return Promise.resolve(`You've changed your mind !`)
  }

}

//clear the terminal before starting
console.clear()
init()
  .then((r) =>  console.log(r))
  .catch(err => console.log('Ooops, something happend !')) //TODO: separate user error vs node error