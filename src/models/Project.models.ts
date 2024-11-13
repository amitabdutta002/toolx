import mongoose, { Document, Schema, Types } from "mongoose";
import { taskInterface, taskSchema } from "./Task.models";
import { milestoneInterface, milestoneSchema } from "./Milestone.models";

export interface projectInterface extends Document{
    name: string;
    description: string;
    owner: Types.ObjectId;
    team: Types.ObjectId[];
    milestones: Types.DocumentArray<milestoneInterface>;
    tasks: Types.DocumentArray<taskInterface>
    status: 'Active'| 'Completed'| 'Archived';
    startDate: Date;
    endDate?: Date
}

export const projectSchema:Schema<projectInterface> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    milestones: [milestoneSchema],
    tasks: [taskSchema],
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Archived'],
        default: 'Active'
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
    }

}, { timestamps: true })

export const Project = mongoose.models.Project as mongoose.Model<projectInterface> ||  mongoose.model<projectInterface>('Project', projectSchema)