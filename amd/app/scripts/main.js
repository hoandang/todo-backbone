require.config ({
    paths: {
        jquery     : 'vendor/jquery/jquery.min',
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text'
    }
});

require ([

    'app'

], function (App) {

    App.initialize();
});

