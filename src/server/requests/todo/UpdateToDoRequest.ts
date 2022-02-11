import { IsNotEmpty } from "class-validator";

export default class UpdateToDoRequest {

    @IsNotEmpty({ message: "Id Can't be Empty" })
    id: string;

    @IsNotEmpty({ message: "Status Can't be Empty" })
    status: string;

}