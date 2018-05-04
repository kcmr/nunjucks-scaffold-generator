'use strict';

const fs = require('fs-extra');
const path = require('path');
const nunjucks = require('nunjucks');

const getReplacedFileName = ([pattern, replacement]) => 
  (file) => file.replace(pattern, replacement);

const getFileWithoutAbsolutePath = (file, path) => file.split(path)[1].slice(1);

const getOutputFileName = (file, src, replacement) => {
  const fileWithoutAbsoutePath = getFileWithoutAbsolutePath(file, src);
  return (replacement && replacement.length === 2)
    ? getReplacedFileName(replacement)(fileWithoutAbsoutePath)
    : fileWithoutAbsoutePath;
};

const getAllTemplateFiles = (dir) =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllTemplateFiles(name)] : [...files, name];
  }, []);

const render = ({src, dest, replacement = [], ...templateParams}) => {
  nunjucks.configure(src);
  const files = getAllTemplateFiles(src);
  files.forEach((file) => {
    nunjucks.render(file, templateParams, (function(err, result) {
      if (err) return console.log(err);
      const outputFile = getOutputFileName(file, src, replacement);
      fs.outputFile(path.resolve(dest, outputFile), result);
    }));
  });
};

module.exports = {
  scaffold: render,
};