module.exports = {
    name: 'LDY',
    code: 10,
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.y = cpu.memory[cpu.programCounter];
    }
};