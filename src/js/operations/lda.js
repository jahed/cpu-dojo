module.exports = {
    name: 'LDA',
    code: 1,
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.a = cpu.memory[cpu.programCounter];
    }
};