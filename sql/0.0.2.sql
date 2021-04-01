CREATE TABLE tinventory (
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT NOT NULL,
  item VARCHAR(40) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(game_id, item)
);

CREATE OR REPLACE VIEW vo_inventory AS (
  SELECT
  	ga.id,
  	ga.game_code,
  	ga.game_name,
  	inv.item,
  	inv.quantity
  FROM tgame ga
  RIGHT JOIN tinventory inv
  ON inv.game_id = ga.game_code
);