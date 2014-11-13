module.exports = {
    name: 'BRK',
    length: 1,
    execute: function(cpu) {
        console.log('\nCPU State:');
        console.log(cpu);

        var result = '';
        for(var i = 128; i < cpu.memory.length; i++) {
            result += String.fromCharCode(cpu.memory[i]);
        }
        console.log('\nResult:');
        console.log(result);

        process.exit(0);
    }
};