import { Injectable , HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Alice Caeiro' },
        { id: 3, name: 'Who Knows' },
    ];

    getAllUsers() {
        return Promise.resolve(this.users);
    }

    getUser(id: number) {
        const user = this.users.find((user: any) => user.id === id);
        if (!user) {
            // throw new HttpException('User not found', 404);
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return Promise.resolve(user);
    }

    addUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
}
