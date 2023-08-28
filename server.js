const { agregarPost, getPosts, like, eliminarPost } = require('./consultas')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())

app.listen(3000, console.log('SERVIDOR ENCENDIDO EN PUERTO 3000'))

app.use(cors());

app.get("/posts", async (req, res) => {
    const posts = await getPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        await agregarPost(titulo, url, descripcion)
        res.send("Post agregado con éxito")
    } catch (error) {
        const { code } = error
        if (code == "23502") {
            res.status(400)
                .send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params
    try {
        await like(id)
        res.send("LIKE modificado con éxito")
    } catch ({ code, message }) {
        console.log("Señor desarrollador, error en app.put -> modificando like." + message + code)
        res.status(code).send(message)
    }
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    await eliminarPost(id)
    res.send("Post borrado con éxito")
})