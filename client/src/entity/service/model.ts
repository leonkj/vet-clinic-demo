import { store } from '../../store';
import { iService } from './interfaces';
import { getServices, getServicesArray } from './selectors';

export class ServiceModel {
  private service: iService;

  constructor(service: iService) {
    this.service = JSON.parse(JSON.stringify(service));
  }

  getName() {
    return this.service.name;
  }

  getId() {
    return this.service.id;
  }

  toJSON() {
    return this.service;
  }

  static findAll() {
    let state = store.getState();
    return getServicesArray(state).map(
      rawService => new ServiceModel(rawService)
    );
  }

  static findById(id: any) {
    let state = store.getState();
    let rawService = getServices(state)[id];
    if (rawService) {
      return new ServiceModel(rawService);
    }
  }

  static fromArray(services: iService[]) {
    return services.map(rawService => new ServiceModel(rawService));
  }
}
