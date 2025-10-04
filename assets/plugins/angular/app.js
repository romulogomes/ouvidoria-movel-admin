var app = angular.module("groupper", []);

app.controller("tarefasCtrl", function($scope){
	$scope.tarefas = [
	{nome : "Limpar a casa", "tipo" : "Importante", "frequencia" : "Diária"},
	{nome : "Lavar Baheiro", "tipo" : "Importante", "frequencia" : "Semanal"},
	{nome : "Jogar Lixo fora", "tipo" : "Importante", "frequencia" : "Diária"}];
});