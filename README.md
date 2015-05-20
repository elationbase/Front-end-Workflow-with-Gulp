## Front-end Developer Workflow with Gulp
Start up front end project with HTML, SASS, JS, JSON, jQuery. 
* 2 build environments (development and production).
* CSS with SASS: Auto-prefixer, concatenate and minify
* JavaScript & jQuery: Concatenate and minify
* JSON: Minify
* HTML: Minify
* Server: Start in http://localhost:8080 
* LiveReload: Watch for changes and auto reload on server

### Get ready
####First clone or download this repo
```
https://github.com/elationbase/workflow.git
```
#### Open your terminal app and access the workflow folder
i.e.
```
cd /Users/YOUR_NAME/Downloads/workflow-master 
```

### Install Project
#### Install <a href="http://gulpjs.com/">gulp</a>
_Note: If you ahve any erros installing gulp or it's modules, try using "sudo" before "npm install"_

if you don't have gulp installed globally 
```
$ npm install gulp -g
```
#### Install gulp in your project
```
$ npm install gulp --save-dev
```
#### Install gulp dependency modules
```
$ npm install --save-dev gulp-gulpUtil 
$ npm install --save-dev gulp-concat 
$ npm install --save-dev gulp-browserify 
$ npm install --save-dev gulp-compass 
$ npm install --save-dev gulp-autoprefixer 
$ npm install --save-dev gulp-connect 
$ npm install --save-dev gulp-if 
$ npm install --save-dev gulp-uglify 
$ npm install --save-dev gulp-minify-html 
$ npm install --save-dev gulp-jsonminify 
$ npm install --save-dev gulp-imagemin 
$ npm install --save-dev gulp-pngcrush
```
	
### Run gulp project
Make sure you remain in your terminal app and at the workflow folder

#### for development
```
$ gulp
```
#### for production
```
$ NODE_ENV=production gulp
```

### License
Copyright (c) 2015 Elation Base Licensed under the MIT license.
Front-end Developer Workflow with Gulp
https://github.com/elationbase/workflow/
<a href="http://elationbase.com/">http://elationbase.com/</a>
Copyright 2015, elationbase
Start up front end project with HTML, SASS, JS, JSON, jQuery. Including 2 build environments (development and production).
Free to use under the MIT license.
http://www.opensource.org/licenses/mit-license.php