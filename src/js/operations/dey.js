module.exports =     {
    name: 'DEY',
    length: 1,
    execute: function(cpu) {
        cpu.registers.y--;
    }
};