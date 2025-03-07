import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            console.log({ errors });

            const messages = errors.map(err =>
                `${err.property} - ${Object.values(err.constraints).join(', ')}`
            );
            console.log({ messages });

            console.log({ value })


            throw new ValidationException(messages)
        }

        return value;
    }
}