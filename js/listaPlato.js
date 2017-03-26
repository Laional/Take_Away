$(document).ready(function () {
	//declarar la variable para depurar y no visualizar console.log
	var debug = false;
	$.ajax({
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
		success: function (result) {
			if (debug) {
				console.log(result.error);
				console.log(result.query);
				console.log(result.resultado);
			}
				var tbl_body = "";
				var estado = "Disponible";
				var estado2 = "No disponible";
				if (debug) console.log("Pintando");
				$.each(result.query, function () {
					var tbl_row = "";
					$.each(this, function (campo, valor) {
						switch (campo) {
							case "Precio_plato":
									tbl_row += "<td>" +
										valor +
										"€" +
										"</td>";
								break;
							case "Foto_plato":
								tbl_row += "<td>" +
									"<img class='z-depth-4' src='../img/platos/" +
									valor +
									"'width='90px'" +
									"</td>";
								break;
							case "Disponible_plato":
								if (valor == "on") {
									tbl_row += "<td>" + estado + "</td>";
								} else if (valor == "") {
									tbl_row += "<td>" + estado2 + "</td>";
								}
								break;
							default:
								tbl_row += "<td>" + valor + "</td>";
								if (debug) console.log(tbl_row);
						}
					})
					tbl_body += "<tr>" + tbl_row + "</tr>";

					if (debug) console.log(tbl_body);
				})
				$("#listaPlatos tbody").html(tbl_body);
		},
		error: function (result) {
			alert("ERROR!!!!!!!");
			if (debug) console.error(result);
		}
	});
});
