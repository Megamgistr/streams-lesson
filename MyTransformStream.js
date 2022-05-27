const {Transform} = require('stream');
class MyTransformStream extends Transform {
	words;
	constructor(words, options) {
		super(options);
		this.words = words;
	}

	_transform(obj, encoding, callback) {
		const filteredKeys = Object.keys(obj).filter(e => this.words.indexOf(e) != -1);
		const filteredObj = filteredKeys.reduce((acc, e) => {
			acc[e] = obj[e];
			return acc;
		}, {});
		this.push(JSON.stringify(filteredObj));
		callback();
	};

}


const myStrim = new MyTransformStream(["phone", "email"], {objectMode: true});

myStrim.pipe(process.stdout);

myStrim.write({ name: 'Nikita', phone: '8822-11244',
               email: 'nikita@email.ru', id: 9942412 });
myStrim.end();