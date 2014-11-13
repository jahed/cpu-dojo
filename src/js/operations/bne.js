module.exports = {
    name: 'BNE',
    length: 2,
    execute: function(cpu) {
        cpu.programCounter++;
        if(!cpu.flags.equal) {
            cpu.programCounter += cpu.memory[cpu.programCounter];
        }
    }
};