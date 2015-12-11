# BASE_DIR_PREFIX="webpack-builder/"

BASE_DIR="webpack-builder/0-13-4-source"
TEMP_DIR_PREFIX="webpack-builder/temp/"
TARGET_DIR=$1

WEBPACK_CONFIG_BASE="webpack-configs"
WEBPACK_CONFIG_FILE="/no-uglify-no-source-map.config.js"

# cp -R $BASE_DIR_PREFIX$BASE_DIR $TEMP_DIR_PREFIX$TARGET_DIR
# cd $TEMP_DIR_PREFIX$TARGET_DIR
# cp ../../../webpack-configs/no-uglify-no-source-map.config.js ./no-uglify-no-source-map.config.js

cp -R $BASE_DIR $TEMP_DIR_PREFIX$TARGET_DIR
cp $WEBPACK_CONFIG_BASE$WEBPACK_CONFIG_FILE $TEMP_DIR_PREFIX$TARGET_DIR$WEBPACK_CONFIG_FILE