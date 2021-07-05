import { PerformanceController } from '../controllers/performance.controller';
import {Application, Request, Response} from 'express'
export class PerformanceRoutes  {
	
	public static _route(_app: Application) {
		
		_app.post('/api/perf/', (req: Request, resp: Response) => {
			PerformanceController.addPerformance(req, resp);
		});
		_app.get('/api/perf/:performanceOf?', (req: Request, resp: Response) => {
			PerformanceController.getPerformance(req, resp);
		});
	}
}
