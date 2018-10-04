import { } from 'jasmine';
import { defer } from 'rxjs';

import { FeaturesService } from './features.service';
import { Feature } from '../models/feature';

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
let featuresService: FeaturesService;
let feature1: Feature, feature2: Feature;

describe('featuresService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    featuresService = new FeaturesService(httpClientSpy as any);
    feature1 = { id: '1' };
    feature2 = { id: '2' };
  });

  it('index should return a list of features', async () => {
    const features: Array<Feature> = [feature1, feature2];

    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(features)));

    featuresService
      .index()
      .subscribe(
        res => expect(res).toEqual(features, 'expected features'),
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
      .delete(feature1.id)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
