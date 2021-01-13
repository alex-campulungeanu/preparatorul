const fs = require('fs');
const path = require('path');

const appConstants = require('../config/constants')

// current directory when running the package
const getCurrentDirectory = () => {
  return process.cwd()
}

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd())
}

const getSrcRoot = () => path.dirname(require.main.filename);

const directoryExists = (filePath) => {
  return fs.existsSync(filePath)
}

const getTemplatePath = (template) => {
  return path.join(getSrcRoot(), appConstants.templatesDir, template)
}

const getFilesFromTemplate = (template) => {
  const templatePath = getTemplatePath(template)
  return fs.readdirSync(templatePath)
}

const getTemplatesList = () => {
  let templatesList = fs.readdirSync(path.join(getSrcRoot(), appConstants.templatesDir))
  return templatesList
}


module.exports = {
  getSrcRoot,
  getCurrentDirectory,
  getCurrentDirectoryBase,
  directoryExists,
  getFilesFromTemplate,
  getTemplatesList
}