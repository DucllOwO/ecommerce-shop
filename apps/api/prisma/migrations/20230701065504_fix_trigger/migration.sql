-- This is an empty migration.

CREATE OR REPLACE TRIGGER trg_insert_orderdetail
   AFTER INSERT
   ON order_detail
   FOR EACH ROW 
       EXECUTE PROCEDURE f_insert_orderdetail();