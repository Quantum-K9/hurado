import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { Script } from '../scripts/Script';
import { User } from '../users/User';

import { AllowedLanguages, Languages, TaskTypes } from './types';

// IMPORTANT: TO-DO still lacking validation

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  ownerId: number;

  @Column()
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  statement: string; //please check data type (for LaTeX)

  @Column({
    type: 'enum',
    enum: AllowedLanguages,
    default: AllowedLanguages.All,
  })
  allowedLanguages: AllowedLanguages;

  @Column({
    type: 'enum',
    enum: TaskTypes,
    default: TaskTypes.Batch,
  })
  taskType: TaskTypes;

  @Column()
  scoreMax: number;

  @ManyToOne(() => Script)
  checkerScript: Script;

  @Column()
  checkerScriptId: number;

  @Column({
    default: 2,
  })
  timeLimit: number;

  @Column({
    default: 1099511627776, // 1024GB
  })
  memoryLimit: number;

  @Column({
    default: 10,
  })
  compileTimeLimit: number;

  @Column({
    default: 1099511627776, // 1024GB
  })
  compileMemoryLimit: number;

  @Column({
    default: 32768, // 32KB
  })
  submissionSizeLimit: number;

  @ManyToOne(() => Script)
  validatorScript: Script;

  @Column()
  validatorScriptId: number;

  @Column({
    default: false,
  })
  isPublicInArchive: boolean; // not sure how to only give admins access to edit

  @Column({
    type: 'enum',
    enum: Languages,
    default: Languages.English,
  })
  language: Languages;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
