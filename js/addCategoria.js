$(document).ready(function () {
	// Para poder activar y desactivar las consolas de ayuda
	var debug = true;

	$('#addCategorias').submit(function (event) {
		// evita el refresh automatico que se produce al enviar el formulario
		event.preventDefault();
		// Imprimir los datos en JSON
		var jsonData = JSON.stringify($('#addCategorias').serializeArray());
		if (debug) console.log('Datos en Json ==>');
		if (debug) console.log(jsonData);

		$.ajax({
			url: '../php/addCategoria.php',
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
					Materialize.toast('Categoría añadida correctamente!', 4000); // 4000 is the duration of the toast
					//$('#adddCat')[0].reset(); // para reiniciar el formulario
					$('addCategorias').trigger("reset"); // para reiniciar el formulario
				} else {
					Materialize.toast('Error al crear la categoría!', 5000); // 4000 is the duration of the toast
				}
			},
			error: function (result) {
				alert('ERROR!!!!!!!');
			}
		});


	});
});
