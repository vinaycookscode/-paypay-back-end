import { Application, Request, Response } from 'express'
import { HTTPResponse } from '../helper/final-response';
import { IFunctionalResponse } from '../interfaces/IFunctional.response';

export class NoRouteFound {
	public static _noRouteFound( _app: Application) {
		_app.all('*', (req: Request, res: Response) => {
			const response: IFunctionalResponse = {
				status: false,
				data: [],
				errors: ['Sorry no route found'],
				msg: 'sorry no route found'
			}
			HTTPResponse.noRecordFound(res, response);
			// resp.status(400).send({ msg : 'sorry no route found'});
		});
	}
}