const express = require('express') 

const ProductManager = require('./ProductManager.js')
const productM = new ProductManager()

const main = async () => {
productM.initialize()
productM.generarArchivoSiNoExiste('Usuarios.json')
}

main()

const app = express() 



app.get('/', (req, res) => {
    res.send('Hola desde Express!');
  });


app.get('/products', async (req, res) => {

    const limit = +req.query.limit

    if(limit){
        res.send(await productM.getProductsWithLimit(limit));
    }else{
        res.send(await productM.getProducts());
    }

});

app.get('/products/:pid', async(req, res) => {
    const userId = +req.params.pid
    
    res.json(await productM.getProductById(userId
        ))
})


app.listen(8080, () => {
    console.log('Servidor listo!')
})