import mongoose, { Schema, Document, Types } from "mongoose";

export interface milestoneInterface extends Document{
    name: string;
    description?:string;
    project: Types.ObjectId,
    startDate?: Date;
    endDate?: Date
    status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold',
    task: Types.ObjectId[],
}

export const milestoneSchema: Schema<milestoneInterface> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
        default: 'Not Started'
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]

}, { timestamps: true })