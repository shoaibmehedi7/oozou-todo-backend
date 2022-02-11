import { IsNotEmpty } from "class-validator";

export default class GetByIdRequest {

    @IsNotEmpty({ message: "Title Can't be Empty" })
    id: string;

}