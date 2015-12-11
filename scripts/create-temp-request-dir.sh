BASE_DIR=$1
BASE_DIR_PREFIX="webpack-builder/"
TEMP_DIR_PREFIX="webpack-builder/temp/"
TARGET_DIR=$2

cp -R $BASE_DIR_PREFIX$BASE_DIR $TEMP_DIR_PREFIX$TARGET_DIR
cd $TEMP_DIR_PREFIX$TARGET_DIR
cp ../../../webpack-configs/uglify-external-source-map.config.js ./uglify-external-source-map.config.js