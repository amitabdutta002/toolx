import mongoose, {Document, Schema, Types} from "mongoose";
import { commentInterface, commentSchema } from "./Comment.models";

export interface taskInterface extends Document {
    title: string;
    description?: string;
    project: Types.ObjectId;
    assignedTo: Types.ObjectId[];
    status: 'Pending' | 'In Progress' | 'Completed' | 'Blocked' | 'On Hold';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    dueDate?: Date;
    completedAt?: Date;
    comments: Types.DocumentArray<commentInterface>;
    isArchive: boolean;
}

export const taskSchema: Schema<taskInterface> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Blocked', 'On Hold'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
    },
    completedAt: {
        type: Date
    },
    comments: [commentSchema],
    isArchive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export const Task = mongoose.models.Task as mongoose.Model<taskInterface> || mongoose.model<taskInterface>('Task', taskSchema)