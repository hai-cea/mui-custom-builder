// JS script to spam localhost to test app locally
// number of requests is passed in as argument
var exec = require('child_process').exec;
var sleep = require('sleep');

// var versionsCollection = ['0.13.0', '0.13.1', '0.13.2', '0.13.3', '0.13.4'];
var versionsCollection = ['0.13.0', '0.13.1', '0.13.3', '0.13.4'];
var componentsCollection = {
	'0.13.0' : ['AppBar','AppCanvas','Avatar','BeforeAfterWrapper','Card','CardActions','CardExpandable','CardHeader','CardMedia','CardText','CardTitle','Checkbox','CircularProgress','ClearFix','DatePicker','DatePickerDialog','Dialog','DropDownIcon','DropDownMenu','EnhancedButton','FlatButton','FloatingActionButton','FontIcon','GridList','GridTile','IconButton','IconMenu','LeftNav','LinearProgress','List','ListDivider','ListItem','Menu','MenuItem','Mixins','Overlay','Paper','RadioButton','RadioButtonGroup','RaisedButton','RefreshIndicator','Ripples','SelectField','Slider','SvgIcon','Styles','Snackbar','Tab','Tabs','Table','TableBody','TableFooter','TableHeader','TableHeaderColumn','TableRow','TableRowColumn','Toggle','ThemeWrapper','TimePicker','TextField','Toolbar','ToolbarGroup','ToolbarSeparator','ToolbarTitle','Tooltip'],
	'0.13.1' : ['AppBar','AppCanvas','Avatar','BeforeAfterWrapper','Card','CardActions','CardExpandable','CardHeader','CardMedia','CardText','CardTitle','Checkbox','CircularProgress','ClearFix','DatePicker','DatePickerDialog','Dialog','DropDownIcon','DropDownMenu','EnhancedButton','FlatButton','FloatingActionButton','FontIcon','GridList','GridTile','IconButton','IconMenu','LeftNav','LinearProgress','List','ListDivider','ListItem','Menu','MenuItem','Mixins','Overlay','Paper','RadioButton','RadioButtonGroup','RaisedButton','RefreshIndicator','Ripples','SelectField','Slider','SvgIcon','Styles','Snackbar','Tab','Tabs','Table','TableBody','TableFooter','TableHeader','TableHeaderColumn','TableRow','TableRowColumn','Toggle','ThemeWrapper','TimePicker','TextField','Toolbar','ToolbarGroup','ToolbarSeparator','ToolbarTitle','Tooltip'],
	// '0.13.2' : ['AppBar','AppCanvas','Avatar','Badge','BeforeAfterWrapper','Card','CardActions','CardExpandable','CardHeader','CardMedia','CardText','CardTitle','Checkbox','CircularProgress','ClearFix','DatePicker','DatePickerDialog','Dialog','DropDownIcon','DropDownMenu','EnhancedButton','FlatButton','FloatingActionButton','FontIcon','GridList','GridTile','IconButton','IconMenu','LeftNav','LinearProgress','List','ListDivider','ListItem','Menu','MenuItem','Mixins','Overlay','Paper','RadioButton','RadioButtonGroup','RaisedButton','RefreshIndicator','Ripples','SelectField','Slider','SvgIcon','Styles','Snackbar','Tab','Tabs','Table','TableBody','TableFooter','TableHeader','TableHeaderColumn','TableRow','TableRowColumn','Toggle','ThemeWrapper','TimePicker','TextField','Toolbar','ToolbarGroup','ToolbarSeparator','ToolbarTitle','Tooltip'],
	'0.13.3' : ['AppBar','AppCanvas','Avatar','Badge','BeforeAfterWrapper','Card','CardActions','CardExpandable','CardHeader','CardMedia','CardText','CardTitle','Checkbox','CircularProgress','ClearFix','DatePicker','DatePickerDialog','Dialog','DropDownIcon','DropDownMenu','EnhancedButton','FlatButton','FloatingActionButton','FontIcon','GridList','GridTile','IconButton','IconMenu','LeftNav','LinearProgress','List','ListDivider','ListItem','Menu','MenuItem','Mixins','Overlay','Paper','Popover','RadioButton','RadioButtonGroup','RaisedButton','RefreshIndicator','Ripples','SelectField','Slider','SvgIcon','Styles','Snackbar','Tab','Tabs','Table','TableBody','TableFooter','TableHeader','TableHeaderColumn','TableRow','TableRowColumn','Toggle','ThemeWrapper','TimePicker','TextField','Toolbar','ToolbarGroup','ToolbarSeparator','ToolbarTitle','Tooltip'],
	'0.13.4' : ['AppBar','AppCanvas','AutoComplete','Avatar','Badge','BeforeAfterWrapper','Card','CardActions','CardExpandable','CardHeader','CardMedia','CardText','CardTitle','Checkbox','CircularProgress','ClearFix','DatePicker','DatePickerDialog','Dialog','DropDownIcon','DropDownMenu','EnhancedButton','FlatButton','FloatingActionButton','FontIcon','GridList','GridTile','IconButton','IconMenu','LeftNav','LinearProgress','List','ListDivider','ListItem','Menu','MenuItem','Mixins','Overlay','Paper','Popover','RadioButton','RadioButtonGroup','RaisedButton','RefreshIndicator','Ripples','SelectField','SelectableContainerEnhance','Slider','SvgIcon','Styles','Snackbar','Tab','Tabs','Table','TableBody','TableFooter','TableHeader','TableHeaderColumn','TableRow','TableRowColumn','Toggle','ThemeWrapper','TimePicker','TextField','Toolbar','ToolbarGroup','ToolbarSeparator','ToolbarTitle','Tooltip']
};

//returns a random integer with min and max included
var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//returns a random version as string
var getRandomVersion = function() {
	return versionsCollection[getRandomNumber(0, 3)];
}

//returns array of strings
var getRandomComponentsForVersion = function(version) {
	var componentsToReturn = [];

	var numComponents = componentsCollection[version].length;
	var numComponentsToReturn = getRandomNumber(1, numComponents);

	//select numComponentsToReturn number of unique components
	var uniqueComponentHash = {};
	var numComponentsSelected = 0;

	while(numComponentsSelected < numComponentsToReturn) {
		//generate a random number between 0 and numComponents - 1 both inclusive
		var componentIndex = getRandomNumber(0, numComponents - 1);
		if(uniqueComponentHash[componentIndex] === undefined) {
			uniqueComponentHash[componentIndex] = true;
			componentsToReturn.push((componentsCollection[version])[componentIndex]);
			numComponentsSelected++;
		}
	}

	return componentsToReturn;
}

//var queries = [];
var i;
for(i = 1; i <= process.argv[2]; i++) {
	var version = getRandomVersion();
	var components = getRandomComponentsForVersion(version);

	var query = 'v=' + version + '\\\&components=' + components.join(',');
	var command = "open http://localhost:3000/?" + query;
	// console.log(command);
	exec(command, function (error, stdout, stderr) {
		console.log(error);
		console.log(stdout);
		console.log(stderr);
	});
	sleep.sleep(1);
}