const db = require('./src/config/database');
const Person = require('./src/models/Person');
const Permission = require('./src/models/Permission');

beforeAll(async () => {
    //await sequelize.sync();
	await Person.sequelize.sync();
	await Permission.sequelize.sync();
});

test('create person', async () => {
    expect.assertions(1);
    const person = await Person.create({ 
	    rut:      '16028177-4',
	    firstname:'Anon falso name',
	    email:    'correo@mail.com',
	    adress:   'Casa Anonima'
    });
    expect(person.id).toEqual(1);
});

test('get person', async () => {
    expect.assertions(4);
    const person = await Person.findByPk(1);
    expect(person.rut).toEqual('16028177-4');
    expect(person.firstname).toEqual('Anon falso name');
    expect(person.email).toEqual('correo@mail.com');
    expect(person.adress).toEqual('Casa Anonima');
});

test('delete person', async () => {
    expect.assertions(1);
    await Person.destroy({
        where: {
            id: 1
        }
    });
    const person = await Person.findByPk(1);
    expect(person).toBeNull();
});


test('create permission', async () => {
    expect.assertions(1);
    const permission = await Permission.create({ 
	    rut:      '16028177-4',
	    motivo:   'Comprar items', 
	    adress:   'Casa Anonima'
    });
    expect(permission.id).toEqual(1);
});

test('get permission', async () => {
    expect.assertions(4);
    const permission = await Permission.findByPk(1);
    expect(permission.rut).toEqual('16028177-4');
    expect(permission.motivo).toEqual('Comprar items');
    expect(permission.adress).toEqual('Casa Anonima');
    expect(permission.date_ext).toEqual(expect.anything());
});

test('delete permission', async () => {
    expect.assertions(1);
    await Permission.destroy({
        where: {
            id: 1
        }
    });
    const permission = await Permission.findByPk(1);
    expect(permission).toBeNull();
});

afterAll(async () => {
    //await sequelize.close();
    await Person.sequelize.close();
    await Permission.sequelize.close();
});