#!/bin/bash

#ideally have another variable that decides which config file to use
FOLDER_NAME=$1
BASE_PATH='webpack-builder/temp/'
FULL_FOLDER_PATH=$BASE_PATH$FOLDER_NAME

cd $FULL_FOLDER_PATH
webpack --config uglify-external-source-map.config.js
