$(document).ready(function () {
	// Inicializamos la funcion para conseguir categorias de la base de datos.
	mostrarCategorias();
	// Inicializamos la funcion MODAL en para documento correspondiente.
	$('.modal').modal();
    // Inicializamos la funcion para que nos muestre todos los platos por pantalla dentro de una tabla.
    mostrarTodosPlatos();
	// Inicializamo la funcion para capturar el archivo.
    capturarArchivo();

    /*-----------------------------------------------------------------------------------*/
    function verImg(evt) {
        files = evt.target.files; // FileList object

        //Obtenemos la imagen del campo "file".
        for (var i = 0, f; f = files[i]; i++) {
            //Solo admitimos imágenes.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    // Creamos la imagen.
                    document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);

            reader.readAsDataURL(f);
        }
    }

    document.getElementById('fotoPlat').addEventListener('change', verImg, false);
    /*-----------------------------------------------------------------------------------*/

});
