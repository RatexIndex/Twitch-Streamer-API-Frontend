function readTextFile(file)
{
	let result = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				result = allText;
            }
        }
    }
    rawFile.send(null);
	
	return result;
}

var cachedData = JSON.parse(readTextFile('/cache.json'));


let table = document.createElement("table");
var header = table.createTHead();

  
var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.id = 'Channel';
  cell.innerHTML = "CHANNEL";
  var cell = row.insertCell(0);
  cell.id = 'Status';
  cell.innerHTML = "STATUS";
  var cell = row.insertCell(0);
  cell.id = 'Viewer';
  cell.innerHTML = "VIEWER";
  var cell = row.insertCell(0);
  cell.id = 'Language';
  cell.innerHTML = "LANGUAGE";
  var cell = row.insertCell(0);
  cell.id = 'Description';
  cell.innerHTML = "DESCRIPTION";
  var cell = row.insertCell(0);
  cell.id = 'Name';
  cell.innerHTML = "NAME";


table.setAttribute("id", "table");
table.setAttribute("class", "table");

for (let i = 0; i < cachedData.length; i++) {
	let streamer = cachedData[i];
	
	// Daten pro Stream extrahieren
	let streamerName = streamer.streamerName;
	let streamTitle = streamer.title;
	let streamLanguage = streamer.language;
	let streamViewers = streamer.viewers;
	let is_live = streamer.is_live;
	let channelurl = streamer.channelURL;
	
	let row = document.createElement("tr");
	row.setAttribute("id", `streamer${i}`);
	
	let cell = document.createElement("td");
	cell.setAttribute("id", `name${i}`);
	cell.innerText = streamerName
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.setAttribute("id", `titel${i}`);
	cell.innerText = streamTitle;
	row.appendChild(cell);
	
	
	cell = document.createElement("td");
	cell.setAttribute("id", `language${i}`);
	cell.innerText = streamLanguage;
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.setAttribute("id", `viewers${i}`);
	cell.innerText = streamViewers;
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.setAttribute("id", `is_live${i}`);
	if (is_live === 1) {
	  cell.setAttribute("style", "color:#19a719");
	}
	if (is_live === 0) {
	  cell.setAttribute("style", "color:#a20e0e");
	}
	cell.innerText = (is_live === 1) ? "ONLINE": "OFFLINE";
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.setAttribute("id", `channelURL${i}`);
	cell.innerText = "View";
	row.appendChild(cell);
	
	table.appendChild(row);
}

var div = document.createElement("div");
div.id = 'container';
div.appendChild(table);
document.body.appendChild(div);