import {MqttService} from 'ngx-mqtt';
import {HistoricalMeasurementService} from '../../core/services/historical-measurements.service';
import {Observable, of} from 'rxjs';
import {LiveMeasurementService} from '../../core/services/live-measurements.service';
import {Area, Section} from '../../shared/models';
import {ModelController} from './ModelController/modelController';
import {MeasurementTypeAndValue} from '../../modules/dashboard/components';
import {ModelAction} from './ModelController/ModelAction';

export class MqttInterface {
  static floorsMqtt = ['ug', 'eg', 'og', 'thirdfloor'];

  constructor(private mqttService: MqttService,
              private measurementService: HistoricalMeasurementService,
              private liveService: LiveMeasurementService) {
  }


  /**
   *Fetching all measurementTypes of the room with the live values
   *Returns a promise that resolves in true or false
   *
   * @memberof RoomMeasurementsComponent
   * @param selectedFloor
   * @param selectedRoom
   */
  async getMeasurementTypesOfRoom(selectedRoom: string, selectedFloor: string): Promise<Array<MeasurementTypeAndValue>> {
    // Necessary becuase the name of the 3d model and the mqtt topic is different
    const index = ModelController.instance.FLOORS.findIndex(value => value === selectedFloor);
    selectedFloor = MqttInterface.floorsMqtt[index];

    const a = new Area();
    a.name = selectedFloor;
    a.displayName = selectedFloor;

    const s = new Section();
    s.name = selectedRoom.toLowerCase();
    if (!a || !s) {
      return of(new Array<MeasurementTypeAndValue>()).toPromise();
    }

    s.sensors = [{name: 'temperature'}, {name: 'humidity'}, {name: 'noise'}, {name: 'pressure'}, {name: 'luminosity'}, {name: 'co2'} ];
    const sensorTypeAndMeasurementsArray = [];

    return of(s.sensors.map(async sensor => {
      try {
        const measurement = (await this.liveService.observeSensor(a, s, '', sensor.name));
        if (measurement === null) {
          return new Array<MeasurementTypeAndValue>();
        }
        sensorTypeAndMeasurementsArray.push({
          type: sensor.name, measurement: measurement
        });
      } catch (e) {
        return new Array<MeasurementTypeAndValue>();
      }
    })).toPromise().then(() => {
      return sensorTypeAndMeasurementsArray;
    });
  }


  async observeMqttRoom(): Promise<Observable<ModelAction>> {
    return this.liveService.observeMqttRoom();
  }
}
