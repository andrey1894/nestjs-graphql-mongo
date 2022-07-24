import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
