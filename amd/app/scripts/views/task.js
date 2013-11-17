define ([

    'underscore',
    'backbone',
    'views/task_edit',
    'text!templates/task.html'

], function (_, Backbone, EditTaskView, TaskTemplate) {
    'use strict';

    var TaskView = Backbone.View.extend ({

        tagName: 'li',

        template: _.template (TaskTemplate),

        initialize: function () {
            this.model.on ('change', this.render, this);
            this.model.on ('destroy', this.remove, this);
        },

        events: {
            'click .edit': 'renderEditTaskView',
            'click .delete': 'destroyTask',
            'click .cancel': 'cancelEditTask'
        },

        renderEditTaskView: function () {

            // Render edit task view
            var editTaskView = new EditTaskView( { model: this.model } );
            this.$el.html (editTaskView.render().el);
        },

        cancelEditTask: function () {
            this.render();
        },

        destroyTask: function () {
            this.model.destroy ();
        },

        render: function () {
            this.$el.html (this.template (this.model.toJSON()));
            return this;
        }

    });

    return TaskView;
});
