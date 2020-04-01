const fs = require('fs');

let funcionesProductos = {

traerProductos: function (){
    if(!fs.existsSync('productos.json')){
        fs.writeFileSync('productos.json', '');
    }

    let productosJson = fs.readFileSync('productos.json', 'utf8');

    let arrayProductos = productosJson.length === 0 ? [] : JSON.parse(productosJson);

    return arrayProductos;
},

buscarProductoPorCodigo: function(codigo){
    let arrayProductos = this.traerProductos();

    let encontrado = arrayProductos.find(function(unProducto){
        return unProducto.codigo == codigo;
    });

    return encontrado;
},

guardarProducto: function (producto){
    let arrayProductos = this.traerProductos();
    
    arrayProductos.push(producto);

    productosJson = JSON.stringify(arrayProductos, null, ' ');

    fs.writeFileSync('productos.json', productosJson);
   
    },
   
guardarProductoEditado: function (productoAEditar){
    let arrayProductos = this.traerProductos();
    
    let nuevoArray = arrayProductos.filter(function(unProducto){
    return unProducto.codigo != productoAEditar.codigo;
    });
    
    nuevoArray.push(productoAEditar);
    
    let productosJson = JSON.stringify(nuevoArray, null, ' ');
    
    fs.writeFileSync('productos.json', productosJson);
    },

eliminarProducto: function(productoAEliminar){
    let arrayProductos = this.traerProductos();

    let nuevoArray = arrayProductos.filter(function(unProducto){
        return unProducto.codigo != productoAEliminar.codigo;
    });
    
    //return nuevoArray;

    let productosJson = JSON.stringify(nuevoArray, null, ' ');

    fs.writeFileSync('productos.json', productosJson);
}

}

module.exports = funcionesProductos;