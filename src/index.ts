#! /usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import { askProjectType, askConfirm, askWhatFilesToCopy } from './helpers/questions'
import { getFilesFromTemplate, getCurrentDirectory} from './helpers/files'
import * as appConstants from './config/constants'

interface Choices {
  name: string,
  value: string,
  checked?: boolean
}

const main = async (): Promise<string> => {
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
    return Promise.resolve('Files copied !') // TODO: print a list with copied files
  } else {
    return Promise.resolve(`You've changed your mind !`)
  }

}

//clear the terminal before starting
console.clear()
main()
  .then((r) =>  console.log(r))
  .catch(err => console.log('Ooops, something happend !')) //TODO: separate user error vs node error

