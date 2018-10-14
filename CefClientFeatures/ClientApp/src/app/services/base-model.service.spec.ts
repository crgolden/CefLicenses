import { } from 'jasmine';
import { defer } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BaseModelService } from './base-model.service';
import { BaseModel } from '../models/base-model';

class ModelService extends BaseModelService<BaseModel> {
  constructor(http: any, router: any) {
    super('', http, router);
  }
}

let httpBaseModelSpy: any;
let modelService: ModelService;
let model1: BaseModel;

describe('BaseModelService', () => {

  beforeEach(() => {
    httpBaseModelSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    modelService = new ModelService(httpBaseModelSpy as any, {} as any);
    model1 = {
      Id: '1',
      Name: 'Model 1'
    } as BaseModel;
  });

  it('index should return a list of models', () => {
    const model2 = {
      Id: '2',
      Name: 'Model 2'
    } as BaseModel;
    const models = {
      data: [model1, model2],
      total: 2
    } as GridDataResult;

    httpBaseModelSpy.get.and.returnValue(defer(() => Promise.resolve({
      Data: [model1, model2],
      Total: 2
    })));

    modelService
      .index({})
      .subscribe((result: GridDataResult) => expect(result).toEqual(models, 'expected models'));

    expect(httpBaseModelSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('details should return a model', () => {
    httpBaseModelSpy.get.and.returnValue(defer(() => Promise.resolve(model1)));

    modelService
      .details(model1.Id)
      .subscribe((result: BaseModel) => expect(result).toEqual(model1, 'expected model1'));

    expect(httpBaseModelSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('create should return a model', () => {
    httpBaseModelSpy.post.and.returnValue(defer(() => Promise.resolve(model1)));

    modelService
      .create(model1)
      .subscribe((result: BaseModel) => expect(result).toEqual(model1, 'expected model1'));

    expect(httpBaseModelSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('edit should not return anything', () => {
    httpBaseModelSpy.put.and.returnValue(defer(() => Promise.resolve()));

    modelService
      .edit(model1)
      .subscribe((result: Object) => expect(result).toBeUndefined('expected undefined'));

    expect(httpBaseModelSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('delete should not return anything', () => {
    httpBaseModelSpy.delete.and.returnValue(defer(() => Promise.resolve()));

    modelService
      .delete(model1.Id)
      .subscribe((result: Object) => expect(result).toBeUndefined('expected undefined'));

    expect(httpBaseModelSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
