import { Context, HttpRequest } from '@azure/functions';
import { sayHello } from '../src/handlers/hello'

const axios = require('axios')

jest.mock('axios')

describe('Hello handler', () => {
    let context: Context;
    let request: HttpRequest;
    let reqHeaders = {test: "value"}

    beforeEach(() => {
        context = ({ log: jest.fn() } as unknown) as Context;
        request = {method: 'GET', url: 'http://testurl', headers: reqHeaders, query: {name: 'Bob'}, params: {},};
    })
    it('returns a response when a name is provided ', async () => {
        await sayHello(context, request)
        expect(context.res.status).toEqual(200)
        expect(context.res.headers).toEqual(reqHeaders)
        expect(context.res.body).toEqual('Hello Bob')
    })
    it('returns a response when a name is provided ', async () => {
        request.query = {}
        await sayHello(context, request)
        expect(context.res.status).toEqual(400)
        expect(context.res.headers).toEqual(reqHeaders)
    })
})