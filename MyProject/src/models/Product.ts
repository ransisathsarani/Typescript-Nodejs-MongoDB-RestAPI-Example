import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    name: String,
    code: String,
    description: String,
    imagePath: String
});

interface IProduct extends Document{
    name: String,
    code: String,
    description: String,
    imagePath: String

}

export default model<IProduct>('Product', schema);