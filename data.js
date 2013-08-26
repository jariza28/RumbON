var CONFIG = {
  name: 'rumbon_db',         //Name of the database
  version: '1.0',           //Version of the database
  size: 65536,              //Size of the database
  schema: [                 //Database schema
    {
      name: 'users',     //Table name
      drop: false,       //Drop existing content on init
      fields: {         //Table fields
        api_key: 'STRING',
        email: 'STRING',
        id: 'INTEGER PRIMARY KEY',
        name: 'STRING',
        telephone: 'INTEGER',
        type: 'INTEGER DEFAULT 1'
      }
    }
  ]
};
Lungo.Data.Sql.init(CONFIG);

//Insertar los datos del nuevo usuario
var cacheUsers = function(user) {
  Lungo.Data.Sql.insert('users', user);
}

return {
  cacheUsers: cacheUsers
}


var datosusu = function(datos) {
  console.log(datos);
}
return {
    datosusu: datosusu
}