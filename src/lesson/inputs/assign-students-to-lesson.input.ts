import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];

  @IsUUID()
  @Field(() => ID)
  lessonId: string;
}
