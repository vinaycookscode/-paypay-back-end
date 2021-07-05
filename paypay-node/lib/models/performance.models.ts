import { PERFORAMNCE_DATA_ENUM } from "../utils/constants/global.constants";
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const PerformanceSchema = new schema(
	{
		communication: { type: String, required: true, minlength: 2, maxlength: 100, enum: PERFORAMNCE_DATA_ENUM },
		qualityOfWork: { type: String, required: true, minlength: 2, maxlength: 100, enum: PERFORAMNCE_DATA_ENUM },
		workConsistancy: { type: String, required: true, minlength: 2, maxlength: 100, enum: PERFORAMNCE_DATA_ENUM },
		worksToFullPotantial: { type: String, required: true, minlength: 2, maxlength: 100, enum: PERFORAMNCE_DATA_ENUM },
		performanceOf: { type: schema.Types.ObjectId, ref: 'User' },
		perforamnceGivenBy: { type: schema.Types.ObjectId, ref: 'User' },
	}
);

export default mongoose.model('Performance', PerformanceSchema);