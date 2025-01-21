const { users, bootcamps } = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = async (bootcamp) => {
  try {
    const newBoocamp = await Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description,
    })
    console.log(`>> Creado el bootcamp: ${JSON.stringify(newBoocamp, null, 4)}`);
    return newBoocamp;
  } catch (err) {
    console.log(`>> Error al crear el bootcamp: ${err}`)
    throw err;
  }
}
// Agregar un Usuario al Bootcamp
exports.addUser = async (bootcampId, userId) => {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      console.log('No se encontró el bootcamp')
      return null;
    }

    const user = await User.findByPk(userId)
    if (!user) {
      console.log('Usuario no encontrado!')
      return null;
    }

    await bootcamp.addUser(user);
    console.log(`Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
    return bootcamp;
  } catch (err) {
    console.log('>> Error mientras se agregaba Usuario al Bootcamp:', err)
    throw err;
  }
}


// obtener los bootcamp por id 
exports.findById = async (id) => {
  try {
    const bootcamp = await Bootcamp.findByPk(id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: { attributes: [] },
      }],
    });
    return bootcamp;
  } catch (err) {
    console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
    throw err;
  }
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = async () => {
  try {
    const bootcampList = await Bootcamp.findAll({
      include:[{
        model: User,
        as: "users", 
        attributes: ["id", "firtsName", "lastnName"],
        through: { attributes: [] },
      }],
    });
    return bootcampList;
  } catch(err) {
    console.log(">> Error buscando los Bootcamps: ", err);
    throw err;
  }
}

exports.getBootcampById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'firstName', 'lastName'],
        through: { attributes: [] },
      },
    });
    if (!bootcamp) {
      return res.status(404).send({ message: 'Bootcamp no encontrado' })
    }
    res.json(bootcamp);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtner el bootcamp', error: err })
  }
}

exports.getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findAll();

    res.json(bootcamp);
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener los bootcamps', error: err })
  }
}