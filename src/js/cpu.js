var util = require('./util');

var cpu = {};

cpu.init = function init() {
    cpu.registers = {
        a: 0,
        x: 0,
        y: 0
    };

    cpu.flags = {
        equal: false
    };

    cpu.operations = [
        require('./operations/brk'),
        require('./operations/lda'),
        require('./operations/adc'),
        require('./operations/sta'),
        require('./operations/ldx'),
        require('./operations/inx'),
        require('./operations/cmy'),
        require('./operations/bne'),
        require('./operations/sta-x'),
        require('./operations/dey'),
        require('./operations/ldy'),
        require('./operations/jsr'),
        require('./operations/rts')
    ];

    cpu.memory = [];
    cpu.programCounter = 0;
    cpu.stackPointer = 0;
};

cpu.execute = function execute(input) {
    if(input.length > 256) {
        console.log('Memory has a limit of 256 items. Current has ' + input.length);
    }

    cpu.memory = input;
    try {
        while(cpu.programCounter < cpu.memory.length) {
            console.log(cpu);
            var opCode = cpu.memory[cpu.programCounter];
            console.log('OpCode: ' + opCode);
            console.log('Running Operation: ' + cpu.operations[opCode].name + ' (' + opCode + ')');
            console.log('Next Value: ' + cpu.memory[cpu.programCounter+1]);
            cpu.operations[opCode].execute(cpu);
            cpu.programCounter++;
        }
    } catch(e) {
        console.log('\n\nFailed! Start Debug Data ---');
        console.log('CPU State:');
        console.log(cpu);
        console.log('\nFailed!');
        console.log(e);
        console.log(e.stack);
    }
};

module.exports = cpu;