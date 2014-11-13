module.exports = {
    name: 'BNE',
    code: 7,
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        if(!cpu.flags.equal) {
            cpu.programCounter += cpu.memory[cpu.programCounter];
        }
    }
};