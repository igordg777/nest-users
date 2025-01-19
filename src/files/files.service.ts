import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (error) {
            throw new HttpException("Произошла ошибка при записи файлов", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}


// Запись файлов в перспективе можно усвершенствовать, поработать с асинхронной записью,
// иначе при большом количестве зарегистрированных пользователей (от 100 тысяч) появятся задержки в работе с постами 


