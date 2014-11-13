module.exports = {
    name: 'RTS',
    code: 12,
    length: 1,
    execute: function(cpu) {
        cpu.stackPointer++;
        cpu.programCounter = cpu.memory[cpu.stackPointer] + 1;
    }
};