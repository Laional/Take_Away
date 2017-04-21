// función para mostrar los platos en nuestra pagina principal
function pintaPlatos(categoriaPlato,fotoPlato,nombrePlato,precioPlato,descripPlato,id_plato){
  console.log('llegamos hasta aqui');
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
