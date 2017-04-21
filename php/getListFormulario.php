<?php

$test = 1;
// para comprobar si se recibe un POST/GET desde un AJAX
if ($_SERVER['REQUEST_METHOD'] === 'GET'){

	//  creamos una variable de conexión a nuestro localhost:
    $mysqli = new mysqli('localhost', 'root', '', 'aaaaaaa');
    //  declaramos que este en UTF-8
    mysqli_set_charset($mysqli,'utf8');
    $sql = "SELECT * FROM contactos";
    // en caso de que salga error, le ponemos una condición
    if ($mysqli){
        //creamos una variable con todos los datos.
        $query = $mysqli->query($sql);
        //creamos una condición para comprobar si el registro se a echo correctamente
        if ($query == TRUE) {
            $error = "Funciona Correctamente";
            $errore = $query;
            //crear un array con todos los object.
            $rows = $query -> fetch_all(MYSQLI_ASSOC);

        } else {
            //para ver que error y en que linea ha sucedido.
            $error = "Error: " . $sql . "<br>" . $mysqli->error;
        }

    } else {
    	$error = "Error de Conexión!";
    }
    // Cerrar conexión.
    $mysqli->close();

	// codificar datos para enviar de vuelta con json
	echo json_encode([
		//"resultado" => "ok",
		"error" => $error,
		"query" => $rows,
		"resultado" => "Conexión con la Base de Datos Correcta",
		]);
} else {
	echo json_encode([
		"resultado" => "KO",
		"error" => "Error json"
		//"testeo" => $test
		]);
}
?>
