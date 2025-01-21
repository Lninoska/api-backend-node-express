const protectedData = (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.email}! tienes acceso`})
};

module.exports = { protectedData }