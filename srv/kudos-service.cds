using kudos from '../db/data-model';

service KudosService {
    @readonly
    entity Employees as
        select from kudos.employee {
            *,
            count(
                emp_kudos.kudos_to.ID
            ) as total_kudos : Integer
        }
        group by
            ID,
            name,
            image,
            designation,
            email,
            contact,
            location;

    entity Kudos     as projection on kudos.kudos;
    entity Team      as projection on kudos.team_members;
}
