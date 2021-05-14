const inquirer = require('inquirer')

const filesHelper = require('../helpers/files')

const askProjectType = async () => {
  const projectTypes = filesHelper.getTemplatesList()
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

const askWhatFilesToCopy = async (choices) => {
  const files = await inquirer
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

module.exports = {
    askProjectType,
    askWhatFilesToCopy
}