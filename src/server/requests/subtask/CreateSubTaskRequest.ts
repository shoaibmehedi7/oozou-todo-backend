import { IsNotEmpty } from "class-validator";

export default class CreateSubTaskRequest {
    @IsNotEmpty({ message: "Title Can't be Empty" })
    title: string;

    @IsNotEmpty({ message: "Title Can't be Empty" })
    todo_id: string;
}