module.exports = {
    name: 'RTS',
    length: 1,
    execute: function(cpu) {
        cpu.stackPointer++;
        cpu.programCounter = cpu.memory[cpu.stackPointer] + 1;
    }
};