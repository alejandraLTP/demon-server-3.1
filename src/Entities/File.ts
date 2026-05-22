import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string = "";

  @Column({ type: "text", nullable: false })
  fileName: string = "";

  @Column({ type: "text", nullable: false })
  filePath: string = "";

  @Column({ type: "text", nullable: false })
  aduana: string = "";

  @Column({ type: "text", nullable: false })
  region: string = "";

  @Column({ type: "text", nullable: false })
  area: string = "";

  @Column({ type: "text", nullable: false })
  seccion: string = "";

  // vpn no se persiste porque no viene en el payload de upload
  // y la tabla actual no cuenta con esta columna.
  vpn?: string;

  @Column({ type: "text", nullable: false })
  company: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();
}