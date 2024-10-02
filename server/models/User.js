const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    username;

    @Column()
    email;

    @Column()
    password;
}

module.exports = User;
