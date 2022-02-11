import { SubTask } from './../../entities/SubTask';
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(SubTask)
export class SubTaskRepository extends Repository<SubTask>{

}
