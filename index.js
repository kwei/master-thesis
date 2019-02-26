// 2019/02/24 github-kwei #wireless sensing by WiFi signal with UAVs to detect the indoor situation.
// set up by config function. (collecting_time, WiFi_SSID, sampling_rate)
// new the behaviors object with the default behaviors you setted in.
// new the wifi scanner object with wifi ssid.
// call collection function and wifi scanner object is the arg.
// call faltten function to calculate average rssi.
// mapping.
// run KNN algorithm.
// mapping confusion matrix.

require('dotenv').config();
// sampling_rate = process.env.SAMPLING_RATE
// collecting_time = process.env.COLLECTING_TIME
// WiFi_SSID = process.env.WIFI_SSID

const defualt_behavior = ["empty", "presense"];

const loop_module = require('./module/loop_module.js');
const flatten_module = require('./module/flatten_module.js');
const form_confusion_matrix_module = require('./module/form_confusion_matrix_module.js');
const map_module = require('./module/map_module.js');

const Behaviors = require('./model/behaviors.js');
const AccessModel = require('./model/accessModel.js');

const wifi_scanner_controller = require('./controller/wifi_scanner_controller.js');
const output_controller = require('./controller/output_controller.js');

const KNN = require('./machine_learning/KNN_algorithm.js');

class Director{
	constructor(rx_height, behavior_number){
		this.rx_height = rx_height;
		this.behavior_number = behavior_number;
	}

	proccess(this){
		const behavior = new Behaviors(defualt_behavior);
		// const accessModel = new AccessModel(this.behavior_number, this.rx_height);
		// const wifi_scanner = new wifi_scanner_controller();

		// const loop = new loop_module(behavior, wifi_scanner);
		// loop.executing()
		// 	.then((result) => {
		// 		accessModel.newModel(result);
		// 		return result;
		// 	})
		// 	.then((result) => {
		// 		const distribution = new map_module(result);
		// 		distribution.map();
		// 		return result;
		// 	})
		// 	.then((result) => {
		// 		const average = new flatten_module(result);
		// 		average.show();
		// 		return result;
		// 	})
		// 	.then((result) => {
		// 		accessModel.getModel((data_sheet) => {
		// 			const knn = new KNN();
		// 			knn.learning(data_sheet, (final_result) => {
		// 				return final_result;
		// 			});
		// 		});
		// 	})
		// 	.then((final_result) => {
		// 		const confusion_matrix = new form_confusion_matrix_module(final_result);
		// 		confusion_matrix.show();
		// 		return result;
		// 	})
		// 	.catch((err) => {
		// 		console.log(new Error(err));
		// 	});
	}
}

// test
const d = new Director(0.5, 1);
d.process();
// test