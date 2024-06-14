import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('link')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  @Index({ unique: true })
  hash: Buffer;

  @Column({ type: 'text' })
  text: string;
}
