define ([

    'backbone',
    'collections/tasks',
    'views/task'

], function (Backbone, TasksCollection, TaskView) {

    'use strict';

    var tasksCollection = new TasksCollection();

    var TasksView = Backbone.View.extend ({

        el: '#tasks',

        render: function () {

            var _this = this;

            tasksCollection.fetch().then (function () {

                var taskView = null;
                // Add task to tasks collection
                tasksCollection.each (function (task) {
                    taskView = new TaskView( { model: task } );
                    _this.$el.append (taskView.render().el );
                });

            });

        }
    });

    return TasksView;
});
