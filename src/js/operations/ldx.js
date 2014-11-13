module.exports = {
    name: 'LDX',
    code: 4,
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.x = cpu.memory[cpu.programCounter];
    }
};