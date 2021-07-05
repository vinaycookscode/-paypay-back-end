import { IPerformance } from './../interfaces/IPerformance.interface';
import { Request } from "express";
import { PerformanceHelper } from "../helper/performance.helper";
import { IFunctionalResponse } from 'interfaces/IFunctional.response';

export class PerformanceBL {

	static addPerformance(req: Request, callback: any) {
        const perfData: IPerformance = {
            communication: req.body.communication,
            qualityOfWork: req.body.qualityOfWork,
            workConsistancy: req.body.workConsistancy,
            worksToFullPotantial: req.body.worksToFullPotantial,
            performanceOf: req.body.perforamnceOf,
            perforamnceGivenBy: req.body.perforamnceGivenBy,
        };
        PerformanceHelper.addPerformance(perfData, (response)=> {
            callback(response);
        });
	}


    static getPerformanceDetailsOfUser(req: Request, callback) {
        const performanceOf = req?.params?.performanceOf ? req?.params?.performanceOf: null;
        console.log('performance', performanceOf);
        PerformanceHelper.getUserPerformance(performanceOf, (perfResponse: IFunctionalResponse) => {
            callback(perfResponse);
        });
    }
}