define ([

    'backbone',
    'views/tasks'

], function (Backbone, TasksView) {

    var AppRouter = Backbone.Router.extend ({
        routes: {
            '': 'index',
            'task/:id': 'editTask'
        }
    });

    var initialize = function () {

        var appRouter = new AppRouter();

        appRouter.on ('route:index', function () {
            var tasksView = new TasksView();
            tasksView.render();
        });

        Backbone.history.start();
    };

    return { initialize: initialize };
});

