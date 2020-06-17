const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Para segunda versión
//const jsonModel = require ('../models/jsonModel');
//const productModel = jsonModel('productsDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		
		//Primera versión
		let visited = products.filter (producto => producto.category == "visited");
		let inSale = products.filter (producto => producto.category == "in-sale");
		return res.render ('index', {visited,inSale});

		//Segunda versión no me anda
			//const visited = productModel.filterBySomething (product => {
			//return product.category == "visited";
		//})
		
		//const inSale = productModel.filterBySomething (product => {
			//return product.category == "in-sale";
		//})
	},
	search: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		//console.log(products);
		
		let busqueda = req.query.keywords;


		let productos = products.filter(product => {
			return product.name == busqueda;
		})
		//console.log(productos);
		
		//console.log(busqueda);
		
		return res.render ('results',{productos,busqueda});
	},
};

module.exports = controller;
