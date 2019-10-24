var update = document.getElementById('update');

update.addEventListener('click', function () {
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
        	'name': 'Tahir Nasir',
        	'quote': 'I find your lack of faith disturbing.'
    	})
  	})
    .then(res => {
		if (res.ok) {
			console.log(`res is ok`);
			return res.json();
		}
	})
    .then(data => {
    	console.log(`data is  ${data}`);
    	window.location.reload(true);
  	});
});

var del = document.getElementById('delete');

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Tahir Nasir'
    })
  })
  .then(res => {
	  debugger;
    if (res.ok) return res.json();
  }).
  then(data => {
	  debugger;
    console.log(data);
    window.location.reload();
  });
});