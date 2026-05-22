import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity, JoinColumn, CreateDateColumn, OneToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { Entities, OperationAudits } from "../config/constants/enums";


@Entity()
export class Audits extends BaseEntity {

      @PrimaryGeneratedColumn()
      id: number=0;
    
      @Column({ type: 'enum', enum:Entities, default: Entities.users })
  tableName: string = "";  
    
      @Column('int')
      recordId?: number = 0;  
    
      @Column({ type: 'enum', enum:OperationAudits, default: OperationAudits.create, nullable: false })
      operation: string = "";
    
      @Column('jsonb', { nullable: true })
      changedData: any;  
    
      @ManyToOne(() => User, (user) => user.audits)
      @JoinColumn({name:"user_id"})
      users_id!: User;
    
      @CreateDateColumn()
      timestamp: Date = new Date();
      

}
    

  

