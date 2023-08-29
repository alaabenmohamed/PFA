
CREATE DATABASE pfa;


DROP TABLE admine
CREATE TABLE admine( admine_id SERIAL PRIMARY KEY,
                                              nom VARCHAR(50),
                                                  mail VARCHAR(50),);


SElect *
from admine
DROP TABLE enseignant
CREATE TABLE enseignant( enseignant_id SERIAL PRIMARY KEY,
                                                      mdp VARCHAR(50),
                                                          mail VARCHAR(50),
                                                               nom VARCHAR(50),
                                                                   prenom VARCHAR(50),
                                                                          img VARCHAR(250),
                                                                              admine_id SERIAL REFERENCES admine (admine_id));


SElect *
from enseignant
DROP TABLE classe
cREATE TABLE classe(classe_id SERIAL PRIMARY KEY,nom VARCHAR(255), enseignant_id SERIAL REFERENCES enseignant (enseignant_id));


SElect *
from classe
DROP TABLE etudiant
CREATE TABLE etudiant(etudiant_id SERIAL PRIMARY KEY,
                                                 nom VARCHAR(255),
                                                      prenom VARCHAR(255),
                                                              mail VARCHAR(255),
                                                                     note VARCHAR(255),
                                                                          absence VARCHAR(255),
                                                                                  img VARCHAR(250),
                                                                                      classe_id SERIAL REFERENCES public.classe (classe_id));


SElect *
from etudiant