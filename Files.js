const {promises : fs }= require('fs')

let x=0;
class Contenedor{
    constructor(ruta){
        this.ruta=ruta
    }


     async save(nuevo_objeto){
        const objetos = await this.getAll()
        let newId;
        
        //Lógica para obtener un nuevo ID
        if(objetos.length==0){
            newId=1;
        }else{
          newId =  objetos[objetos.length -1].id+1
          
        }
        console.log("     ")
        console.log(`Escribiendo datos de producto con ID: ${newId}`);
        console.log("...")
        //agregar elemento nuevo al objeto
        const newObj={...nuevo_objeto, id:newId}
        objetos.push(newObj)
        try{
            await fs.writeFile(this.ruta, JSON.stringify(objetos,null,2))
            return newId;
        }  catch (error){
            throw new Error(`Error al guardar ${error}`)  
        } 

        console.log(`Escritura de datos completa :)`);
    }

  
  
  
    async getById(){
      let id=x;
      
                function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min);
              }
      
      
        do{
          x=getRandomIntInclusive(1,5)
        }
      while(id==x)
        
         id= x
        
        console.log("  ")
        console.log(`Obteniendo producto con ID: ${id}`);
        console.log("...")
        let producto;
        const objeto= await this.getAll();
        producto= objeto.find(p => p.id == id);
        return producto;



    }



    async getAll(){
  
        try{
            const objetos = await fs.readFile(this.ruta,'utf-8');
           if (objetos==false){
            console.log("     ")
            console.log("No hay datos en el archivo :(")
            console.log("     ")
            return[];
           }else{
            
             const trans= JSON.parse(objetos)
             //console.log(Object.values({trans}))
             console.log(`Wake up ${trans}`)
             return trans
             
           }
        }catch(error){
            throw new Error(`Error al cargar el archivo: ${error}`);
            return[];
        }       
    }
  
  
    async deleteById(id){
        console.log("    ");
        console.log(`Eliminando dato con ID: ${id}`);
        console.log("...")
        let ar = []
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( contenido => {
            let col = JSON.parse(contenido)
            for (const objeto of col) {
                if(objeto.id != id) {
                    ar.push(objeto)
                }
            }
        })
        .catch( err => console.log(err));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(ar));
        console.log('Objeto eliminado')
        console.log("        ")
       
    }
    
    async deleteAll(){
        console.log("    ");
        console.log("Eliminando todos los datos almacenados");
        console.log("...")
        await fs.writeFile(`./${this.ruta}`, '')
        console.log(`Eliminación completa`)
    }

}


module.exports=Contenedor
