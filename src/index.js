#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

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
        name: `${file} (already exists !)`,
        value: file,
      })
    } else {
      choices.push({
        name: file,
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
  } else {
    throw 'Abort, nothing was saved'
  }

}

main()
  .then(() =>  console.log('FILE copied !'))
  .catch(err => console.log('Something happend !', err)) //TODO: separate user error vs node error

