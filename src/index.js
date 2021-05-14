#! /usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const questions = require('./helpers/questions')
const filesHelper = require('./helpers/files')
const appConstants = require('./config/constants')

questions.askProjectType().then((type) => {
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
  inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select files to copy',
      name: 'files',
      pageSize: choices.length,
      choices: 
        // new inquirer.Separator(' = The Files = '),
        choices
      ,
      validate: function (answer) {
        if (answer.length < 1) {
          return 'You must choose at least one file.';
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    answers.files.forEach(file => {
      // copy file from package module tu current directory where package is called
      const filePath = path.join(__dirname, appConstants.templatesDir, type.projectType, file);
      const newPath = path.join(path.join(filesHelper.getCurrentDirectory(), file))
      // fs.copyFileSync(filePath, newPath)
    })
    console.log('FILE copied !');
  });
})
