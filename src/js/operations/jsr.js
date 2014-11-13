module.exports = {
    name: 'JSR',
    code: 11,
    length: 2,
    execute: function(cpu) {
        cpu.memory[cpu.stackPointer] = cpu.programCounter;
        cpu.stackPointer--;

        cpu.programCounter++;
        cpu.programCounter = cpu.memory[cpu.programCounter] - 1;
    }
};