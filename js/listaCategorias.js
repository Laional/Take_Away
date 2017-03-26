$(document).ready(function () {
	//declarar la variable para depurar y no visualizar console.log
	var debug = false;
	$.ajax({
		// Archivo que te trata los datos
		url: '../php/getListaCategorias.php',
		// Forma de enviar los datos
		type: 'GET',
		// Tipo de datos que se envian
		dataType: 'json',
		// La variable donde estan los datos a tratar. (datos enviados)
		//data: jsonData,
		// Imprecindible para saber si hay errores i/o buen funcionamiento
		// Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
		success: function (result) {
			if (debug) {
				console.log(result.error);
				console.log(result.query);
				console.log(result.resultado);
			}
			var tbl_body = "";
			if (debug) console.log("Pintando");
			$.each(result.query, function () {
				var tbl_row = "";
				$.each(this, function (campo, valor) {
					if (campo == "Foto_categoria") {
						tbl_row += "<td>" +
							"<img class='z-depth-4' src='../img/categorias/" +
							valor +
							"'width='90px'" +
							"</td>";
						if (debug) console.log(tbl_row);
					} else {
						tbl_row += "<td>" + valor + "</td>";
					}
				})
				tbl_body += "<tr>" + tbl_row + "</tr>";

				if (debug) console.log(tbl_body);
			})
			$("#listaCategorias tbody").html(tbl_body);
		},
		error: function (result) {
			alert("ERROR!!!!!!!");
			//console.error(result);
		}
	});
});
