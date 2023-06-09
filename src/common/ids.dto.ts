import { IsMongoId } from 'class-validator';

export class IdsDto {
  @IsMongoId({ each: true })
  ids: string[];
}
