const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

const users = [
    {id: 1 , email:'mateo.diaz@correo.com', password: bcryptjs.hashSync('mateo123456',10) },
    {id: 2 , email:'santiago.mejias@correo.com', password: bcryptjs.hashSync('santiago123456',10) },
    {id: 3 , email:'lucas.rojas@correo.com', password: bcryptjs.hashSync('lucas123456',10) },
    {id: 4 , email:'facundo.fernandez@correo.com', password: bcryptjs.hashSync('facundo123456',10) }
]

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email)
    if(!user) return res.status(401).send({message:'Invalid credentials'});

    if(!bcryptjs.compareSync(password, user.password)) {
        return res.status(401).send({message:'Invalid credentials'})
    }

    const token = jwt.sign (
        {sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    );
    res.json ({ token })
}

module.exports = { loginUser }