using kudos from '../db/data-model';

service KudosService {
    @readonly
    entity Employees as projection on kudos.employee;

    entity Kudos     as projection on kudos.kudos;
}
