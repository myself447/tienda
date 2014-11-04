    $('.rating').on('rating.change', function(event, value, caption) {
    console.log(value);
    console.log(caption);
    });

    function cargarListado(){

       
        var con = new XMLHttpRequest();

        con.onreadystatechange = function () {

            if (con.readyState == 4 && con.status == 200) {

                document.getElementById("sect2").innerHTML = con.responseText;
                //alert("Listado");
            }
        }

        con.open("GET","templates/Listado.cshtml",true);
        con.send();
    }



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

  $(function() {
    $( "#datepicker" ).datepicker();
  });

 // var picker = new Pikaday({ field: $('#datepicker')[0] });

  // activate datepickers for all elements with a class of 'datepicker'
$('.datepicker').pikaday({ firstDay: 1 });

// chain a few methods for the first datepicker, jQuery style!
$('.datepicker').eq(0).pikaday('show').pikaday('gotoYear', 2042);

$('#bt').click(
function () {
    //alert($('#rReporte').prop('checked'));
    /* var con = new XMLHttpRequest();

    con.onreadystatechange = function () {
    if (con.readyState == 4 && con.status == 200) {
    var XML = con.responseText;
    var result = XML;
    alert(result);
    }

    }
    var consulta = $('#rConsulta').prop('checked'); var reporte = $('#rReporte').prop('checked');
    var url = "admin_templates/Informe.cshtml?consulta=" + consulta + "&reporte=" + reporte;
    con.open("GET", url, true);
    con.send();*/


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