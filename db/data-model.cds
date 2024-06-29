namespace kudos;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity employee {
  key ID           : Integer;
      name         : String;
      image        : String;
      designation  : String;
      email        : String;
      contact      : String;
      location     : String;
      emp_kudos    : Association to many kudos
                       on emp_kudos.kudos_from = $self;
      team_members : Composition of many team_members
                       on team_members.team_emp = $self;
}

entity kudos : cuid, managed {
  kudos_from : Association to employee;
  kudos_to   : Association to employee;
  text       : String;
}

entity team_members : managed {
  key team_emp    : Association to employee;
  key team_member : Association to employee;
}
