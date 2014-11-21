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
        
            $('#informe').html((html)); T
        }
    });

}

);

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

function add_update(element){
    var accion = "";
    if(element.value=="Agregar Producto"){

        accion = "guardar";
        
    }
    else if(element.value=="Actualizar Producto"){

        accion = "actualizar";
    }
    //var files = new Array(document.querySelectorAll("#producto div input[name=ruta]"));
    var files =  document.querySelectorAll("#producto div input[name=ruta]"); //alert(files);
    var archivos = {};
    for (var i = 0; i < files.length;i++ ){
        
        archivos[String.fromCharCode(i+97)] = files[i].value; 
        //alert(archivos[i].value);
        
    } alert(JSON.stringify(archivos)); //alert(String(archivos));
    $.ajax({
        url: "admin_templates/CRUD.cshtml",
        type: "POST",
        //contentType: "charset=utf-8; charset=UTF-8;",
        dataType: "HTML",
        data: { "titulo": $("input[name=titulo]").val(), "desc": $("#desc").val(), "portada": $("input[name=portada]").val(),
            "precio": $("input[name=precio]").val(), "ref": $("#ref").val(), "files": JSON.stringify(archivos),"buscar":$("#buscar").val() ,"accion": accion},
       // processData: false,
        success: function (content) {
            alert(content);
        }
    });

}

function up(){
    var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');

form.onsubmit = function (event) {
    event.preventDefault();

    // The rest of the code will go here...
}



// Get the selected files from the input.
var files = fileSelect.files;

// Create a new FormData object.
var formData = new FormData();


// Loop through each of the selected files.
for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.
  if (!file.type.match('image.*')) {
    continue;
  }

  // Add the file to the request.
  formData.append('photos[]', file, file.name);
  //alert(file + " " + file.name);
}

// Files
/*formData.append("whatever", file, filename);

// Blobs
//formData.append(name, blob, filename);

// Strings
//formData.append(name, value);  */

// Set up the request.
var xhr = new XMLHttpRequest();  


// Open the connection.
xhr.open('POST', 'admin_templates/TestUpload.cshtml', true);

// Set up a handler for when the request finishes.
xhr.onload = function () {
    if (xhr.status === 200) {
        // File(s) uploaded.
        uploadButton.innerHTML = 'Upload';
        document.getElementById("up").innerHTML = "hecho";
        alert(xhr.responseText);
    } else {
        alert('Ocurrió un Error');
    }
};

// Send the Data.
xhr.send(formData);
}


function upload(valores) {
    
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
        formData.append("uploads[]", portada.files[0], portada.files[0].name);
        for(var i=0;i<archivos.length-1;i++){
            var archivo = archivos[i];
            formData.append("uploads[]", archivo.files[0], archivo.files[0].name);
        }
        


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

        client.send(formData);  /* Send to server */
    }