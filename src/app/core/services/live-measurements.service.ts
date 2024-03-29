import {Injectable, OnDestroy} from '@angular/core';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {MqttService, IMqttMessage} from 'ngx-mqtt';
import {Area, Section, Measurement} from 'src/app/shared/models';
import {ModelAction} from '../../3d/school3d/ModelController/ModelAction';
import {SensortypeService} from './sensortype.service';

@Injectable()
export class LiveMeasurementService {

  /**
   *
   * @type {string}
   * @memberof LiveMeasurementService
   */
  public message: string;

  /**
   * Creates an instance of LiveMeasurementService.
   * @param {MqttService} mqttService
   * @param {SensortypeService} sensorType
   * @memberof LiveMeasurementService
   */
  constructor(private mqttService: MqttService, private sensorType: SensortypeService) {
  }

  /**
   * method for observing at a specif topic
   *
   * @param {string} topic
   * @returns
   * @memberof LiveMeasurementService
   */
  observe(topic: string) {
    return this.mqttService.observeRetained(topic);
  }

  /**
   * This method observes the co2 values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeCo2(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`htlleonding/${area.name}/${section.name}/${position}/co2`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        m.value = json.value;
        m.timestamp = json.timestamp;
        m.unit = 'PPM';
        // m.unit = json.unit;
        observer.next(m);
      });
    });
  }

  /**
   * This method observes the temperature values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeTemperature(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`${area.name}/${section.name}/temperature/state`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        m.value = json.value;
        m.timestamp = json.timestamp;
        m.unit = '°C';
        // m.unit = json.unit;
        observer.next(m);
      });
    });
  }

  /**
   * This method observes the humidity values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeHumidity(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`htlleonding/${area.name}/${section.name}/${position}/humidity`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        m.value = json.value;
        m.timestamp = json.timestamp;
        m.unit = '%';
        // m.unit = json.unit;
        observer.next(m);
      });
    });
  }

  /**
   * This method observes the brightness values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeBrightness(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`htlleonding/${area.name}/${section.name}/${position}/light`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        m.value = Math.round(json.value * 100) / 100;
        m.timestamp = json.timestamp;
        m.unit = 'LUX';
        // m.unit = json.unit;
        observer.next(m);
      });
    });
  }

  /**
   * This method observes the loudness values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeLoudness(area: Area, section: Section, position: string): Observable<Measurement> {
    if (section.name === '123') {
      return new Observable<Measurement>(observer => {
        this.observe(`htlleonding/${area.name}/${section.name}/${position}/db`).subscribe((message: IMqttMessage) => {
          const json = JSON.parse(message.payload.toString());
          const m: Measurement = new Measurement();
          m.value = Math.round(json.value * 100) / 100;
          m.timestamp = json.timestamp;
          m.unit = 'DB';
          // m.unit = json.unit;
          // console.log(json)
          observer.next(m);
        });
      });
    } else {
      return new Observable<Measurement>(observer => {
        this.observe(`htlleonding/${area.name}/${section.name}/${position}/db`).subscribe((message: IMqttMessage) => {
          const json = JSON.parse(message.payload.toString());
          const m: Measurement = new Measurement();
          m.value = Math.round(json.value * 100) / 100;
          m.timestamp = json.timestamp;
          m.unit = 'DB';
          // m.unit = json.unit;
          // console.log(json)
          observer.next(m);
        });
      });
    }
  }

  /**
   * This method observes the power values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observePower(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`htlleonding/${area.name}/${section.name}/${position}/Power`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        if (json.value > 700) {
          m.value = 'ON';
        } else {
          m.value = 'OFF';
        }
        m.timestamp = json.timestamp;
        // m.unit = 'W';
        // m.unit = json.unit;
        observer.next(m);
      });
    });
  }

  /**
   * This method observes the power values published on the broker
   *
   * @param {Area} area
   * @param {Section} section
   * @param {string} position
   * @returns {Observable<Measurement>}
   * @memberof LiveMeasurementService
   */
  observeWebcam(area: Area, section: Section, position: string): Observable<Measurement> {
    return new Observable<Measurement>(observer => {
      this.observe(`htlleonding/${area.name}/${section.name}/${position}/webcam`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const m: Measurement = new Measurement();
        m.value = json.value;
        m.timestamp = json.timestamp;
        m.unit = 'IP';
        observer.next(m);
      });
    });
  }

  observeSensor(area: Area, section: Section, position: string, sensor: string): Observable<Measurement> {
    let munit;
    this.sensorType.sensortypes.forEach(sensorType => {
      if (sensor === sensorType.name) {
        munit = sensorType.unit;
      }
    });

    return new Observable<Measurement>(observer => {
      this.observe(`${area.name}/${section.name}/${sensor}/state`)
        .subscribe((message: IMqttMessage) => {
          const json = JSON.parse(message.payload.toString());
          const m: Measurement = new Measurement();
          m.value = json.value;
          m.timestamp = json.timestamp;
          m.unit = munit;
          observer.next(m);
        });
    });
  }


  observeMqttRoom(): Observable<ModelAction> {
    return new Observable<ModelAction>(observer => {
      this.observe(`htlleodning/3dmodel/control/room`).subscribe((message: IMqttMessage) => {
        const json = JSON.parse(message.payload.toString());
        const action: ModelAction = new ModelAction();
        action.room = json.room;
        observer.next(action);
      });
    });
  }
}
