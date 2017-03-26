$(document).ready(function () {
	//declarar la variable para depurar y no visualizar console.log
	var debug = true;
	$.ajax({
		// Archivo que te trata los datos
		url: '../php/getSeleccionarCategoria.php',
		// Forma de enviar los datos
		type: 'GET',
		// Tipo de datos que se envian
		dataType: 'json',
		// La variable donde estan los datos a tratar. (datos enviados)
		//data: jsonData,
		// Imprecindible para saber si hay errores i/o buen funcionamiento
		// Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
		success: function (result) {
			var etiquetas = "";
			var values = "";
			var options = "";
			if (debug) {
				console.log(result.error);
				console.log(result.query);
				console.log(result.resultado);
			}
			$.each(result.query, function () {
				if (debug) console.log("Pintando");
				$.each(this, function (campo, valor) {
					if (campo == 'ID_categoria') values = valor;
					else etiquetas = valor;

				});
				options += "<option value='" +
					values +
					"'>" +
					etiquetas +
					"</option>";
			});
			if (debug) console.log(options);
			options = "<option value='' disabled selected>Selecciona la Categoria</option>" + options;
			$("#categoria_plato").html(options);
			$('select').material_select();
		},
		error: function (result) {
			alert("ERROR!!!!!!!");
			//console.error(result);
		}
	});

	// ajax para enviar el formulario
	$('#addPlato').submit(function (event) {
		// evita el refresh automatico que se produce al enviar el formulario
		event.preventDefault();
		// Imprimir los datos en JSON
		var jsonData = JSON.stringify($("#addPlato").serializeArray());
		if (debug) console.log("Datos en Json ==>");
		if (debug) console.log(jsonData);

		$.ajax({
			url: '../php/addPlato.php',
			type: 'POST',
			dataType: 'json',
			data: jsonData,
			// Imprecindible para saber si hay errores i/o buen funcionamiento
			success: function (result) {
				if (debug) {
					//console.log(result.campos);
					console.log(result.error);
					console.log(result.sql);
				}
				if (result.error === 0) {
					Materialize.toast('Plato añadido correctamente!', 4000); // 4000 is the duration of the toast
					$('#addPlato')[0].reset(); // para reiniciar el formulario
					//$('addPlato').trigger("reset"); // para reiniciar el formulario
				} else {
					Materialize.toast('Error al crear el Plato!', 5000); // 4000 is the duration of the toast
				}
			},
			error: function (result) {
				alert("ERROR!!!!!!!");
			}
		});


	});
});
