    $('.rating').on('rating.change', function(event, value, caption) {
    console.log(value);
    console.log(caption);
    });

   /* function cargarListado(){

       
        var con = new XMLHttpRequest();

        con.onreadystatechange = function () {

            if (con.readyState == 4 && con.status == 200) {

                document.getElementById("sect2").innerHTML = con.responseText;
                //alert("Listado");
            }
        }

        con.open("GET","templates/Listado.cshtml",true);
        con.send();
    }*/



    $("#ver_login").click(function () {
        $("#adm_login").slideToggle();
    });

    $(".carrito").click(
    function () {
        //alert($(this).attr("name"));
        $("span[name=" + $(this).attr("name") + $(this).attr("name") + "] *").click();
    }
    );

   /* $("span[name=11]").click(
    function () { alert("clickeado"); }
    );*/

  /*$(function() {
    $( "#datepicker" ).datepicker();
  });*/

 // var picker = new Pikaday({ field: $('#datepicker')[0] });

  // activate datepickers for all elements with a class of 'datepicker'
$('.datepicker').pikaday({ firstDay: 1 });

// chain a few methods for the first datepicker, jQuery style!
$('.datepicker').eq(0).pikaday('show').pikaday('gotoYear', 2042);

$('#bt').click(
function () {

    var consulta = $('#rConsulta').prop('checked'); var reporte = $('#rReporte').prop('checked');
    $.ajax({
        type: "GET",
        url: "admin_templates/Informe.cshtml",
        dataType: "html",
        data: { "consulta": consulta, "reporte": reporte },
        success: function (html) {
        
            $('#informe').html((html));
        }
    });
});

$("#producto div:nth-of-type(2) > span").click(function () {
    $("#buscar").click();
});

$("#buscar").change(function(){
    $("input[name='portada']").attr("value",$("#buscar").val());
});


function grabs(element){
    $("input[name=busqueda" + element.id + "]").click();
}

function cambio(element){
    
    var x = String(element.name); x = x.substring(8);  
    var number = parseInt(x) + 1; //alert(String(number));
    var busqueda = "busqueda" + String(number);
    //alert(element.value);
    $("#" + element.name).attr("value", element.value);
    var files = document.querySelectorAll("#producto div input[name=ruta]");
    var agregar = true;
    for (i = 0; i < files.length;i++){

        if(files[i].value=="" || files[i].value==null){
            agregar = false;
            break;
        }
    }
    if (agregar) {
        $("#producto").append(
           "<div class='input-group'> \
                <input type='text' name='ruta' class='form-control' id='" + busqueda + "' placeholder='Busque Grabación'> \
                <input type='file' name='" + busqueda + "' onchange='cambio(this);'> \
                <span class='input-group-addon' id='" + number + "' onclick='grabs(this);'><span class='glyphicon glyphicon-search'></span></span> \
            </div>"
    );
    }
}


function upload(element) {
    
    var portada = document.getElementById('buscar');
    var archivos = document.querySelectorAll("#producto div:nth-of-type(6) ~ div input[type=file]");
    var form = document.getElementById('data');

    data.onsubmit = function (event) {

        event.preventDefault();
        document.getElementById('up').style.display = "inline";
    }



    /* Create a FormData instance */
    var formData = new FormData();
    /* Add the file */
    formData.append("accion", element.value);
    formData.append("uploads[]", portada.files[0], portada.files[0].name);
    for(var i=0;i<archivos.length-1;i++){
        var archivo = archivos[i];
        formData.append("uploads[]", archivo.files[0], archivo.files[0].name);
    }

    formData.append("titulo", $("input[name=titulo]").val());
    formData.append("precio", $("input[name=precio]").val());
    formData.append("ref", $("input[name=ref]").val());
    formData.append("desc", $("input[name=desc]").val());
        


    var client = new XMLHttpRequest();

    client.open("POST", "admin_templates/TestUpload.cshtml", true);
    //client.setRequestHeader("Content-Type", "multipart/form-data");


    /* Check the response status */
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {

            alert(client.statusText + " " + client.responseText);
            document.getElementById('up').style.display="none";
        }
        else {

            //alert("Un Error Ocurrió");
        }
    }
//client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    client.send(formData);  /* Send to server */
      
        
}