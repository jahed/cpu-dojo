module.exports =     {
    name: 'DEY',
    code: 9,
    length: 1,
    execute: function(cpu) {
        cpu.registers.y--;
    }
};