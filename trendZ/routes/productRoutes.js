const express = require("express");
const multer = require("multer");
const Producto = require("../modules/Product"); // Importar el modelo
const router = express.Router();

// Configurar almacenamiento de imágenes con Multer
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para publicar un producto
router.post("/publicar", upload.single("image"), async (req, res) => {
    try {
        const nuevoProducto = new Producto({
            name: req.body.name,
            description: req.body.description,
            imageUrl: "/uploads/" + req.file.filename
        });

        await nuevoProducto.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Ruta para obtener productos
router.get("/productos", async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Exportar el router
module.exports = router;
