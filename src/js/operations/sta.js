module.exports = {
    name: 'STA',
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.memory[cpu.memory[cpu.programCounter]] = cpu.registers.a;
    },
    length: 2
};