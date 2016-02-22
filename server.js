'use strict';

var ramlParser = require('raml-1-parser');

// Parse the RAML API specification
// Throw and error if there is a parse error, log a warning if there is a warning
var apiSpec = {};
try {
    apiSpec = ramlParser.loadApiSync('example.raml', {rejectOnErrors: true});

    if (apiSpec.errors().length == 0) {
        console.log('RAML parsing completed successfully')
    }
} catch (errors) {

    errors.parserErrors.forEach(function (err) {
        if (err.isWarning) {
            console.log('RAML Warning: ' + err.message);
        } else {
            console.log('RAML Error: ' + err.message);
        }
    });
}

// Create an object that maps the API spec types to properties for easier lookup and validation
var specTypes = {};
apiSpec.types().forEach(function(type) {
    specTypes[type.name()] = type;
});


// Try and validate an empty Foo
var fooValidationErrors =  specTypes.Foo.validateInstance({});

if (fooValidationErrors.length > 0) {
    console.log('Invalid Foo');
    fooValidationErrors.forEach(function (error) {
        console.log(' * ' + error);
    });
} else {
    console.log('Valid Foo');
}


// Try and validate an empty Bar
var barValidationErrors =  specTypes.Bar.validateInstance({});

if (barValidationErrors.length > 0) {
    console.log('Invalid Bar');
    fooValidationErrors.forEach(function (error) {
        console.log(' * ' + error);
    });
} else {
    console.log('Valid Bar');
}


// Try and validate an empty Baz
var bazValidationErrors =  specTypes.Baz.validateInstance({});

if (bazValidationErrors.length > 0) {
    console.log('Invalid Baz');
    fooValidationErrors.forEach(function (error) {
        console.log(' * ' + error);
    });
} else {
    console.log('Valid Baz');
}