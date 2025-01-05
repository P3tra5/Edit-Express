const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    issueType: { type: String, required: true, enum: ["damage", "technical issue", "other"] },
    description: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
});

const IssueReport = mongoose.model('IssueReport', issueReportSchema);

module.exports = IssueReport;
