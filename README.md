# mui-custom-builder
Custom build delivery framework for Material-UI

The idea is as follows: Add a form page to [material-ui.com](www.material-ui.com) that provides the capability to produce a custom build. This form allows the developer to choose an *available* version of MUI and the components that are to be included in the custom build (could also choose all components). The form then sends an HTTP request to a node app running on heroku, where a custom build is performed using [webpack](https://webpack.github.io/). The build files are then available to the developer to download.


