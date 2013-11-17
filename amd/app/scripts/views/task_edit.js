define ([

    'underscore',
    'backbone',
    'syphon',
    'text!templates/task_edit.html',
    'views/task'

], function (_, Backbone, Syphon, TaskEditTemplate, TaskView) {
    'use strict';

    var EditTaskView = Backbone.View.extend ({

        tagName: 'form',

        template: _.template (TaskEditTemplate),

        events: {
            'submit': 'saveTask'
        },

        saveTask: function (e) {
            e.preventDefault();

            var newTask = Backbone.Syphon.serialize(this);

            this.model.set (newTask);
            this.model.save ();
        },

        render: function () {

            var editTask = this.model.toJSON();

            // Push the current priority to top
            var priorities = _.sortBy([1, 2, 3, 4, 5], function (n) { 
                return n == editTask.priority;
            }).reverse();

            // Extend editTask object by adding priorities array into it
            editTask = _.extend( editTask, {priorities: priorities} );

            this.$el.html (this.template (editTask));
            return this;
        }

    });

    return EditTaskView;
});

