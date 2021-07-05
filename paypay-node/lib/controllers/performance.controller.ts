import { Request, Response} from 'express'
import { HTTPResponse } from '../helper/final-response';
import { PerformanceBL } from '../BL/performance.bl';
export class PerformanceController {

	static addPerformance(req: Request, res: Response) {
		PerformanceBL.addPerformance(req, (blResponse) => {
			if (blResponse?.status)  {
				HTTPResponse.successResponse(res, blResponse);
			} else {
				HTTPResponse.failureResponse(res, blResponse);
			}
		});
	}

	static getPerformance(req: Request, res: Response) {
		PerformanceBL.getPerformanceDetailsOfUser(req, (blResponse) => {
			if (blResponse?.status)  {
				HTTPResponse.successResponse(res, blResponse);
			} else {
				HTTPResponse.failureResponse(res, blResponse);
			}
		});
	}
}