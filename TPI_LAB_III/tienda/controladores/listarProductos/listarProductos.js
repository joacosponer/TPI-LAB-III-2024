import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
    return`
    <div class="categoria" data-idCategoria="${id}">
    <h1 class="categoria">${categoria}</h1>
    <div class="productos">
        
        <!-- Aca se listan los productos-->
        <p class="item-producto">Sin productos.</p>
       
    </div>                
</div>

    `
    /*ESTA FUNCION RECIBE DOS PARAMETROS ID Y CATEGORIA*/
    /*EN ESTA SE GENERA UNA CADENA DE CARACTERES CON EL CODIGO HTML CORRESPONDIENTE A LA CATEGORIA (ESTA EN ASSETS/MODULOS/listarProducto.html)*/
    /*SE DEBERÁ CONCATENAR PARA INCORPORAR EL id DE LA CATEGORIA AL ATRIBUTO data-idCategoria  */
    /*Y ADEMAS REEMPLAZAR EL TEXTO Nombre de Categoría POR EL VALOR QUE LLEGA AL PARAMETRO CATEGORIA DE LA FUNCION*/
    /*POR ULTIMO, LA FUNCION DEVOLVERA LA CADENA RESULTANTE*/   
    

}

function htmlItemProducto(id, imagen, nombre, precio){ 
    return `
    <div class="item-producto">

        <img src="${imagen}" >
        <p class="producto_nombre" name="motorola">${nombre}</p>
        <p class="producto_precio">${precio}</p>

        <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace" >Ver producto</a>

    </div>
    `
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, imagen, nombre y precio del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE itemProducto ( ASSETS/MODULOS/itemProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */
    


}

async function asignarProducto(id) {
    /**
     * Consulta los productos de una categoría específica y los asigna al DOM.
     */
    const prods = await productosServices.listarPorCategoria(id);
    console.log(`Productos para la categoría ${id}:`, prods); //pruebaaaa
    let productosHTML = '';
    prods.forEach(producto => {
        productosHTML += htmlItemProducto(producto.id, producto.foto, producto.nombre, producto.precio);
    });
    const contenedorCategoria = document.querySelector(`[data-idCategoria="${id}"] .productos`);
    contenedorCategoria.innerHTML = productosHTML;
}

export async function listarProductos() {
    /**
     * Consulta las categorías y sus productos, y los inserta en el DOM.
     */
    const seccProds = document.querySelector('.seccionProductos');
    const categorias = await categoriasServices.listar();
    console.log('Categorías obtenidas:', categorias);
    let categoriasHTML = '';
    for (const categoria of categorias) {
        categoriasHTML += htmlCategoria(categoria.id, categoria.descripcion);
    }
    seccProds.innerHTML = categoriasHTML;
    for (const categoria of categorias) { 
        await asignarProducto(categoria.id);
    }
}