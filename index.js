
/* Load Express */
const express = require("express");
const app = express();
let bodyParser = require('body-parser');

let fs = require('fs');

let router = express.Router();
let path = __dirname + '/views/';

/* using port 8888 */
let port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

 /* Routing */

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});


/* index show all ########################################################*/
router.get("/",function(req,res){

	let html = fs.readFileSync(path+'index.html', 'utf8');
	let data = fs.readFileSync(path+'data.txt', 'utf8');

	let table = '<h3>Contact List</h3>';

	table += '<table class="table table-condensed">';
	table += '		<thead>';
	table += '			<tr>';
	table += '				<td><strong>#</strong></div>';
	table += '				<td><strong>Name</strong></div>';
	table += '				<td><strong>Email</strong></div>';
	table += '				<td><strong>Phone</strong></div>';
	table += '				<td><strong>Menu</strong></div>';
	table += '			<tr>';
	table += '		</thead>';
	
	let arr = data.split('\r\n');
	for(i=0;i<arr.length-1;i++) {
		let arr1 = arr[i].split('|');
		table += '<tr>';
		table += '	<td>'+(i+1)+'</td>';
		table += '	<td>'+arr1[0]+'</td>';
		table += '	<td>'+arr1[1]+'</td>';
		table += '	<td>'+arr1[2]+'</td>';
		table += '	<td><a class="btn btn-default" href="/detail/'+i+'">DETAIL</a>';
		table += '	<a class="btn btn-warning" href="/edit/'+i+'">EDIT</a>';
		table += '	<a class="btn btn-danger" href="/delete/'+i+'" onclick="if(confirm(\'Are you sure?\')) { return true; } else { return false; } ">DELETE</a></td>';
		table += '</tr>';
	}

	table += '</table>';

	html = html.replace('{{{Main}}}',table);
    res.send(html);

});




/* new form ######################################################## */
router.get("/new",function(req,res){
  res.sendFile(path + "new.html");
});





/* show detail ######################################################## */
router.get("/detail/:id",function(req,res){
	let id = req.params.id;
	let html = fs.readFileSync(path+'detail.html', 'utf8');
	let data = fs.readFileSync(path+'data.txt', 'utf8');
	
	let arr = data.split('\r');
	let arr1 = arr[id].split('|');

	html = html.replace('{{{Name}}}', arr1[0]);
	html = html.replace('{{{Email}}}', arr1[1]);
	html = html.replace('{{{Phone}}}', arr1[2]);

	html = html.replace('{{{ID}}}', id);
	html = html.replace('{{{ID}}}', id);

    res.send(html);

});


/* edit detail ######################################################## */
router.get("/edit/:id",function(req,res){
	let id = req.params.id;
	let html = fs.readFileSync(path+'edit.html', 'utf8');
	let data = fs.readFileSync(path+'data.txt', 'utf8');
	
	let arr = data.split('\r');
	let arr1 = arr[id].split('|');

	html = html.replace('{{{Name}}}', arr1[0]);
	html = html.replace('{{{Email}}}', arr1[1]);
	html = html.replace('{{{Phone}}}', arr1[2]);

	html = html.replace('{{{ID}}}', id);
	html = html.replace('{{{ID}}}', id);

    res.send(html);

});



/* delete contact ########################################################*/
router.get("/delete/:id",function(req,res){
	let id = req.params.id;

	let data = fs.readFileSync(path+'data.txt', 'utf8');
	
	let arr = data.split('\r\n');
	if(id!="") {
		data = '';
		for(i=0;i<arr.length-1;i++) {
			if(id!=i) {
				data += arr[i]+'\r\n';
			}
		}
	}

	fs.truncate(path+'data.txt', 0, function() {
		fs.writeFile(path+'data.txt', data, function(error) {
			if (error) {
				console.error("write error:  " + error.message);
			}
		});
	});

	res.writeHead(302, {
	  'Location': '/'
	});

	res.end();

});


/* save detail ######################################################## */
router.post("/", function (req, res) {
	let id = req.body.id
	let name = req.body.name
	let email = req.body.email
	let phone = req.body.phone

	let html = fs.readFileSync(path+'detail.html', 'utf8');
	let data = fs.readFileSync(path+'data.txt', 'utf8');
	
	let arr = data.split('\r\n');
	if(id!="") {
		data = '';
		for(i=0;i<arr.length-1;i++) {
			if(id==i) {
				data += name+'|'+email+'|'+phone+'\r\n';

			} else {
				data += arr[i]+'\r\n';
			}
		}
	} else {
		data += name+'|'+email+'|'+phone+'\r\n';
	}
	let arr1 = [];
	arr1[0] = name;
	arr1[1] = email;
	arr1[2] = phone;

	fs.truncate(path+'data.txt', 0, function() {
		fs.writeFile(path+'data.txt', data, function(error) {
			if (error) {
				console.error("write error:  " + error.message);
			}
		});
	});

	html = html.replace('{{{Name}}}', arr1[0]);
	html = html.replace('{{{Email}}}', arr1[1]);
	html = html.replace('{{{Phone}}}', arr1[2]);

	html = html.replace('{{{ID}}}', id);
	html = html.replace('{{{ID}}}', id);

    res.send(html);
});

/* End ######################################################## */



/* router*/
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

/* For requesting server to run the web server on a speficied port */

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

