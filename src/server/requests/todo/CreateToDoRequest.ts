import { IsNotEmpty } from "class-validator";

export default class CreateToDoRequest {

    @IsNotEmpty({ message: "Title Can't be Empty" })
    title: number;

}