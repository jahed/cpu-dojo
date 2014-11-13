module.exports = {
    name: 'CMY',
    code: 6,
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.flags.equal = cpu.registers.y === cpu.memory[cpu.programCounter];
    }
};