"use strict";
const { readFileSync, writeFileSync, mkdirSync } = require("fs");

function convertES6ToCommonJS(source) {
	return '"use strict";\n\n' + source.replace(/export class ([^ ]+)/g, (match, className) => {
		return `module.exports.${className} = class ${className}`;
	});
}

let source = readFileSync("src/index.js", "utf8");
mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.es6.js", source);
writeFileSync("dist/index.cjs.js", convertES6ToCommonJS(source));
