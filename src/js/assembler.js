var fs = require('fs'),
    util = require('./util');

var labels,
    cpu,
    operationNameToCodeMap;

function init(cpuArg) {
    labels = {};
    cpu = cpuArg;

    operationNameToCodeMap = {};

    cpuArg.operations.forEach(function(operation, index) {
        operationNameToCodeMap[operation.name] = index;
    });
}

function compile(file, cb) {
    fs.readFile(file, 'utf8', function(err, data) {
        if(err) {
            console.log(err);
            return;
        }

        var result = parseAssembly(data);

        console.log('Parsed Assembly');
        console.log(util.arrayToObject(result));
        console.log(labels);
        cb(result);
    });
}

function parseAssembly(assembly) {
    var parts = assembly.split(/\s+/g),
        result = [];

    console.log(util.arrayToObject(parts));

    parseLabelDefinitions(parts);
    console.log(labels);

    parts.forEach(function(part, index) {
        result[index] = getValue(part, index, result[index-1]);
    });

    return result;
}

function parseLabelDefinitions(parts) {
    parts.forEach(function(part, index) {
        if(part.indexOf(':') === part.length-1) {
            var label = part.substring(0, part.length-1);
            labels[label] = index;
            parts.splice(index, 1);
        }
    });
}

function getValue(part, index, previousValue) {

    //Translate OpName to OpCode
    for(var operationIndex = 0; operationIndex < cpu.operations.length; operationIndex++) {
        if(cpu.operations[operationIndex].name === part) {
            return operationIndex;
        }
    }

    //Translate Label References based on OpCode before it
    if(labels[part]) {
        console.log('found label ref ' + part + ' at ' + labels[part]);
        console.log(previousValue);
        console.log(index);
        var operation = cpu.operations[previousValue];

        if(operation.name === 'BNE') {
            return labels[part] - index - 1;
        }

        if(operation.name === 'JSR') {
            return labels[part];
        }
    }

    //Plain number
    return parseInt(part, 10);
}

module.exports = {
    compile: compile,
    init: init
};