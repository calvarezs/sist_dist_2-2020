const express = require('express')
const Sequelize = require('sequelize')

const app = express()

const port = 3000

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }))


const sequelize = new Sequelize('postgres://project_distr:pass@example.com:5432/project_distr')


// Establecer conexion
sequelize.authenticate()

.then(() => {

console.log('Connection has been established successfully.');

})

.catch(err => {

console.error('Unable to connect to the database:', err);

});




// Definir modelo de base de datos
const User = sequelize.define('user', {

// attributes

firstName: {

type: Sequelize.STRING,

allowNull: false

},

lastName: {

type: Sequelize.STRING

// allowNull defaults to true

}

}, {

// options

});


//Forzar base de datos
// Note: using `force: true` will drop the table if it already exists

User.sync({ force: true }) // Now the `users` table in the database corresponds to the model definition



// Escribir usuario en base de datos
app.post('/user', async (req, res) => {

try {

const newUser = new User(req.body)

await newUser.save()

res.json({ user: newUser }) // Returns the new user that is created in the database

} catch(error) {

console.error(error)

}

})


// Obtener usuario de base de datos
app.get('/user/:userId', async (req, res) => {

const userId = req.params.userId

try {

const user = await User.findAll({

where: {

id: userId

}

}

)

res.json({ user })

} catch(error) {

console.error(error)

}

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

