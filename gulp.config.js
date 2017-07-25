module.exports = function() {
    var client =  './client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './server.js'

    var config = {

        /**
         *  File paths
         */
         alljs: [
            './client/**/*.js',
            './*.js'
         ],
         client: client,
         css: clientApp + 'app.css',
         index: clientApp + 'index.html',
         js: [
           clientApp + '**/*.module.js',
           clientApp + '**/*.js',
           '!' + clientApp + '**/*.spec.js',
         ],
         server: server,
         temp: temp,

         /**
          *  Bower and NPM locations
          */
          bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            igorePath: '../..'
          },

          /**
           * Node settings
           */
           defaultPort: 7203,
           nodeServer: './server/server.js'
    };

        config.getWiredepDefaultOptions = function() {
            var options = {
                bowerJson: config.bower.json,
                directory: config.bower.directory,
                ignorePath: cofig.bower.ignorePath
            };
            return options;
        };

    return config;
  };
