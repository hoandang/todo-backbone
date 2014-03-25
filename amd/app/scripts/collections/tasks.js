define ([

    'backbone',
    'models/task',
    'common'

], function (Backbone, TaskModel, Common) {

    var TasksCollection = Backbone.Collection.extend ({
        model: TaskModel,
        url: Common.ApiUrl + '/tasks'
    });

    return TasksCollection;
});
