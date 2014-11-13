module.exports = {
    name: 'CMY',
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.flags.equal = cpu.registers.y === cpu.memory[cpu.programCounter];
    }
};