	module.exports = function(grunt) {

	require('time-grunt')(grunt);

	var gruntTaskObject = {
		tasksInitConfig: {
			'sass_shell': {
				dist: {
					options: {
						style: 'compressed'
					},
					files: {
						'css/sass_shell.style.min.css': 'scss/style.scss'
					}
				}
			},
			watch: {
				options: {
					livereload: true
				},
				sass: {
					files: [
						'scss/**/**/*.{scss,sass}'
					],
					tasks: [
						'sassCompressor',
					]
				},
				files: [
					"js/**/**/*",
					"scssss/**/**/*",
					"css/**/**/*",
					"*.html"
				]
			}
		},
		tasksToBeCalled: {
			'sass_another': {
				fancyName: 'sassCompressor',
				deps: [
					'grunt-sass-shell',
				],
				tasksToRun: ['sass_shell'],
				callbacks: {
					'beforeInit': function(){

					},
					'afterInit': function(){

					},
					'beforeTasksRun': function(){

					},
					'afterTasksRun': function(){

					}
				}
			},
			'watch': {
				fancyName: 'watcher',
				deps: [
					'grunt-contrib-watch'
				],
				tasksToRun: ['watch'],
				callbacks: {
					'beforeInit': function(){

					},
					'afterInit': function(){

					},
					'beforeTasksRun': function(){

					},
					'afterTasksRun': function(){

					}
				}
			}
		}
	};

	grunt.initConfig(gruntTaskObject.tasksInitConfig);

	for(var taskKey in gruntTaskObject.tasksToBeCalled){

		(function(tasksToBeCalled){

			grunt.registerTask(tasksToBeCalled.fancyName, function(){

				if( typeof tasksToBeCalled.callbacks['beforeInit'] == 'function' ){
					tasksToBeCalled.callbacks['beforeInit'].call(this);
				}

				tasksToBeCalled.deps.map(function(dep){
					grunt.loadNpmTasks(dep);
				});

				if( typeof tasksToBeCalled.callbacks['afterInit'] == 'function' ){
					tasksToBeCalled.callbacks['afterInit'].call(this);
				}

				if( typeof tasksToBeCalled.callbacks['beforeTasksRun'] == 'function' ){
					tasksToBeCalled.callbacks['beforeTasksRun'].call(this);
				}

				grunt.task.run(tasksToBeCalled.tasksToRun);

				if( typeof tasksToBeCalled.callbacks['afterTasksRun'] == 'function' ){
					tasksToBeCalled.callbacks['afterTasksRun'].call(this);
				}

			});
		})(gruntTaskObject.tasksToBeCalled[taskKey]);

	}

	};