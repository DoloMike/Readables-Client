// copied from react-key-index because the npm version has an annoying console.log

//var Hashids = require('hashids');
import Hashids from 'hashids'

export default (arr, label) => {
  var hashids = new Hashids();
	var x = parseInt(label, 10);
	var digits = [9, 9, x];
  var obj = {};

	var result = arr.map(function(arr, index) {
		digits.push(index);
		if (typeof arr === 'object') {
			var i = 0;
			Object.keys(arr).forEach(function(key) {
				var x = '';
				digits.push(i);
				x = '_' + key + 'Id';
				arr[x] = hashids.encode(digits);
				digits = digits.slice(0, 6);
				//console.log(digits);
				i++;
			});
			return arr;
		} else {
			obj = {
				value: arr,
				id: hashids.encode(digits)
			};
			digits = digits.slice(0, 5);
			return obj;
		}
		//matrix.push(digits);
	});
  return result;
};
