import { } from 'jasmine';
import { defer as observableDefer } from 'rxjs';

import { ClientsService } from './clients.service';
import { Client } from '../models/client';

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
let clientsService: ClientsService;
let client1: Client;
let client2: Client;

describe('ClientsService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    clientsService = new ClientsService(httpClientSpy as any);
    client1 = { id: '1' };
    client2 = { id: '2' };
  });

  it('index should return a list of clients', () => {
    const clients: Array<Client> = [client1, client2];

    httpClientSpy.get.and.returnValue(observableDefer(() => Promise.resolve(clients)));

    clientsService
      .index()
      .subscribe(
        res => expect(res).toEqual(clients, 'expected clients'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('details should return a client', () => {
    httpClientSpy.get.and.returnValue(observableDefer(() => Promise.resolve(client1)));

    clientsService
      .details('1')
      .subscribe(
        res => expect(res).toEqual(client1, 'expected client1'),
        fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('create should return a client', () => {
    httpClientSpy.post.and.returnValue(observableDefer(() => Promise.resolve(client1)));

    clientsService
      .create(client1)
      .subscribe(
        res => expect(res).toEqual(client1, 'expected client1'),
        fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('edit should not return anything', () => {
    httpClientSpy.put.and.returnValue(observableDefer(() => Promise.resolve()));

    clientsService
      .edit(client1)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('delete should not return anything', () => {
    httpClientSpy.delete.and.returnValue(observableDefer(() => Promise.resolve()));

    clientsService
      .delete(client1.id)
      .subscribe(
        res => expect(res).toBeUndefined('expected undefined'),
        fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
