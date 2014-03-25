(function (){

    'use strict';

    window.App = {
        restUrl: 'http://api.todo.dev',
        Models: {},
        Collections: {},
        Views: {},
        Helpers: {}
    };

    App.Models.Task = Backbone.Model.extend ({});

    App.Collections.Tasks = Backbone.Collection.extend ({
        model: App.Models.Task,
        url: App.restUrl + '/tasks'
    });

    // Define Individual Task View
    App.Views.Task = Backbone.View.extend ({
        tagName: 'li',

        template: _.template ( $('#tasksTemplate').html() ),
        editTemplate: _.template ( $('#editTaskTemplate').html() ),

        events: {
            'click .edit': 'editTask',
            'click .cancel': 'cancelEditTask',
            'click .delete': 'destroyTask',
            'submit': 'saveTask',
        },

        initialize: function () {
            this.model.on ('change', this.render, this);
            this.model.on ('destroy', this.remove, this);
        },

        // Edit Task Event
        editTask: function () {
            var editTask = this.model.toJSON();

            // Push the current priority to top
            var priorities = _.sortBy([1, 2, 3, 4, 5], function (n) { 
                return n == editTask.priority;
            }).reverse();

            // Extend editTask object by adding priorities array into it
            editTask = _.extend( editTask, {priorities: priorities} );

            // Render edit template
            this.$el.html (this.editTemplate (editTask));
        },

        // Cancel Task Event
        cancelEditTask: function () {
            this.render();
        },

        // Save Task Event
        saveTask: function (e) {
            e.preventDefault();
            var newTask = Backbone.Syphon.serialize(this);
            this.model.set (newTask);
            this.model.save ();
        },

        // Destroy Task
        destroyTask: function () {
            this.model.destroy ();
        },

        // Render main view
        render: function () {
            this.$el.html (this.template (this.model.toJSON()));
            return this;
        },
    });

    // Define Add Task View
    App.Views.AddTask = Backbone.View.extend ({
        el: '#addTask',

        events: {
            'submit': 'addTask'
        },

        addTask: function (e) {
            e.preventDefault();

            var newTask = Backbone.Syphon.serialize(this);
            var tasks   = this.collection;

            tasks.create ( newTask, {
                wait: true,
                // Add id for new task created
                success: function (xhr, response) {
                    xhr.set ('id', response);
                }
            });
        }
    });

    // Define Collective Tasks View
    App.Views.Tasks = Backbone.View.extend ({
        tagName: 'ul',

        initialize: function () {
            this.collection.on ('add', this.addTaskView, this);
        },

        render: function () {
            this.$el.empty();
            // Sort task by priority
            var tasks = this.sortBy ('priority');
            // Append each individual task to task view
            tasks.each (this.addTaskView, this);
            return this;
        },

        sortBy: function (comparator) {
            this.collection.comparator = comparator;
            return this.collection.sort (comparator);
        },

        addTaskView: function (task) {
            var taskView = new App.Views.Task ( {model: task} );
            this.$el.append (taskView.render().el);
        }
    });

})();

var tasksCollection = new App.Collections.Tasks();

tasksCollection.fetch().then (function () {
    var tasksView = new App.Views.Tasks ( {collection: tasksCollection} );
    $('.tasks').html(tasksView.render().el);
});

var addTaskView = new App.Views.AddTask ( { collection: tasksCollection} );

