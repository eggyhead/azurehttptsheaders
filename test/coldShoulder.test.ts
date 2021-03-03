import { Context, HttpRequest } from '@azure/functions';
import { coldShoulder } from '../src/handlers/coldShoulder'

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
        await coldShoulder(context, request)
        expect(context.res.status).toEqual(200)
        expect(context.res.headers).toEqual(reqHeaders)
        expect(context.res.body).toEqual('I can\'t say hello because I don\'t have a head, Bob!')
    })
    it('returns a response when a name is provided ', async () => {
        request.query = {}
        await coldShoulder(context, request)
        expect(context.res.status).toEqual(400)
        expect(context.res.headers).toEqual(reqHeaders)
    })
})