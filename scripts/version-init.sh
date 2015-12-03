#!/bin/bash
VERSION=$1
FOLDER_NAME=$(echo $VERSION | tr . -)
BASE_PATH='webpack-builder/'
FULL_FOLDER_PATH=$BASE_PATH$FOLDER_NAME
MUI_PREFIX='material-ui@'
WEBPACK_STRING='webpack@1.11.0'

# echo $VERSION
# echo $FOLDER_NAME
# echo $BASE_PATH
# echo $FULL_FOLDER_PATH

if ! [ -d $FULL_FOLDER_PATH ] ; then
	# echo 'folder not found'
	mkdir $FULL_FOLDER_PATH
	cd $FULL_FOLDER_PATH
	cp ../../webpack-configs/uglify-external-source-map.config.js ./uglify-external-source-map.config.js
	# pwd

	npm init -y
	npm install $MUI_PREFIX$VERSION --save
	npm install $WEBPACK_STRING --save-dev
	npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev

	#remove extra react copy, not sure of another workaround yet
	rm -rf node_modules/material-ui/node_modules/react
fi