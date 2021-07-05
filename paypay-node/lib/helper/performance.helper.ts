import { IPerformance } from './../interfaces/IPerformance.interface';
import { IFunctionalResponse } from '../interfaces/IFunctional.response';
import Performance from '../models/performance.models';
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
const ObjectId = require('mongodb').ObjectID;

let userInternalResponse: IFunctionalResponse = {
    errors: null,
    data: null,
    status: false,
    msg: ''
};
export class PerformanceHelper {
    static addPerformance(perfData: IPerformance, callback: any) {
        let _perfObject = new Performance(perfData);
        _perfObject.save((err) => {
            if (err) {
                userInternalResponse.errors = err;
                userInternalResponse.status = false;
                userInternalResponse.data = [];
            } else {
                userInternalResponse.status = true;
                userInternalResponse.errors = null;
                userInternalResponse.data = [_perfObject];
            }
            callback(userInternalResponse);
        });
    }

    static getUserPerformance(performanceId: string, callback) {
        Performance.find().populate('performanceOf').exec( (perfError, perfDetails: any)=> { 
            if (!perfError) {
                userInternalResponse.errors = null;
                userInternalResponse.status = true;
                let currentUserPerformanceDetails: any = [];
                console.log('Details ', perfDetails);
                if (performanceId && perfDetails.length > 0) {
                    currentUserPerformanceDetails = perfDetails.filter( (currentPerformance: any) => {
                        return mongoose.Types.ObjectId(performanceId).equals(currentPerformance?.performanceOf?._id);
                    });
                    console.log('Details ', currentUserPerformanceDetails);
                } else {
                    currentUserPerformanceDetails = perfDetails;
                }
                userInternalResponse.data = currentUserPerformanceDetails;
            } else {
                userInternalResponse.errors = perfError;
                userInternalResponse.status = false;
                userInternalResponse.data = [];
            }
            callback(userInternalResponse);
        });
    }
}