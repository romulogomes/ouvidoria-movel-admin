function lista_sistemas(){
  $('#tabela').dataTable().fnDestroy();     /* atualiza tabela após cadastro*/
  $('#tabela').dataTable().fnClearTable(); /* atualiza tabela após cadastro*/
  var t = $('#tabela').DataTable();

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);           

            for(i = 0; i < ans.length; i++){
               var usuarioPk = ans[i].usuarioPk;
               var acessoIrrestrito = ans[i].acessoIrrestrito; 
               var ativo = ans[i].ativo;                
               var cpf = ans[i].cpf;
               var descricao = ans[i].descricao;  
               var email = ans[i].email;   
               var login = ans[i].login; 
               var senha = ans[i].senha; 
                          

               t.row.add( [
                 usuarioPk,
                 acessoIrrestrito,
                 ativo,
                 cpf,
                 descricao,
                 email,
                 login,
                 senha,          
                
            ]).draw();              
               
            }

          document.getElementById('loading').style.display = "none";         
      }
  }

    var url = "http://172.29.2.230:8080/gestorws/webresources/usuario";
    xhr.open("GET", url, true);
    xhr.send();
}

function lista_usuarios(){
  $('#usuarios').dataTable().fnDestroy();     /* atualiza tabela após cadastro*/
  $('#usuarios').dataTable().fnClearTable(); /* atualiza tabela após cadastro*/
  var t = $('#usuarios').DataTable();

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);           

            for(i = 0; i < ans.length; i++){
               var login = ans[i].login;
               var id = ans[i].id; 
               var nome = ans[i].nome;                
               var email = ans[i].email;
               var ativo = ans[i].ativo;  
               var cpf = ans[i].cpf;   
               var matriculaFk = ans[i].matriculaFk; 
                          

               t.row.add( [
                 nome,
                 login,
                 email,
                 matriculaFk,
                 cpf,
                 ativo                
            ]).draw();              
               
            }
      }
  }

    var url = "http://172.29.2.30:8087/gestorws/webresources/usuario";
    xhr.open("GET", url, true);
    xhr.send();
}

function buscar_comissionados( index ){

    if(index){
      var t = $('#tabela').DataTable({
            paging: false,
            searching: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "40%" },
                { "width": "10%" },
              ]
        });
    }
    else{
      var t = $('#tabela').DataTable({
            paging: false,
             "columns": [
                { "width": "50%" },
                { "width": "40%" },
                { "width": "10%" },
              ]
        });
    }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           var valor_global = 0;

            for(i = 0; i < dados.length; i++){
               var simbologia = dados[i].simbologia; 
               var tipo = dados[i].tipoChefia;
               var total = dados[i].qtde;
               valor_global += total;

               t.row.add( [
                 simbologia,
                 tipo,
                 '<center>'+total+'</center>'

               ]).draw();
              
               
            }

         document.getElementById('loading').style.display = "none";
        // document.getElementById('total').innerHTML += valor_global;
      }
    }
    
    
    url = "http://localhost:8080/webservices/webresources/entidade.vwmcgetesqtdecargocomis/";
    xhr.open("GET", url, true);
    xhr.send();
}

function situacao_financeiro( index ){

  if(index){
      var t = $('#tabela_situacao').DataTable({
            searching: false,
            paging: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "25%" },
                { "width": "20%" },
              ]
        });
  }
  else{
    var t = $('#tabela_situacao').DataTable({
             "columns": [
                { "width": "75%" },
                { "width": "12%" },
                { "width": "10%" },
              ]
        });
  }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           
            for(i = 0; i < dados.length; i++){
               var situacao = dados[i].situacao; 
               var servidores = dados[i].servidores;
               var total = dados[i].total;
               if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<center>'+total+'</center>'

                 ]).draw();
               } 
               
            }

         document.getElementById('loading').style.display = "none";
      }
    }    
    
    url = "http://localhost:8080/webservices/webresources/entidade.vwmcgetessituacaofinanceiro/";
    xhr.open("GET", url, true);
    xhr.send();
}


function total_por_folha( index ){

  if(index){
      var t = $('#tabela_total_folha').DataTable({
            searching: false,
            paging: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "25%" },
                { "width": "20%" },
              ]
        });
  }
  else{
    var t = $('#tabela_total_folha').DataTable({
             "columns": [
                { "width": "75%" },
                { "width": "12%" },
                { "width": "10%" },
              ]
        });
  }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           
            for(i = 0; i < dados.length; i++){
               var situacao = dados[i].situacao; 
               var servidores = dados[i].servidores;
               var total = dados[i].total;
               if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<center>'+total+'</center>'

                 ]).draw();
               } 
               
            }

         document.getElementById('loading').style.display = "none";
      }
    }
    
    
    url = "http://localhost:8080/webservices/webresources/entidade.vwmtotalporfolha";
    xhr.open("GET", url, true);
    xhr.send();
}

