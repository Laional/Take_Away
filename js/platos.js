$(document).ready(function() {
	//declarar la variable para depurar y no visualizar console.log
	$('.modal').modal();
	var debug = true;
	$.ajax ({
				// Archivo que te trata los datos
	            url: 'php/getListaPlato.php',
	            // Forma de enviar los datos
	            type: 'GET',
	            // Tipo de datos que se envian
	            dataType: 'json',
	            // La variable donde estan los datos a tratar. (datos enviados)
	            //data: jsonData,
	            // Imprecindible para saber si hay errores i/o buen funcionamiento
	            // Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
	            success: function(result){
	                    $.each(result.query, function(campo, valor){
	                    	var nombrePlato = "";
	                    	var precioPlato = 0;
	                    	var descripPlato = "";
	                    	var categoriaPlato = "";
	                    	var fotoPlato = "";
	                    	var disponiblePlato = "";
	                    	var card = "";
	                    	var id_plato = "";

	                    	// otra manera de asignar las variables
	                    	nombrePlato = valor.Nombre_plato;
	                    	precioPlato = valor.Precio_plato;
	                    	descripPlato = valor.Descripcion_plato;
	                    	categoriaPlato = valor.Nombre_categoria;
	                    	fotoPlato = valor.Foto_plato;
	                    	disponiblePlato = valor.Disponible_plato;
	                    	id_plato = valor.ID_plato;

	                    	$.each(this, function(campo , valor) {

		                    	switch(campo) {
		                    		case "Nombre_plato":
		                    			nombrePlato = valor;
		                    			break;
		                    		case "Precio_plato":
				                    	precioPlato = valor;
		                    			break;
									case "Foto_plato":
									    fotoPlato = valor;
									    break;
									case "Disponible_plato":
									   	descripPlato = valor;
									   	break;
									case "Nombre_categoria":
									   	categoriaPlato = valor;
									   	break;
									case "Disponible_plato":
									   	disponiblePlato = valor;
								}
        					})

	                    	if (disponiblePlato == "on"){
	                    		//console.log("Nombre Plato: "+nombrePlato);
	                    		switch (categoriaPlato){
	                    			case "Entrantes":
		                    			pintaPlatos("ensaladas_p",fotoPlato,nombrePlato,precioPlato,descripPlato,id_plato);
	                    				break;
	                    			case "Principales":
	                    				pintaPlatos("primeros_p",fotoPlato,nombrePlato,precioPlato,descripPlato,id_plato);
	                    				break;
	                    			case "Postres":
	                    				pintaPlatos("postres_p",fotoPlato,nombrePlato,precioPlato,descripPlato,id_plato);
	                    				break;
	                    		}
	                    	}

	                    })
	            },
	            error: function(result){
	                alert("ERROR!!!!!!!");
	                //console.error(result);
	            }
	        });
});
