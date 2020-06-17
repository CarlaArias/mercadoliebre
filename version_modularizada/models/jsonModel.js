const fs = require('fs');
const path = require('path');

module.exports = (archivo) => {
    const funciones =  {
        path: path.join (__dirname, '..', 'data', archivo + 'json'),
        leerJson: function () {
            const dataJson = fs.readFileSync (this.path,'utf-8');
            const data = JSON.parse(dataJson)
            return data;
        },
        //solamente escribe         
        escribirJson: function (data) {
            data =  JSON.stringify (data, null, ' ')
            fs.writeFileSync (data, this.path)
            return true;
        },

        guardarUno: function (data) {
            //Leer todo el json
            let allData = this.leerJson();
            //Agregar la data. Toda la data vieja + la nueva data. Se puede hacer con push
            allData = [...allData, newData]; 
            //Guardar la data
            this.escribirJson (allData);
            return true;
        },
        findById: function (id) {
            const data = this.leerJson ();
            const obj = data.find (function (elemento){
                return elemento.id == id;
            })
            return obj;
        },
        //something = callback
        filterBySomething: function (something) {
            const data = this.leerJson ();
            const dataFiltrada = data.filter (something);
            return dataFiltrada;
        },
        findBySomething: function (something) {
            const data = this.leerJson ();
            const dataEncontrada = data.find (someting);
            return dataEncontrada;
        }

    }
    return funciones;
}