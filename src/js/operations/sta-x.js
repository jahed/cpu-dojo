module.exports = {
    name: 'STA_X',
    length: 1,
    execute: function(cpu) {
        cpu.memory[cpu.registers.x] = cpu.registers.a;
    }
};