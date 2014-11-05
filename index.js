var fs = require('fs');

var registers = {
    a: 0,
    x: 0,
    y: 0
};

var flags = {
    equal: false
};

var memory = [];
var programCounter = 0;
var stackPointer = 0;

var labels = {

};

var operations = [
    {
        name: 'BRK',
        code: 0,
        execute: function() {

            console.log('\nMemory:');
            console.log(toObject(memory));

            var result = '';
            for(var i = 128; i < memory.length; i++) {
                result += String.fromCharCode(memory[i]);
            }

            console.log('\nResult:');
            console.log(result);

            process.exit(0);
        },
        length: 1
    },
    {
        name: 'LDA',
        code: 1,
        execute: function() {
            programCounter++;
            registers.a = memory[programCounter];
        },
        length: 2
    },
    {
        name: 'ADC',
        code: 2,
        execute: function() {
            programCounter++;
            registers.a = registers.a + memory[programCounter];
        },
        length: 2
    },
    {
        name: 'STA',
        code: 3,
        execute: function() {
            programCounter++;
            memory[memory[programCounter]] = registers.a;
        },
        length: 2
    },
    {
        name: 'LDX',
        code: 4,
        execute: function() {
            programCounter++;
            registers.x = memory[programCounter];
        },
        length: 2
    },
    {
        name: 'INX',
        code: 5,
        execute: function() {
            registers.x++;
        },
        length: 1
    },
    {
        name: 'CMY',
        code: 6,
        execute: function() {
            programCounter++;
            flags.equal = registers.y === memory[programCounter];
        },
        length: 2
    },
    {
        name: 'BNE',
        code: 7,
        execute: function() {
            programCounter++;
            if(!flags.equal) {
                programCounter += memory[programCounter];
            }
        },
        length: 2
    },
    {
        name: 'STA_X',
        code: 8,
        execute: function() {
            memory[registers.x] = registers.a;
        },
        length: 1
    },
    {
        name: 'DEY',
        code: 9,
        execute: function() {
            registers.y--;
        },
        length: 1
    },
    {
        name: 'LDY',
        code: 10,
        execute: function() {
            programCounter++;
            registers.y = memory[programCounter];
        },
        length: 2
    },
    {
        name: 'JSR',
        code: 11,
        execute: function() {
            memory[stackPointer] = programCounter;
            stackPointer--;

            programCounter++;
            programCounter = memory[programCounter] - 1;
        },
        length: 2
    },
    {
        name: 'RTS',
        code: 12,
        execute: function() {
            stackPointer++;
            programCounter = memory[stackPointer] + 1;
        },
        length: 1
    }
];

function execute() {
    if(memory.length > 256) {
        console.log('Memory has a limit of 256 items. Current has ' + memory.length);
    }
    try {
        while(programCounter < memory.length) {
            console.log('\nProgram Counter: ' + programCounter);
            console.log(registers);
            console.log(flags);
            var opCode = memory[programCounter];
            console.log('OpCode: ' + opCode);
            console.log('Running Operation: ' + operations[opCode].name + ' (' + opCode + ')');
            console.log('Next Value: ' + memory[programCounter+1]);
            operations[opCode].execute();
            programCounter++;
        }
    } catch(e) {
        console.log('\n\nFailed!');
        console.log('\nMemory:');
        console.log(toObject(memory));
        console.log('\nFailed!');
        console.log(e);
        console.log(e.stack);
    }

}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) {
        rv[i] = arr[i];
    }
    return rv;
}

function readAssemblyIntoMemory(file, cb) {
    fs.readFile(file, 'utf8', function(err, data) {
        if(err) {
            console.log(err);
            return;
        }

        memory = parseAssembly(data);

        console.log('Parsed Assembly');
        console.log(toObject(memory));
        cb();
    });
}

function parseAssembly(assembly) {
    var parts = assembly.split(/\s+/g),
        result = [];

    console.log(toObject(parts));

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
    var matches = operations.filter(function(operation) {
        return operation.name === part;
    });
    if(matches.length === 1) {
        return matches[0].code;
    }

    //Translate Label References based on OpCode before it
    if(labels[part]) {
        console.log('found label ref ' + part + ' at ' + labels[part]);
        console.log(previousValue);
        console.log(index);
        var operation = operations[previousValue];

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

readAssemblyIntoMemory(process.argv[2], execute);
