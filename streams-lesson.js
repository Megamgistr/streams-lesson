/*Существует 4 вида стримов
Readable (request)
Writable (response)
Transform
Duplex
*/


const fs = require("fs");
const stream = fs.createReadStream(__filename);

/*Пример архивации и объеденение стримов 
const zlib = require("zlib");
const input = fs.createReadStream(__filename);
const gzip = zlib.createGzip();
const output = fs.createWriteStream(`${__filename}.gzip`)
input.pipe(gzip).pipe(output)
*/

// paused | flowing
// pused -> flowing 
// 1) stream.pipe()
stream.pipe(fs.createWriteStream(`${__filename}.copy`))
// 2) stream.on('data', (chunk - 64kb by default) => {});
stream.on('data', (chunk) => {console.log(chunk)})
// 3) stream.resume() - ручное урпавление стримом. stream.puse()
stream.resume()



/* fs.readFile vs fs.createReadStream
readFile - Скачивает весь файл в память
createReadStream - Читает файл чанками и не хранит его в памяти полностью
 */


//События стрима
/*
stream.on('data') - получения чанков с данными
stream.on('error') - поулчение ошибок (обязательно нужно обрабатывать т.к иначе завершиться все приложение)
stream.on('end') - сигнал об успешном завершении readable стрима
stream.on('finish') - сигнал об успешном завершении writable стрима
stream.on('close') - сигнал о завершении стрима (вызывается всегда)
stream.on('drain') - сигнал о том что стрим готов принимать новую порцию данных
*/


/*Дополнительные функции:
finished(stream, (err) => {})
pipeline(...streams, (err) => {})
 */
