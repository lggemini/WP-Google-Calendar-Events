module.exports = function( grunt ) {

	var pkg = grunt.file.readJSON( 'package.json' ),
		// version = 'vX.Y.Z'
		version = pkg.version,
		// semver = 'X.Y.Z'
		semver = version.substring( 1, version.length),
		// Files to include in a release
		distFiles =  [
			'**',
			'!assets/css/sass/**',
			'!assets/css/src/**',
			'!assets/js/src/**',
			'!build/**',
			'!images/src/**',
			'!images/wp/**',
			'!node_modules/**',
			'!tests/**',
			'!vendor/**',
			'!**/.*',
			'!bootstrap.php',
			'!bootstrap.php.dist',
			'!bower.json',
			'!ChangeLog.md',
			'!composer.json',
			'!composer.lock',
			'!Gruntfile.js',
			'!package.json',
			'!phpunit.xml',
			'!phpunit.xml.dist',
			'!README.md'
		];

	console.log( pkg.version + ' => ' + semver );

	// Project configuration
	grunt.initConfig( {

		pkg: pkg,
		semver : semver,

		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= semver %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				' * Licensed GPLv2+' +
				' */\n'
			},
			main: {
				src: [
					'assets/js/src/google-calendar-events.js'
				],
				dest: 'assets/js/google-calendar-events.js'
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'assets/js/src/**/*.js'
			]
		},

		uglify: {
			all: {
				files: {
					'assets/js/google-calendar-events.min.js': ['assets/js/google-calendar-events.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= semver %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},

		sass:   {
			options: {
				precision: 2,
				sourceMap: true
			},
			all: {
				files: {
					'assets/css/google-calendar-events.css': 'assets/css/sass/google-calendar-events.scss'
				}
			}
		},

		postcss: {
			dist: {
				options: {
					processors: [
						require('autoprefixer-core')({browsers: 'last 2 versions'})
					]
				},
				files: {
					'assets/css/google-calendar-events.css': [ 'assets/css/google-calendar-events.css' ]
				}
			}
		},

		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= semver %>\n' +
				' * <%=pkg.homepage %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				' * Licensed GPLv2+' +
				' */\n',
				processImport: false
			},
			minify: {
				expand: true,

				cwd: 'assets/css/',
				src: ['google-calendar-events.css'],

				dest: 'assets/css/',
				ext: '.min.css'
			}
		},

		watch:  {
			livereload: {
				files: ['assets/css/*.css'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['assets/css/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},

		clean: {
			main: [
				// Clean directories before new build
				'build/trunk',
				'release'
			]
		},

		// Copy the plugin to a svn versioned build directory
		copy: {
			assets : {
				expand: true,
				src: 'images/wp/*.*',
				dest: 'build/assets/'
			},
			tag: {
				expand: true,
				src: distFiles,
				dest: 'build/tags/' + semver + '/'
			},
			trunk: {
				expand: true,
				src: distFiles,
				dest: 'build/trunk'
			}
		},

		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/google-calendar-events-<%= semver %>.zip'
				},
				expand: true,
				cwd: 'build/<%= semver %>/',
				src: ['**/*'],
				dest: 'releases/'
			}
		},

		wp_deploy: {
			deploy: {
				options: {
					plugin_slug: 'google-calendar-events',
					svn_user: 'pderksen',
					build_dir: 'build',
					assets_dir: 'images/wp'
				}
			}
		},

		phpunit: {
			classes: {
				dir: 'tests/phpunit/'
			},
			options: {
				bin: 'vendor/bin/phpunit',
				bootstrap: 'bootstrap.php.dist',
				colors: true,
				testSuffix: 'Tests.php'
			}
		},

		qunit: {
			all: ['tests/qunit/**/*.html']
		}

	} );

	// Load tasks
	require('load-grunt-tasks')(grunt);

	// Register tasks

	grunt.registerTask( 'css', ['sass', 'postcss', 'cssmin'] );

	grunt.registerTask( 'js', ['jshint', 'concat', 'uglify'] );

	grunt.registerTask( 'default', ['css', 'js'] );

	grunt.registerTask( 'test', ['phpunit', 'qunit'] );

	grunt.registerTask( 'build', ['default', 'test'] );

	grunt.registerTask( 'release', ['build', 'clean', 'copy:trunk', 'copy:tag', 'compress'] );

	grunt.registerTask( 'deploy', ['release', 'wp_deploy'] );

	grunt.util.linefeed = '\n';
};
