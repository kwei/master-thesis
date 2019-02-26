# master-thesis
Human indoor behaviors detection by exploiting wireless sensing through WiFi signal.
### **專案目標**

藉由 WiFi-Signal RSSI 來識別室內人的個數、行為，甚至是行為的更精確分析。

### **專案流程**

1. 根據不同行為模式來蒐集無線網路訊號強度數值(WiFi-Signal-RSSI)。
2. 進行多次蒐集(不同高度依序蒐集)。
3. 計算無線網路訊號強度數值的平均值。
4. 根據無線網路訊號強度數值製作時間分布圖。
5. 藉由 KNN 機器學習來分析分布圖的特徵並分類。
6. 整理成混淆矩陣並分析判斷準確度。

```javascript
// 2019/02/26 github-kwei #Human indoor behaviors detection by exploiting wireless sensing through WiFi signal.
// set up config. (collecting_time, WiFi_SSID, sampling_rate)
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
```

### **檔案結構**

* index.js

* controller
  a. wifi_scanner_controller.js
  b. output_controller.js

* model
  a. class accessModel (getModel、 saveModel、deletModel、changeModel、newModel)

  SSID.csv

  | height (公尺) | behavior | RSSI array (dBm) | average (dBm) |
  | :-----------: | :------: | :--------------: | :-----------: |
  |   a meters    | A (有人) |     x_1 dBm      |   x_1' dBm    |
  |   a meters    | B (沒人) |     y_1 dBm      |   y_1' dBm    |
  |   b meters    | A (有人) |     x_2 dBm      |   x_2' dBm    |
  |   b meters    | B (沒人) |     y_2 dBm      |   y_2' dBm    |
  |   c meters    | A (有人) |     x_3 dBm      |   x_3' dBm    |
  |   c meters    | B (沒人) |     y_3 dBm      |   y_3' dBm    |

* module

  a. loop_module.js

  b. collect_module.js

  c. flatten_module.js

  d. map_module.js

  e. form_confusion_matrix_module.js

* machine_learning
  a. KNN_algorithm.js

* config.env
![設定檔案圖](/pic/設定檔.png)
![檔案架構圖](/pic/檔案結構.png)

### **代辦事項**

- [x] Readme.md
- [x] 建立檔案結構
- [x] index.js 規劃流程
- [x] config.env 內容
- [ ] model 模型
- [ ] 自定義函式庫(包含測試)
- [ ] controllers(包含測試)
- [ ] KNN 演算法
- [ ] 整合並完成
