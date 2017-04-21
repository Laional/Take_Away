$(document).ready(function() {
	//declarar la variable para depurar y no visualizar console.log
	var debug = true;
	$.ajax ({
				// Archivo que te trata los datos
	            url: '../php/getListFormulario.php',
	            // Forma de enviar los datos
	            type: 'GET',
	            // Tipo de datos que se envian
	            dataType: 'json',
	            // La variable donde estan los datos a tratar. (datos enviados)
	            //data: jsonData,
	            // Imprecindible para saber si hay errores i/o buen funcionamiento
	            // Funcion que se ejecuta cuando ha funcionado la llamada ajax correctamente
	            success: function(result){
	                if (debug) {
	                    console.log(result.error);
	                    console.log(result.query);
	                    console.log(result.resultado);
	                    var tbl_body = "";
	                    $.each(result.query, function(){
	                    	var tbl_row = "";
	                    	$.each(this, function(k , v) {
            				tbl_row += "<td>"+v+"</td>";
        					})
        					tbl_body += "<tr>" + tbl_row + "</tr>";
	                    	console.log("Pintando");
	                    	console.log(tbl_body);
	                    })
	                    $("#listado tbody").html(tbl_body);
	                }
	            },
							// Funcion que se ejecuta cuando el ajax no funciona correctamente
	            error: function(result){
	                alert("ERROR!!!!!!!");
	                //console.error(result);
	            }
	        });
});
