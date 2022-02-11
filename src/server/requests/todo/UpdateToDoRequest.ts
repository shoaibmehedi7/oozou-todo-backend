import { IsNotEmpty } from "class-validator";

export default class UpdateToDoRequest {

    @IsNotEmpty({ message: "Id Can't be Empty" })
    id: number;

    @IsNotEmpty({ message: "Status Can't be Empty" })
    status: string;

}