import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './inputs/lessson.input';
import { AssignStudentsToLessonInput } from './inputs/assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOneBy({ id });
  }

  async deleteLesson(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    await this.lessonRepository.remove(lesson);
    return lesson;
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson({
    lessonId,
    studentIds,
  }: AssignStudentsToLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    this.lessonRepository.save(lesson);

    return lesson;
  }
}
