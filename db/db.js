const mysql = require('mysql');

//estabelce los parametros
const conexion = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'articulosdb'
});

conexion.connect((error) => {
    if(error){
        throw error
    }else{
        console.log('Conexion exitosa');
    }
})

module.exports = conexion 
