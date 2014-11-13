module.exports = {
    name: 'LDY',
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.y = cpu.memory[cpu.programCounter];
    }
};