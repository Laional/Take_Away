$(document).ready(function () {
	// Inicializamos la funcion para conseguir categorias de la base de datos.
	mostrarCategorias();
	// Inicializamos la funcion MODAL en para documento correspondiente.
	$('.modal').modal();
	//declarar la variable para depurar y no visualizar console.log
	var debug = false;
	// Se prepara evento para capturar el archivo
    $('input[type=file]').on('change', function(event) { // al cambiar el nombre del archivo en el campo
        files = event.target.files; // Recoge el objeto archivo en variable files
        console.log(files);
    });

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

    $.ajax ({
        // Archivo que te trata los datos
        url: '../php/getListaPlato.php',
        // Forma de enviar los datos
        type: 'GET',
        // Tipo de datos que se envian
        dataType: 'json',
        // La variable donde estan los datos a tratar. (datos enviados)
        //data: jsonData,
        // Imprecindible para saber si hay errores i/o buen funcionamiento
        // Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
        success: function(result){
            //console.log(result.error);
            // console.log(result.query);
            //console.log(result.resultado);
            var tbl_body = '';
            var icono_on_off = '';


            $.each(result.query, function(CampoNombre, CampoValor){

                var id_plato = CampoValor.ID_plato;
                var nombrePlato = CampoValor.Nombre_plato;
                var precioPlato = CampoValor.Precio_plato;
                var descripPlato = CampoValor.Descripcion_plato;
                var fotoPlato = CampoValor.Foto_plato;
                var categoriaPlato = CampoValor.Nombre_categoria;
                var disponiblePlato = CampoValor.Disponible_plato;
                if (disponiblePlato == 'on') {
                    icono_on_off = '<i class="medium center material-icons green-text">visibility</i>';
                } else {
                    icono_on_off = '<i class="medium center material-icons red-text">visibility_off</i>';
                }

                tbl_body += "<tr>";
                tbl_body += "<td class='center'>"+nombrePlato+"</td>";
                tbl_body += "<td class='center'>"+precioPlato+"</td>";
                tbl_body += "<td class='center'> <img class='z-depth-4' src='../img/platos/"+fotoPlato+"' width='90px'> </td>";
                tbl_body += "<td class='center'>"+icono_on_off+"</td>";
                tbl_body += "<td class='center'>"+categoriaPlato+"</td>";
                tbl_body += "<td class='center'><a href='' onClick='verPlato("+JSON.stringify(CampoValor)+");'><i class='small material-icons blue-text'>zoom_in</i></a>";
                tbl_body += "<td class='center'><a href='' onClick='modificarPlato("+JSON.stringify(CampoValor)+");'><i class='small material-icons blue-text'>tunes</i></a></td>";
                tbl_body += "<td class='center'><a href='' onClick='borrarPlato("+id_plato+",\""+nombrePlato+"\");'><i class='small material-icons red-text'>delete_forever</i></a></td>";
                tbl_body += "</tr>";
            })
            $("#listaPlatos tbody").html(tbl_body);
        },
        error: function(result){
            alert("ERROR!!!!!!!");
            //console.error(result);
        }
    });
});
