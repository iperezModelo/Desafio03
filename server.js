
const Contenedor = require('./Files')

const express = require('express')
const app = express();



const PORT=process.env.PORT|| 8080
const serv =app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en Puerto ${PORT}`)
})



app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue";>  Desafio. 03!! </h1>');
})



app.get('/productos', async (req,res)=>{
  let productos;
 const cont = new Contenedor('./productos.txt');
  productos= await cont.getAll();
  res.json(productos)  
})
  
  
  
app.get('/productosRandom',async(req,res)=>{
     let productos;
     const cont = new Contenedor('./productos.txt');
    productos= await cont.getById();
    res.json(productos)
})

