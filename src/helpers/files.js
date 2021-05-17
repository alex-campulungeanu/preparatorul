// const fs = require('fs');
import fs from 'fs'
// const path = require('path');
import path from 'path'

export const appConstants = require('../config/constants')

// current directory when running the package
export const getCurrentDirectory = () => {
  return process.cwd()
}

export const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd())
}

export const getSrcRoot = () => path.dirname(require.main.filename);

export const directoryExists = (filePath) => {
  return fs.existsSync(filePath)
}

const getTemplatePath = (template) => {
  return path.join(getSrcRoot(), appConstants.templatesDir, template)
}

export const getFilesFromTemplate = (template) => {
  const templatePath = getTemplatePath(template)
  return fs.readdirSync(templatePath)
}

export const getTemplatesList = () => {
  const templatesList = fs.readdirSync(path.join(getSrcRoot(), appConstants.templatesDir))
  return templatesList
}


// module.exports = {
//   getSrcRoot,
//   getCurrentDirectory,
//   getCurrentDirectoryBase,
//   directoryExists,
//   getFilesFromTemplate,
//   getTemplatesList
// }