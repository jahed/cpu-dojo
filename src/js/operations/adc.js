module.exports = {
    name: 'ADC',
    code: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        cpu.registers.a = cpu.registers.a + cpu.memory[programCounter];
    },
    length: 2
};