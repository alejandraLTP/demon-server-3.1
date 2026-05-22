import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { OutputFiles } from "./OutputFiles";
import { XRayFile } from "./XRayFile";
import { User } from "./User";

@Entity()
export class ImageEdits {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  Drawing: string = "";

  @Column({ type: "text", nullable: true })
  Comment: string = "";

  @Column({ type: "text", nullable: true })
  Brightness: string = "";

  @Column({ type: "text", nullable: true })
  Contrast: string = "";

  @Column({ type: "text", nullable: true })
  Saturation: string = "";

  @Column({ type: "text", nullable: true })
  Invert: string = "";

  @Column({ type: "text", nullable: true })
  Sepia: string = "";

  @Column({ type: "text", nullable: true })
  HueRotate: string = "";
  @Column({ type: "text", nullable: true })
  specialFilter: string = "";

  //Relacion con OutputFiles
  @ManyToOne(() => OutputFiles, (outputFiles) => outputFiles.imageEdits)
  @JoinColumn({ name: "outputFiles_id" })
  outputFiles?: OutputFiles;
  //Relacion con XRayFile
  @ManyToOne(() => XRayFile, (xRayFile) => xRayFile.imageEdits)
  @JoinColumn({ name: "xRayFile_id" })
  xRayFile?: XRayFile;
}
