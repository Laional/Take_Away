// Función para mostrar los platos en nuestra pagina principal
function pintaPlatos(categoriaPlato,fotoPlato,nombrePlato,precioPlato,descripPlato,id_plato) {
	var card =`
	<div class="col s12 m6 l4">
		<div class="card">
			<div class="card-image waves-effect waves-block waves-light">
				<!-- Carrito de compras ---------------------- -->
				<div class="fixed-action-btn horizontal posicion">
					<a class="btn-floating red">
					    <i class="material-icons">shopping_basket</i>
					</a>
					<ul>
					    <li><a onClick="addCart(${id_plato},1,${precioPlato},'${nombrePlato}');" class="btn-floating red center"><!--<i class="material-icons tm_icon">filter_1</i>-->x1</a></li>
					    <li><a onClick="addCart(${id_plato},2,${precioPlato},'${nombrePlato}');" class="btn-floating yellow darken-1 center"><!--<i class="material-icons">filter_2</i>-->x2</a></li>
					    <li><a onClick="addCart(${id_plato},3,${precioPlato},'${nombrePlato}');" class="btn-floating green center"><!--<i class="material-icons">filter_3</i>-->x3</a></li>
					    <li><a onClick="addCart(${id_plato},4,${precioPlato},'${nombrePlato}');" class="btn-floating blue center"><!--<i class="material-icons">filter_4</i>-->x4</a></li>
					</ul>
				</div>
				<!-- ------------------------------------------------------------------------------ -->
				<img class="activator" src="img/platos/${fotoPlato}">
 			</div>
			<div class="card-content">
					<span class="card-title activator grey-text text-darken-4">${nombrePlato}<i class="material-icons right">more_vert</i></span>
					<p>${precioPlato} €</p>
			</div>
				<div class="card-reveal">
					   <span class="card-title grey-text text-darken-4">${nombrePlato}<i class="material-icons right">close</i></span>
					   <p>${descripPlato}</p>
					   <p><a href="#" class="#00c853 green accent-4">Más info</a></p>
				</div>
			</div>
		</div>
		`;
		var cat = `#${categoriaPlato}`;
		$(cat).append(card);
}

// Función para mostrar el contenido de nuestro pedido en una ventana MODAL
function mostrarPedido() {
	var hayCarrito = localStorage.getItem('JsonCart');
	hayCarrito = JSON.parse(hayCarrito);
	var nombre_plato;
	var cantidad = 0;
	var precio_unidad = 0;
	var precio_total = 0;
	var id_plato1;
	var listado = "";
	var modalCard = "";
	$('#modal1').text(modalCard);
	for (i in hayCarrito) {
		nombre_plato = hayCarrito[i].nombrePlato;
		cantidad = hayCarrito[i].cantidad;
		precio_unidad = hayCarrito[i].precio;
		id_plato1 = hayCarrito[i].id_plato;
		precio_total = cantidad * precio_unidad;
		listado +=	'<tr><th><a href="#"><i class="material-icons center" onClick="borrarPlato();">delete</i></a></th>'
				+	'<td>'+nombre_plato+'</td>'
				+	'<td>'+cantidad+'</td>'
				+	'<td>'+precio_unidad+'</td>'
				+	'<td>'+precio_total+'</td></tr>';
	}
	modalCard = `
		<div class="modal-content">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Nombre Plato</th>
						<th>Cantidad</th>
						<th>Precio Unidad</th>
						<th>Precio Total</th>
					</tr>
				</thead>

				<tbody>
					${listado}
				</tbody>
			</table>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-action modal-close waves-effect waves-green btn" onClick="cerrarModal();"><i class="material-icons right">close</i>Cerrar</a>
			<a href="#!" class="modal-action waves-effect waves-green btn" onClick="borrarPedido();"><i class="material-icons right">delete_forever</i>Borrar Pedido</a>
			<a href="#!" class="modal-action waves-effect waves-green btn" onClick=""><i class="material-icons right"">delete_forever</i>Realizar Compra</a>
		</div>
	`;
	$('#modal1').append(modalCard);
	$('#modal1').modal('open');
}

// Funcion para mostrar las categorias dentro de un SELECT de MATERIALIZECSS
function mostrarCategorias(){
	$.ajax ({
			// Archivo que te trata los datos
			url: '../php/getSeleccionarCategoria.php',
			// Forma de enviar los datos
			type: 'GET',
			// Tipo de datos que se envian
			dataType: 'json',
			// Imprecindible para saber si hay errores i/o buen funcionamiento
			// Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
			success: function(result){
					var etiquetas = '';
					var values = '';
					var options = '';
					// console.log(result.error);
					// console.log(result.query);
					// console.log(result.resultado);
					$.each(result.query, function() {
							$.each(this, function(campo, valor) {
									if (campo == 'id') {
                                        values = valor;
                                    } else {
                                        etiquetas = valor;
                                    }
							});
							options += '<option value="'
									+values
									+'">'
									+etiquetas
									+'</option>';
					});
					$('#categoria').html(options);
					$('select').material_select();
			},
			error: function(result){
					alert('ERROR!!!!!!!');
			}
	})
}

// Funcion para mostrar todos los platos.
function mostrarTodosPlatos(){
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
            //console.log(result.query);
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
}

// Funcion para capturar los archivos.
function capturarArchivo(){
    // Se prepara evento para capturar el archivo
    $('input[type=file]').on('change', function(event) { // al cambiar el nombre del archivo en el campo
        files = event.target.files; // Recoge el objeto archivo en variable files
        console.log(files);
    });
}
