import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './stydent.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}