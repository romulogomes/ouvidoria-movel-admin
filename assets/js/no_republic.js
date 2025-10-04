$(document).ready(function(){
	var possuirepublica=false;
	if(!possuirepublica) {
		swal({
			title: "Sem república",
			text: "Você ainda não está em nenhuma república, deseja cadastrar sua república ou encontrar uma dentre as existentes?",
			type: "warning",
			showCancelButton: true,   
			confirmButtonColor: '#82B440',   
			cancelButtonColor: '#3085d6',   
			confirmButtonText: 'Cadastrar',
			cancelButtonText: 'Procurar',
			closeOnConfirm: false,
			allowOutsideClick: false

		}, 
		function(){
			location.href="cadastro_republica.html"
		},
		function(){
			alert("procurar");
		});
	}
});