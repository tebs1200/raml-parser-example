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
console.log('');

// Create an object that maps the API spec types to properties for easier lookup and validation
var specTypes = {};
apiSpec.types().forEach(function(type) {
    specTypes[type.name()] = type;
});

// Helper function to execute validations against types
function validateAgainstType(typeString, testObject) {

    console.log('Attempting to validate ' + JSON.stringify(testObject) + ' against ' + typeString + '...');

    var validationErrors =  specTypes[typeString].validateInstance(testObject);

    if (validationErrors.length > 0) {
        console.log('Invalid ' + typeString);
        validationErrors.forEach(function (error) {
            console.log(' * ' + error);
        });
    } else {
        console.log('Valid ' + typeString);
    }

    console.log('');
}

/* *** Union Examples *** */

// Try and validate a valid Foo
validateAgainstType('Foo', {
    label: 'test'
});

// Try and validate an empty Foo
validateAgainstType('Foo', {});


// Try and validate an empty Bar
validateAgainstType('Bar', {});


// Try and validate an empty Baz
validateAgainstType('Baz', {});


/* *** String Examples *** */

// Try and validate an invalid Id String
validateAgainstType('IdString', 'wrong');

validateAgainstType('IdString', { test: 'rubbish'});
