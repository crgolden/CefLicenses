import { } from 'jasmine';
import { defer } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BaseRelationshipService } from './base-relationship.service';
import { BaseRelationship } from '../relationships/base-relationship';

class RelationshipService extends BaseRelationshipService<BaseRelationship> {
  constructor(http: any, router: any) {
    super('', http, router);
  }
}

let httpBaseRelationshipSpy: any;
let relationshipService: RelationshipService;
let relationship1: BaseRelationship;

describe('BaseRelationshipService', () => {

  beforeEach(() => {
    httpBaseRelationshipSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    relationshipService = new RelationshipService(httpBaseRelationshipSpy as any, {} as any);
    relationship1 = {
      Model1Id: '1',
      Model1Name: 'Model 1',
      Model2Id: '2',
      Model2Name: 'Model 2'
    } as BaseRelationship;
  });

  it('index should return a list of relationships', () => {
    const relationship2 = {
      Model1Id: '1',
      Model1Name: 'Model 1',
      Model2Id: '2',
      Model2Name: 'Model 2'
    } as BaseRelationship;
    const relationships = {
      data: [relationship1, relationship2],
      total: 2
    } as GridDataResult;

    httpBaseRelationshipSpy.get.and.returnValue(defer(() => Promise.resolve({
      Data: [relationship1, relationship2],
      Total: 2
    })));

    relationshipService
      .index({})
      .subscribe((result: GridDataResult) => expect(result).toEqual(relationships, 'expected relationships'));

    expect(httpBaseRelationshipSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('details should return a relationship', () => {
    httpBaseRelationshipSpy.get.and.returnValue(defer(() => Promise.resolve(relationship1)));

    relationshipService
      .details(relationship1.Model1Id, relationship1.Model2Id)
      .subscribe((result: BaseRelationship) => expect(result).toEqual(relationship1, 'expected relationship1'));

    expect(httpBaseRelationshipSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('create should return a relationship', () => {
    httpBaseRelationshipSpy.post.and.returnValue(defer(() => Promise.resolve(relationship1)));

    relationshipService
      .create(relationship1)
      .subscribe((result: BaseRelationship) => expect(result).toEqual(relationship1, 'expected relationship1'));

    expect(httpBaseRelationshipSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('edit should not return anything', () => {
    httpBaseRelationshipSpy.put.and.returnValue(defer(() => Promise.resolve()));

    relationshipService
      .edit(relationship1)
      .subscribe((result: Object) => expect(result).toBeUndefined('expected undefined'));

    expect(httpBaseRelationshipSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('delete should not return anything', () => {
    httpBaseRelationshipSpy.delete.and.returnValue(defer(() => Promise.resolve()));

    relationshipService
      .delete(relationship1.Model1Id, relationship1.Model2Id)
      .subscribe((result: Object) => expect(result).toBeUndefined('expected undefined'));

    expect(httpBaseRelationshipSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
