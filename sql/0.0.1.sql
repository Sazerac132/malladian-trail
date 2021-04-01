CREATE DATABASE IF NOT EXISTS malladrus;

CREATE TABLE tversion (
  version VARCHAR(16) NOT NULL
);

INSERT INTO tversion VALUES ('0.0.1');

CREATE TABLE tgame (
  id INT NOT NULL AUTO_INCREMENT,
  game_code INT NOT NULL UNIQUE,
  game_name VARCHAR(40) NOT NULL,
  codeword VARCHAR(24),
  PRIMARY KEY (id)
);

CREATE TABLE tcharacter (
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT NOT NULL,
  char_name VARCHAR(20) NOT NULL,
  char_desc VARCHAR(1000) NOT NULL,
  traits VARCHAR(200),
  other VARCHAR(200),
  pet INT NOT NULL,
  pet_name VARCHAR(20),
  active BOOLEAN,
  PRIMARY KEY (id)
);

CREATE OR REPLACE VIEW vo_party AS (
  SELECT
    ga.id AS 'game_id',
    ga.game_name,
    ga.game_code,
    ch.id AS 'char_id',
    ch.char_name,
    ch.char_desc,
    ch.traits,
    ch.other,
    ch.pet,
    ch.pet_name
  FROM tgame ga
  INNER JOIN tcharacter ch
  ON ch.game_id = ga.id
);

DELIMITER //

DROP FUNCTION IF EXISTS create_game//

CREATE FUNCTION create_game(n VARCHAR(40), cw VARCHAR(24))
RETURNS INT
READS SQL DATA

BEGIN

	SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));

	WHILE EXISTS (SELECT game_code FROM tgame WHERE game_code = @game_code) DO
		SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));
	END WHILE;
	
	INSERT INTO tgame (game_code, game_name, codeword) VALUES (@game_code, n, cw);
	RETURN @game_code;

END; //

DELIMITER ;
