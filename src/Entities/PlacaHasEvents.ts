import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlackList } from "./BlackList";
import { Events } from "./Events";
import { Placas } from "./Placas";
import { Status } from "./Status";

@Entity()
export class PlacasHasEvents {
  @PrimaryGeneratedColumn()
  id: number = 0;

  //Placas
  @ManyToOne(() => Placas, (placas) => placas.placaHasEvents)
  @JoinColumn({ name: "placas_id" })
  placas!: Placas | null;

  //Events
  @ManyToOne(() => Events, (events) => events.placaHasEvents, {
    nullable: true,
  })
  @JoinColumn({ name: "events_id" })
  events!: Events;

  //BlackList
  @ManyToOne(() => BlackList, (blackList) => blackList.placaHasEvents, {
    nullable: true,
  })
  @JoinColumn({ name: "blackList_id" })
  blackList!: BlackList;

  //Status
  @ManyToOne(() => Status, (status) => status.placaHasEvents)
  @JoinColumn({ name: "status_id" })
  status!: Status;
}
