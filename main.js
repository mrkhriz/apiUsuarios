//importar librería
const express = require("express");

//traer métodos y clases de express
const app = express();
const port = 3000;

//importa la clase userRoute
const userRoute = require("./routes/userRoute");

app.use(express.json);

//Ruta para acceder a la información
app.use('/user', userRoute);

app.listen(port, () => console.log("El servidor se ejecuta http://localhost:" + port));
