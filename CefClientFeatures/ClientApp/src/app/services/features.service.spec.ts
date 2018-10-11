import { } from 'jasmine';
import { defer } from 'rxjs/index';

import { FeaturesService } from './features.service';
import { Feature } from '../models/feature';

let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy; delete: jasmine.Spy };
let featuresService: FeaturesService;
let feature1: Feature;
let feature2: Feature;

describe('FeaturesService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    featuresService = new FeaturesService(httpClientSpy as any);
    feature1 = { Id: '1' };
    feature2 = { Id: '2' };
  });

  it('index should return a list of features', () => {
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve({
      Data: [feature1, feature2],
      Total: 2
    })));

    featuresService
      .index()
      .subscribe(
        res => expect(res).toEqual({
          data: [feature1, feature2],
          total: 2
        }, 'expected features'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('details should return a feature', () => {
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(feature1)));

    featuresService
      .details('1')
      .subscribe(
        res => expect(res).toEqual(feature1, 'expected feature1'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('create should return a feature', () => {
    httpClientSpy.post.and.returnValue(defer(() => Promise.resolve(feature1)));

    featuresService
      .create(feature1)
      .subscribe(
        res => expect(res).toEqual(feature1, 'expected feature1'),
        fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('edit should not return anything', () => {
    httpClientSpy.put.and.returnValue(defer(() => Promise.resolve()));

    featuresService
      .edit(feature1)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('delete should not return anything', () => {
    httpClientSpy.delete.and.returnValue(defer(() => Promise.resolve()));

    featuresService
      .delete(feature1.Id)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
