module.exports = {
    name: 'INX',
    code: 5,
    length: 1,
    execute: function(cpu) {
        cpu.registers.x++;
    }
};