var cpu = require('./cpu'),
    assembler = require('./assembler');

cpu.init();
assembler.init(cpu);

assembler.compile(process.argv[2], cpu.execute);