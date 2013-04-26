$$('#bar').tap(function() {
	Lungo.Notification.confirm({
	    icon: 'user',
	    title: 'Chat de la disco',
	    description: 'Chatea con los demas',
	    accept: {
	        icon: 'checkmark',
	        label: 'Ir',
	        callback: function(){ 
	        	Lungo.Router.article("second","chat");
	    	}
	    },
	    cancel: {
	        icon: 'close',
	        label: 'No',
	        callback: function(){}
	    }
	});
});

$$('#taxi').tap(function() {
	Lungo.Notification.confirm({
	    icon: 'user',
	    title: 'Ya te vas?',
	    description: 'Opciones',
	    accept: {
	        icon: 'checkmark',
	        label: 'Carro Propio',
	        callback: function(){ 
	        	Lungo.Router.article("seVaSect","soloArt");
	    	}
	    },
	    cancel: {
	        icon: 'close',
	        label: 'Pedir Taxi',
	        callback: function(){
	        	Lungo.Router.article("seVaSect","taxiArt");
	        }
	    }
	});
});

$$('#configPanic').tap(function() {
	Lungo.Router.article("ConfigSect","FormConfigPanic");
});

$$('#chatAdmin').tap(function() {
	Lungo.Router.article("ChatSect","FormChatadmin");
});

$$('#panic').tap(function() {
	Lungo.Notification.success(
	    "Entendido",                  //Title
	    "Hemos alertado a las autoridades",     //Description
	    "check",                    //Icon
	    5
	);
});

$$('#liDesignado').tap(function() {
	Lungo.Notification.success(
	    "Exito",                  //Title
	    "En minutos llegara tu conductor designado",     //Description
	    "thumbs-up",                    //Icon
	    5
	);
});
$$('#liAmigo').tap(function() {
	Lungo.Notification.success(
	    "Exito",                  //Title
	    "Espera un poco ya vendra alguien de tu confianza por ti",     //Description
	    "thumbs-up",                    //Icon
	    5
	);
});

