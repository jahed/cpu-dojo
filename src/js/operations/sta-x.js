module.exports = {
    name: 'STA_X',
    code: 8,
    length: 1,
    execute: function(cpu) {
        cpu.memory[cpu.registers.x] = cpu.registers.a;
    }
};