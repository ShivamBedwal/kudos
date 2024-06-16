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
}

entity kudos : cuid, managed {
  kudos_from : Integer;
  kudos_to   : Integer;
}
