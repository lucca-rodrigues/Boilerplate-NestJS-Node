import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
