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

module.exports = {
    askProjectType
}