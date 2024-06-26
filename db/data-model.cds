namespace kudos;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity employee {
  key ID          : Integer;
      name        : String;
      image       : String;
      designation : String;
      email       : String;
      contact     : String;
      location    : String;
      emp_kudos   : Association to many kudos
                      on ID = emp_kudos.kudos_to.ID;
}

entity kudos : cuid, managed {
  kudos_from : Association to employee;
  kudos_to   : Association to employee;
  text       : String;
}
