import inquirer from 'inquirer'

import {getTemplatesList} from './files'
import {FilesToCopy} from '../interfaces/Files'

export const askProjectType = async () => {
  const projectTypes = getTemplatesList()
  const type = await inquirer
    .prompt(
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of project you want to prepare ?',
        choices: projectTypes
      }
    )
  return type
}

export const askWhatFilesToCopy = async (choices) => {
  const files: FilesToCopy = await inquirer
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
  return files
}

export const askConfirm = async (message: string) => {
  const response = await inquirer
    .prompt({
      name: 'confirm',
      type: 'confirm',
      message: message
    })
  return response
}