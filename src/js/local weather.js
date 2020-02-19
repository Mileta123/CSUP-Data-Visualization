var tempForConverting;
var isCelsOrFahr = true;

window.addEventListener("load", event => {
	getUdgWeatherInfo(3);
	getUdgWeatherInfo(4);
});

$("#convertBtnC").click(function() {
	let temp = document.getElementById("myTemp");
	if (isCelsOrFahr) return;
	isCelsOrFahr = !isCelsOrFahr;
	let numTemp = ((tempForConverting - 32) / 1.8).toFixed(2);
	tempForConverting = numTemp;
	temp.innerHTML = "Temp: " + numTemp + " &#8451;";
});

$("#convertBtnF").click(function() {
	let temp = document.getElementById("myTemp");
	if (!isCelsOrFahr) return;
	isCelsOrFahr = !isCelsOrFahr;
	let numTemp = (tempForConverting * (9 / 5) + 32).toFixed(2);
	tempForConverting = numTemp;
	temp.innerHTML = "Temp: " + numTemp + " &#x2109;";
});

function encodeFormData(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
}

function getUdgWeatherInfo(nodeId) {
	let dateString = getDateNow();
	const data = {
		node_id: nodeId,
		start_date: dateString
	};
	fetch(
		"http://213.149.113.86:8000/api/measurement_by_date/?" +
			encodeFormData(data),
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			console.log(nodeId);
			if (nodeId === 3) {
				setAirInfo(result);
			} else {
				setWindInfo(result);
			}
		})
		.catch(error => {
			console.error(
				"MISTAKE",
				error
			);
		});
}

function getDateNow() {
	let temp = new Date().toLocaleString().split(",")[0];
	let result = "";
	result += temp.substr(2, 2);
	if (temp.substr(0, 2).indexOf("/")) {
		result += "/" + temp.substr(0, 1);
	} else {
		result += "/" + temp.substr(0, 2);
	}
	result += temp.substr(4, 5);
	return result;
}

function setAirInfo(result) {
	let index = result.data.length - 1;
	$("#humidity").append(
		" " + result.data[index]["sensor_2_val"].slice(0, -3) + "%"
	);
	$("#pressure").append(
		" " + result.data[index]["sensor_3_val"].slice(0, -3) + " Pa"
	);
	$("#myTemp").append(
		" " + result.data[index]["sensor_1_val"].slice(0, -3) + "&#8451;"
	);
	tempForConverting = parseFloat(
		result.data[index]["sensor_1_val"].slice(0, -3)
	);
}

function setWindInfo(result) {
	let index = result.data.length - 1;
	$("#avgwindspeed").append(
		" " + result.data[index]["sensor_1_val"].slice(0, -3) + " m/s"
	);
}
