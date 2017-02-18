xlsxj = require("xlsx-to-json");

xlsxj({
  input: __dirname + '/simple.xlsx',
  output: __dirname + '/test.json'
}, function(err, result) {
  if(err) {
    console.error(err);
  }else {
    console.log(result);
  }

});
