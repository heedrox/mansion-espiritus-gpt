import { fetch, Request, Response } from 'undici';

global.fetch = fetch;
global.Request = Request;
global.Response = Response; 