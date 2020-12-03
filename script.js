var term = document.querySelector('#field'),
	root = document.querySelector('#root'),
	win = document.querySelector('#window'),
	close = document.querySelector('#close'),
	full = document.querySelector('#full'),
	terminal = document.querySelector('#terminal'),
	path = 'Admin',
	numb = 0,
	com = document.querySelector('#command'),
	cm = '',
	check = true,
	commandHistory = [],
	historyIndex = 0,
	cms =   [{ "name": "help" , "function": help },
	         { "name": "start" , "function": start },
	         { "name": "cd" , "function": cd }],
	width = document.documentElement.clientWidth,
	height = document.documentElement.clientHeight;

function help () {
	upcommand('start [null args] -- start coding<br>cd [path] -- go to path');
}
function cd () {
	let e = cm.replace('cd ', '');
    path = path + '/' + e;
}
function start () {
	upcommand('ඞ Shhhh...');
}

// ↓ //  if (↓) {↓} else if (↑) {↑} else {↓}
// ↑ //  if (↑) {↓} else if (↓) {↑} else {↓}
// ↓ //  if (↓) {↓} else if (↑) {↑} else {↓}
// ↑ //  if (↑) {↓} else if (↓) {↑} else {↓}

close.onclick = function () {
	terminal.style.display = 'none';
};
full.onclick = function () {
	if (check) {
		terminal.style.width = width + 'px';
		terminal.style.height = height + 'px';
		terminal.style.left = '0px';
		terminal.style.top = '0px';
		check = false;
	} else {
		terminal.style.width = '90vw';
		terminal.style.height = '550px';
		check = true;
	}
};

function upcommand (command) {
	//command = command.replace(/\n/g, '<br>');
	term.insertAdjacentHTML('beforeEnd', command);
}
function enter () {
	var isValid = false;
	var args = cm.split(" ");
	var cmd = args[0];
	args.shift();
	for (var i = 0; i < cms.length; i++) {
		if (cmd === cms[i].name) {
			cms[i].function(args);
			isValid = true;
			break;
		} else {
			//
    }
	}
	if (cm == '') {
		upcommand("Please write command, or write HELP if you need help");
	} else if (!isValid) {
		upcommand("Sorry, command not found: " + cm);
	}
	document.querySelector('#cursor').remove();
	document.querySelector('#command').id = 'end';
	upcommand(`
		<div>
			<div id="query">` + path + ` ~ </div>
			<span id="command"></span>
			<div id="cursor" style="animation: 1.02s step-end 0s infinite normal none running blink-dark;"></div>
		</div>
	`);
	console.log(cm);
    commandHistory.push(cm);
	historyIndex = commandHistory.length;
	cm = '';
}

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
    console.log(keyCode);
    switch (keyCode) {
	  	case 13: {
			enter();
			break;
		}
		case 8: {
			cm = cm.slice(0, -1);
			document.querySelector('#command').innerHTML = cm;
			break;
		}
		case 17: {
			break;
		}
		case 20: {
			break;
		}
		case 16: {
			break;
		}
		case 18: {
			break;
    	}
    	case 38: {
    	    historyIndex--;
    	    if (historyIndex < 0) {
    	        historyIndex += 2;
		    }
			document.querySelector('#command').innerHTML = commandHistory[historyIndex];
			cm = commandHistory[historyIndex];
		    break;
		}
		case 40: {
			if (historyIndex >= commandHistory.length-1) {
				historyIndex -= 1;
			} else {
				historyIndex++;
			}
			document.querySelector('#command').innerHTML = commandHistory[historyIndex];
			cm = commandHistory[historyIndex];
			break;
		}
		default: {
			cm = cm + String.fromCharCode(keyCode).toLowerCase();
			document.querySelector('#command').innerHTML = cm;
		}
	}
}

terminal.onmousedown = function(event) {
	let shiftX = event.clientX - terminal.getBoundingClientRect().left;
	let shiftY = event.clientY - terminal.getBoundingClientRect().top;

	terminal.style.position = 'fixed';
	terminal.style.zIndex = 1000;

	moveAt(event.pageX, event.pageY);

	// переносит на координаты (pageX, pageY),
	// дополнительно учитывая изначальный сдвиг относительно указателя мыши
	function moveAt(pageX, pageY) {
		terminal.style.left = pageX - shiftX + 'px';
		terminal.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
	  moveAt(event.pageX, event.pageY);
	}

	// передвигаем при событии mousemove
	document.addEventListener('mousemove', onMouseMove);

	// отпустить, удалить ненужные обработчики
	terminal.onmouseup = function() {
	  document.removeEventListener('mousemove', onMouseMove);
	  terminal.onmouseup = null;
	};
};
  
terminal.ondragstart = function() {
	return false;
};