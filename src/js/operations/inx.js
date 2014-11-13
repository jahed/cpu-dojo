module.exports = {
    name: 'INX',
    length: 1,
    execute: function(cpu) {
        cpu.registers.x++;
    }
};