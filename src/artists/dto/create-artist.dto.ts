import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    stageName: string;
    
    @IsEmail()
    email: string;

    @IsEnum(['ARTIST', 'BROADCASTER', 'PARTNER', 'PROVIDER', 'PUBLIC'], {
        'message': 'Valid profile is required'
    })
    profile: 'ARTIST' | 'BROADCASTER' | 'PARTNER' | 'PROVIDER' | 'PUBLIC';
}
