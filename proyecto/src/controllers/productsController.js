const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const jsonModel = require ('../models/jsonModel');
//const productModel = jsonModel ('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		let todosLosProductos  = products
		return res.render ('products', {todosLosProductos});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let product = products.find (function (product) {
			return product.id == req.params.productId
		})
		return res.render ('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {
		//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//let producto = products.find (producto => {
			//return producto.id == req.params.productId
		//})

		return res.render ('create');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let producto = {
			id: "" + (products.length + 1),
			//Te pega todo lo que tiene el req.body de una
			...req.body,
			//name: req.body.name,
			//price: req.body.price,
			//discount: req.body.discount,
			//category:req.body.category,
			//description: req.body.description,
			//image: 'public/images/img-home-banner.jpg'
		}
		products = [...products,producto];
		products = JSON.stringify (products, null, ' ');
		fs.writeFileSync (productsFilePath,products)
		return res.redirect ('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		//Leo de nuevo el json
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//Tener lo que quiero editar de producto con un find
		let producto = products.find (producto => {
			return producto.id == req.params.productId 
		})  
		res.render ('product-edit-form', {producto})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		//Leer el json
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//map recorre el array y retorna un producto con if. Solo lo edito si conincide con el id
		let variableMapeada = products.map (producto => {
			if (producto.id != req.params.productId) {
			return producto;  
			} else {
				let productoEditado = {
					id: producto.id,
					//Te pega todo lo que tiene el re.body de una
					...req.body,
					//name: req.body.name,
					//price: req.body.price,
					//discount: req.body.discount,
					//category:req.body.category,
					//description: req.body.description,
					image: producto.image
				}
				
				return productoEditado;
			}
		})
		nuevoJSON = JSON.stringify (variableMapeada, null, ' ');
		fs.writeFileSync (productsFilePath,nuevoJSON);

		return res.redirect ('/products/detail/' + req.params.productId);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		products.forEach((element,index) => {
			if (element.id == req.params.productId) {
				products.splice (index,1)
			}
		});
		nuevoJSON = JSON.stringify (products, null, ' ');
		fs.writeFileSync (productsFilePath,nuevoJSON);
		return res.redirect ('/')
	}
	
};

module.exports = controller;