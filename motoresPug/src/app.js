import express from 'express';
import cors from 'cors';
import upload from './services/upload.js';
import Contenedor from './classes/Contenedor.js';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en mi proyecto, products: ${PORT}`);
})
server.on('error', (error)=>console.log(`Error en el servidor ${error}`))

const contenedor = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log(`Peticion hecha a las ${time.toTimeString().split(" ")[0]}`);
    next();
})
//definir motor de plantilla
app.set('views', './views');
app.set('view engine','pug')

// GET
app.get('/productos', (req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.products;
        if(info === `Data esta vacio! Primero debes ingresar un pedido!`|| undefined){
            let dontObject=true
            res.render('productos',{
                dontObject:dontObject
            });
        }
        res.render('productos', {
            preparedObject:info
        });
    })
})

// POST 
app.post('/api/uploadfile',upload.array('images'),(req,res)=>{
    const files = req.files;
    if(!files || files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
})

app.post('/productos', upload.single('image'),(req,res)=>{
    let product = req.body;
    product.price = parseInt(product.price);
    let thumbnail = 'http://localhost:8080/'+req.file.filename;
    product.thumbnail = thumbnail;
    contenedor.save(product).then(result=>{
        res.send(result);
    })
})