import mongoose, { Document, Schema, Types } from "mongoose";

export interface commentInterface extends Document{
    content: string,
    author: Types.ObjectId;
    editedAt: Date;
    isDeleted: boolean
}

export const commentSchema: Schema<commentInterface> = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    editedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }) 

export const Comment = mongoose.models.Comment as mongoose.Model<commentInterface> || mongoose.model<commentInterface>('Comment', commentSchema)