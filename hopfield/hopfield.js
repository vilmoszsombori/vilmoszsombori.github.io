// Parameters

var learnrate = 1
var running = 1

var M = 7; // no. of columns
var N = 9; // no. of rows

var x = new Array(M * N) // inputs / outputs (nodes)
var weight = new Array(M * N) // weight matrix

for (i = 0; i < M * N; i++) {
	x[i] = -1;
	weight[i] = new Array(M * N)
	for (j = 0; j < M * N; j++) {
		weight[i][j] = 0;
	}
}

function energy(place) { // place = 0 (input); place = 1 (output)
	var net = 0;
	for (i = 0; i < M * N; i++) {
		for (j = 0; j < M * N; j++) {
			net = net - weight[i][j] * x[j] * x[i];
		}
	}
	document.getElementById('energy' + place).value = net;
}

function activation(s) {
	return s < 0 ? -1 : 1;
}

function changeState(evt, row, col) {
	var ind = row * M + col;
	if (!evt.shiftKey) {
		document.getElementById("i" + row + "c" + col).classList.add('black')
		x[ind] = 1
	} else {
		document.getElementById("i" + row + "c" + col).classList.remove('black')
		x[ind] = -1
	}
	energy(0);
}

function showout() {
	var col = -1;
	var row = 0;
	for (i = 0; i < M * N; i++) {
		col++;
		if (col == M) {
			row++;
			col = 0
		}
		if (x[i] == 1) {
			document.getElementById("o" + row + "c" + col).classList.add('black')
		} else {
			document.getElementById("o" + row + "c" + col).classList.remove('black')			
		}
	}
}

function clearall() {
	var row = 0;
	var col = -1;
	for (i = 0; i < M * N; i++) {
		col++;
		if (col == M) {
			row++;
			col = 0
		}
		x[i] = -1;
		document.getElementById("i" + row + "c" + col).classList.remove('black')			
		document.getElementById("o" + row + "c" + col).classList.remove('black')			
	}
	energy(0);
	energy(1);
}

function clearin() {
	var row = 0;
	var col = -1;
	for (i = 0; i < M * N; i++) {
		col++;
		if (col == M) {
			row++;
			col = 0
		}
		x[i] = -1;
		document.getElementById("i" + row + "c" + col).classList.remove('black')			
	}
}

function resetall() {
	clearall()
	for (i = 0; i < M * N; i++) {
		for (j = 0; j < M * N; j++) {
			weight[i][j] = 0;
		}
	}
	energy(0);
	energy(1);

}

function learn() {
	for (i = 0; i < M * N; i++) {
		for (j = 0; j < M * N; j++) {
			weight[i][j] = weight[i][j] + learnrate * x[i] * x[j];
		}
	}
	showout();
	energy(1);
	clearin();
}

function synch() {
	for (col = 0; col < M; col++) {
		for (row = 0; row < N; row++) {
			var ind = row * M + col;

			var net = 0;
			for (j = 0; j < M * N; j++) {
				net = net + weight[ind][j] * x[j];
			}

			x[ind] = activation(net);
		}
	} //end loops
	showout();
	energy(1);
}

function asynch(n) {
	if (typeof n === 'undefined')
		var n = 1;
	showout();	
	for (i = 0; i < n; i++) {
		var row = Math.floor(N * Math.random());
		var col = Math.floor(M * Math.random());
		var ind = row * M + col;

		var net = 0;
		
		for (j = 0; j < M * N; j++) {
			net = net + weight[ind][j] * x[j];
		}
		
		x[ind] = activation(net);		
	}
	showout();
	energy(1);	
}

function buildTable(tableName, addaction) {
	var table = document.getElementById(tableName);			

    for (var j = 0; j < N; j++) {
        var row = document.createElement("tr");

        for (var i = 0; i < M; i++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", tableName.substring(0, 1) + j + "c" + i);
            if (typeof(addaction) === 'boolean' && addaction)
            	cell.setAttribute("onmouseover", "changeState(event," + j + "," + i + ")")
            row.appendChild(cell);
        }

        table.appendChild(row);
    }	
}

