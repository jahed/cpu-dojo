module.exports = {
    name: 'LDX',
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.x = cpu.memory[cpu.programCounter];
    }
};