#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");
const mustache = require("mustache");

let data = {};
let filename = `${__dirname}/html.txt`;

program
  .version("1.0")
  .option("-l, --lang [lang]", 'Add a language code to the HTML.  If you do not designate this, the "en" code will be used.')
  .option("-t, --title [title]", 'Add a title to the document.  If you do not add a title, it will be "Untitled Document".')
  .option("-o, --output [filename]", "Write the HTML using the [filename] (.html will automatically be tacked onto the name of the file.)  The default is to write a file named test.html")
  .parse(process.argv);

if (program.title) {
  data.title = program.title;
} else {
  data.title = "Untitled Document";
} // end if else

if (program.output) {
  data.output = `${program.output}.html`;
} else {
  data.output = "test.html";
} // end if else

if (program.lang) {
  data.lang = program.lang;
} else {
  data.lang = "en";
} // end if else.

console.log(`Filename: ${data.output}`);
console.log(`Title: ${data.title}`);
console.log(`Language: ${data.lang}`);

fs.readFile(filename, "utf8", function (error, contents) {
  
  let output_contents = mustache.render(contents, data);
  fs.writeFile(data.output, output_contents, function (error) {
    let msg = (error)?error:"File written successfully.";
    return console.log(msg);
  });
});