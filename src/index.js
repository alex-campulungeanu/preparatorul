#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const questions = require('./helpers/questions')
const filesHelper = require('./helpers/files')
const appConstants = require('./config/constants')

const main = async () => {
  const type = await questions.askProjectType()
  const templateFiles = filesHelper.getFilesFromTemplate(type.projectType)
  const choices = []
  templateFiles.forEach((file) => {
    if (fs.existsSync(path.join(filesHelper.getCurrentDirectory(), file))) {
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
  const filesToCopy = await questions.askWhatFilesToCopy(choices)
  
  const resp = await questions.confirm('Are you sure you want to save the files ?')
  if(resp.confirm) {
    // copy files from package module tu current directory where package is called
    filesToCopy.files.forEach(file => {
      const filePath = path.join(__dirname, appConstants.templatesDir, type.projectType, file);
      const newPath = path.join(path.join(filesHelper.getCurrentDirectory(), file))
      fs.copyFileSync(filePath, newPath)
    })
    return Promise.resolve('Files copied !')
  } else {
    // throw 'Abort, nothing was saved'
    return Promise.resolve(`You've changed your mind !`)
  }

}

//clear the terminal before starting
console.clear()
main()
  .then((r) =>  console.log(r))
  .catch(err => console.log('Ooops, something happend !')) //TODO: separate user error vs node error

