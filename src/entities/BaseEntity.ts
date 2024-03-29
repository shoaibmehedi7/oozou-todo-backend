import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;
}




