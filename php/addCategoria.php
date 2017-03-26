<?php

$test = 1;
// para comprobar si se recibe un post desde un AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST'){

    //para almacenar los datos JSON recibidos en una variable
    $request = file_get_contents('php://input');

    //para convertir un JSON en un ARRAY PHP
    $datos = json_decode($request,true);
    
    //
    $valores = "";
    $campos = "";

    // por cada elemento $datos nos separas el valor
    // el "." significa concotenar
    // la expreción=> .', ' =>significa añadir una "," despues de cada NAME y VALUE
    foreach ($datos as $key => $value) {
        $campos .= $value ['name'].', ';
        $valores .= '"'.$value ['value'].'", ';
    }

    // creamos un substr y le decimos que  a $valores y a $campos le quite 2 caracteres cada vez que lo imprima
    $valores = substr($valores, 0, -2);
    $campos = substr($campos, 0, -2);

    //
    //$sql = "INSERT INTO enterprise ($campos) VALUES ($valores)";

    //  creamos una variable de conexión a nuestro localhost:
    $mysqli = new mysqli('localhost', 'root', '', 'take_away');
    //  declaramos que este en UTF-8
    mysqli_set_charset($mysqli,'utf8');
    // en caso de que salga error, le ponemos una condición
    if ($mysqli){
        $sql = "INSERT INTO t_categorias ($campos) VALUES ($valores);";
        //creamos una variable con todos los datos.
        $query=$mysqli->query($sql);
        //creamos una condición para comprobar si el registro se a echo correctamente
        if ($query === TRUE) {
            //$error = "Registro agregado correctamente!";
            $error = 0;
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
        "campos" => $campos,
        "valores" => $valores,
        "sql" => $sql
        ]);
} else {
    echo json_encode([
        "resultado" => "KO",
        "error" => $error,
        //"testeo" => $test
        ]);
}
?>
