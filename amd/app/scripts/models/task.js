define ([

    'backbone'

], function (Backbone) {

    var TaskModel = Backbone.Model.extend ({
        defaults: {
            title: 'Buy Mlik',
            priority: 4
        }
    });

    return TaskModel;
});
