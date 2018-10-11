import { } from 'jasmine';
import { defer } from 'rxjs/index';

import { ClientsService } from './clients.service';
import { Client } from '../models/client';

let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy; delete: jasmine.Spy };
let clientsService: ClientsService;
let client1: Client;
let client2: Client;

describe('ClientsService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    clientsService = new ClientsService(httpClientSpy as any);
    client1 = { Id: '1' };
    client2 = { Id: '2' };
  });

  it('index should return a list of clients', () => {
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve({
      Data: [client1, client2],
      Total: 2
    })));

    clientsService
      .index()
      .subscribe(
        res => expect(res).toEqual({
          data: [client1, client2],
          total: 2
        }, 'expected clients'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('details should return a client', () => {
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(client1)));

    clientsService
      .details('1')
      .subscribe(
        res => expect(res).toEqual(client1, 'expected client1'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('create should return a client', () => {
    httpClientSpy.post.and.returnValue(defer(() => Promise.resolve(client1)));

    clientsService
      .create(client1)
      .subscribe(
        res => expect(res).toEqual(client1, 'expected client1'),
        fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('edit should not return anything', () => {
    httpClientSpy.put.and.returnValue(defer(() => Promise.resolve()));

    clientsService
      .edit(client1)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('delete should not return anything', () => {
    httpClientSpy.delete.and.returnValue(defer(() => Promise.resolve()));

    clientsService
      .delete(client1.Id)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
