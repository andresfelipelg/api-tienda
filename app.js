const express = require( 'express');
const cors = require('cors');
const conexion = require('./db/db'); 
const port = 3000;
const app = express();



app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Ruta Inicio')
});

//mostrar todos los articulos
app.get('/api/articulos', (req,res) => {
    conexion.query('SELECT * FROM articulos',(error,filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

//mostar solo un artculo
app.get('/api/articulos/:id', (req,res) => {
    conexion.query('SELECT * FROM articulos WHERE id = ?',[req.params.id],(error,fila) => {
        if(error){
            throw error;
        }else{
           res.send(fila)
           // res.send(fila[0].descripcion)
        }
    })
});

app.post('/api/articulos',(req,res)=> {
     let data = {
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        stock:req.body.stock
    };

    let sql = "INSERT INTO articulos SET ?";

    conexion.query(sql,data,function(error,results) {
        if(error){
            throw error;
        }else{
           res.send(results);
            
        }
    });

});

//editar articulo
app.put('/api/articulos/:id',(req,res)=> {

    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio =  req.body.precio;
    let stock = req.body.stock;

    let sql = 'UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
    conexion.query(sql,[descripcion,precio,stock,id],function(error, results){
        if(error){
            throw error;
        }else{
           res.send(results);
            
        }
    });
});

app.delete('/api/articulos/:id', (req,res) => {
    conexion.query('DELETE FROM articulos WHERE id = ?',[req.params.id],(error,results)=>{
        if(error){
            throw error;
        }else{
           res.send(results);
            
        }
    });
});





app.listen(port, () => {
    console.log('El server esta arriba '  );
})