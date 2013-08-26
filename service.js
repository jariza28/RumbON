var userStored = Lungo.Data.Storage.persistent("user");
Lungo.ready(function() {
    if (userStored){
        Lungo.Router.section('main');
    }
}); 
var idUsu = null;
var keyUsu = null;


//Login User
$$('#aLogin').tap(function() {
    var user = Lungo.dom('#username').val();
    var password = Lungo.dom('#password').val();

    var url = "http://rumbon.gopagoda.com/api/loginuser/";
    var data = {username: user, password: password};
    var parseResponse = function(result){
        if (result[0]["status"] == "Error"){
            // Si es un error le mostramos un bonito mensaje con un efecto muy estetico
            Lungo.Notification.error('Error', 'Email o Password invalido', 'cancel', 3);
        }else{
            //Tomamos los datos de session (ID y API_KEY)
            idUsu = result['datos'][0].id;
            keyUsu = result['datos'][0].api_key;
            name = result['datos'][0].name;
            email = result['datos'][0].email;

            var user = {id: idUsu, name: name, email: email, key: keyUsu};
            Lungo.Data.Storage.persistent("user", user);


            // Si todo fue correcto cargamos la seccion principal, usando Router
            Lungo.Router.section("main");
            // Limpiamos los input
            Lungo.dom('#username').val('');
            Lungo.dom('#password').val('');
        }
    };

    Lungo.Service.post(url, data, parseResponse, "json");

});
//Logout
$$('#aLogout').tap(function(){
    Lungo.Data.Storage.persistent("user", null);
    Lungo.Router.back();
});
//Registrar a un usuario
$$('#aEnviarRegistro').tap(function() {
    var name = Lungo.dom('#name').val();
    var email = Lungo.dom('#email').val();
    var telephone = Lungo.dom('#telephone').val();
    var password = Lungo.dom('#pass').val();

    var url = "http://rumbon.gopagoda.com/api/register/";
    var data = {name: name, email: email, telephone: telephone, password: password};
    var parseResponse = function(result){
        if (result[0]["status"] == "Error"){
            var errorName = result[1]['type']['errors']['messages']['name'];
            if (!errorName){
                errorName ='';
            }
            var errorEmail = result[1]['type']['errors']['messages']['email'];
            if (!errorEmail){
                errorEmail ='';
            }
            var errorTelephone = result[1]['type']['errors']['messages']['telephone'];
            if (!errorTelephone){
                errorTelephone ='';
            }
            var errorPass = result[1]['type']['errors']['messages']['password'];
            if (!errorPass){
                errorPass ='';
            }

            var errores = {name: errorName, email: errorEmail, telephone: errorTelephone, password:errorPass};

            var salida='';
            for (var p in errores) {
                salida += errores[p] + '\n';
            }
            // Si es un error le mostramos un bonito mensaje con un efecto muy estetico
            Lungo.Notification.error('Error', salida, 'cancel', 4);
        }else{
            cacheUsers(result['datos']);
            Lungo.Notification.success('success', 'Usuario creado :)', 'thumbs-up', 3);
            // Si todo fue correcto cargamos la seccion principal, usando Router
            Lungo.Router.back();
            // Limpiamos los input
            Lungo.dom('#username').val('');
            Lungo.dom('#password').val('');
        }
    };

    Lungo.Service.post(url, data, parseResponse, "json");
});

//Traer todas los restaurantes que este abiertos cuando le da tap en restaurantes
$$('#aRest').tap(function() {
    var template,html;
    var url = "http://rumbon.gopagoda.com/api/restaurantbystatu";

    var parseResponse = function(result){
        template ='<li>Abiertos Ahora</li>\
                    <li class="anchor"></li>\
                    <ul>{{#datos}}\
                     <li class="thumb selectable" id="{{id}}">\
                        <div class="right">{{telephone}} - {{address}}</div>\
                        <img src="http://rumbon.gopagoda.com/uploads/thumbnails/restaurants/{{image}}" />\
                        <strong>{{name}}</strong>\
                        <small>{{description}}</small>\
                    </li>\
                    {{/datos}}</ul>';
        html = Mustache.render(template,result);
        $$('#listaRest').html(html); //Aqui es donde se 'pintaría' los datos que estamos consumiendo en JSON
    }
    var result = Lungo.Service.get(url, "", parseResponse, "json");
});

//Buscar Club por tipo
$$('#tipoclub').tap(function() {
    var template,html;
    var tipos = Lungo.dom(this);
    var tipo = tipos.attr('name');

    var url = "http://rumbon.gopagoda.com/api/clubytype/"+tipo;

    var parseResponse = function(result){
        template ='<ul>{{#datos}}\
                     <li class="thumb selectable" id="{{id}}">\
                        <div class="right">{{telephone}} - {{address}}</div>\
                        <img src="http://rumbon.gopagoda.com/uploads/thumbnails/clubs/{{image}}" />\
                        <strong>{{name}}</strong>\
                        <small>{{description}}</small>\
                    </li>\
                    {{/datos}}\
                    {{^datos}}\
                    <li class="thumb">\
                        <strong>No hay discoteca por este tipo</strong>\
                        <small>:(</small>\
                    </li>\
                    {{/datos}}</ul>';
        html = Mustache.render(template,result);
        $$('#listaresultipo').html(html); //Aqui es donde se 'pintaría' los datos que estamos consumiendo en JSON
    }
    var result = Lungo.Service.get(url, "", parseResponse, "json");
}); 

//El club al que el usuario dicidio ir
$$('article#listaresultipo ul li').tap(function() {
    var tipos = Lungo.dom(this);
    var club_id = tipos.attr('id');
    var template,html;
    Lungo.Notification.confirm({
        icon: 'music',
        title: 'Quieres ir a esta discoteca?',
        description: 'Confirma si quieres rumbear hoy aqui',
        accept: {
            icon: 'checkmark',
            label: 'Si',
            callback: function(){ 
                var url = "http://rumbon.gopagoda.com/api/go/";
                var data = {id: idUsu, club_id: club_id};
                var parseResponse = function(result){
                    template ='<ul>{{#datos}}\
                                    <h3>Iras a {{name}}</h3>\
                                 <li class="thumb selectable" id="{{id}}">\
                                    <div class="right">{{telephone}} - {{address}}</div>\
                                    <img src="http://rumbon.gopagoda.com/uploads/thumbnails/clubs/{{image}}" />\
                                    <strong>{{name}}</strong>\
                                    <small>{{description}}</small>\
                                </li>\
                                {{/datos}}\
                                </ul>';
                    html = Mustache.render(template,result);
                    $$('#art-5').html(html); 
                    Lungo.Element.count("#reco", 1);
                };
                Lungo.Service.post(url, data, parseResponse, "json");
            }
        },
        cancel: {
            icon: 'close',
            label: 'No'
        }
    });
}); 