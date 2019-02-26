const {exec} = require('child_process');
// const collect_module = require('../module/collect_module.js');

const sampling_rate = process.env.SAMPLING_RATE;
const collecting_time = process.env.COLLECTING_TIME;
const WiFi_SSID = process.env.WIFI_SSID;

function parse(stdout, cb){
	stdout = stdout.split('\n');
	// console.log(stdout);
	var wifi_obj = {};
	var ssid_set = [];
	var rssi_set = [];
	stdout.forEach((line) => {
		if(line.indexOf('ESSID:') > 0){
			var ssid = line.split(':')[1];
			ssid = ssid.replace('"', "");
			ssid = ssid.replace('"', "");
			// console.log(ssid);
			ssid_set.push(ssid.trim());
		}else if(line.indexOf('Signal level=') > 0){
			var signal_level = line.split('=')[2];
			signal_level = signal_level.replace('dBm', "");
			// console.log(signal_level);
			rssi_set.push(signal_level.trim());
		}
	});
	var whichone = ssid_set.indexOf(/*WiFi_SSID*/"BUFFALO-C1E3C4");
	wifi_obj.ssid = /*WiFi_SSID*/"BUFFALO-C1E3C4";
	wifi_obj.rssi = rssi_set[whichone];
	cb(wifi_obj);
}

var timeStamp_start = Math.floor(Date.now() / 1000);
exec('sh scan.sh', (err, stdout, stderr) => {
	if(err){
		console.log(err);
	}else{
		var timeStamp_end = Math.floor(Date.now() / 1000);
		// console.log(stdout);
		parse(stdout, (wifi_obj) => {
			console.log("SSID:", wifi_obj.ssid);
			console.log("RSSI(dBm):", wifi_obj.rssi, "(dBm)");
		});
	}
	
	console.log("total time cost:", timeStamp_end - timeStamp_start, "(second)");
});

// class WiFi_Scanner{
// 	constructor(){
// 	}
// 	process(){
// 		CMD.run('wavemon', {onData: callback});
// 		CMD.run('^c');
// 	}
// }
// 
// //test
// const w = new WiFi_Scanner();
// w.process();
// //test
// 
// module.exports = {WiFi_Scanner};