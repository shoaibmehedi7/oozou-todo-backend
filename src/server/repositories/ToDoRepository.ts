import {EntityRepository, Repository} from "typeorm";
import { ToDo } from "../../entities/ToDo";

@EntityRepository(ToDo)
export class ToDoRepository extends Repository<ToDo>{

}
