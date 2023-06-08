import { IsMongoId } from 'class-validator';

class IdDto {
  @IsMongoId()
  id: string;
}

export default IdDto;
