const Product = require('../models/Product');

function index(req,res){
    // busco todos los prodctos y si no da error me devuelve arreglos products
    Product.find({}).then(products =>{
        // si hay productos envio codigo de aceptacion y un cuerpo con los prdctos
        if(products.length) return res.status(200).send({products});
        //en caso de que no hayan datos se manda un codigo y un mensaje xD
        return res.status(204).send({message: 'NO CONTENT'});
    }).catch(error=> res.status(500).send({error}));
}

function create(req,res){
    //se inicializa una variable con los datos de mi body
    let producto = new Product(req.body);
    //guardo con el metodo save el nuevo producto
    producto.save().then(product => res.status(201).send({product})).catch(error => res.status(500).send({message: "Product alredy in db",error}));
}


function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'Not Found :"V'});
    let products = req.body.products;
    return res.status(200).send({products});
}

function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    //Se valida si no hay productos.
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    let product = req.body.products[0];
    //creo un nuevo objeto con las cosas que quiero cambiarle
    product = Object.assign(product,req.body);
    product.save().then(product => res.status(200).send({message: "UPDATED",product})).catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    req.body.products[0].remove().then(product => res.status(200).send({message: "REMOVED", product})).catch(error => res.status(500).send({error}));
}


// como buscar se repite en show, update y remove hago una funcion
// es como un middleware el cual es el que se ejecuta en medio de otros controladores
function find(req,res,next){
    //se hara lo siguiente para entrar por ejemplo (categoria: 'Hogar')
    let query = {};
    query[req.params.key]= req.params.value;
    Product.find(query).then(products => {
        //si no existen productos
        if(!products.length) return next();
        // en caso de que si haya , se crea un product en el body (no existia)
        req.body.products = products;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    });
    // pdta se pone en el body pa poderlo maniobrar en la siguiente funcion desps del find
}


module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}