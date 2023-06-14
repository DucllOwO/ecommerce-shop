-- This is an empty migration.

CREATE OR REPLACE FUNCTION f_insert_orderdetail() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
  DECLARE productID int = (select product_id
  from product_item
  where id = NEW.item_id);
  begin
    UPDATE product_item
    SET
      quantity = quantity - NEW.quantity
    where id = NEW.item_id;
    UPDATE product
    SET
      sold = sold + NEW.quantity
    WHERE id = productID;
  end;
  RETURN null;
END;
$$;

CREATE OR REPLACE TRIGGER trg_insert_orderdetail
   AFTER INSERT
   ON receipt
   FOR EACH ROW 
       EXECUTE PROCEDURE f_insert_orderdetail();

CREATE OR REPLACE TRIGGER trg_afterinsert_dailyreport
   AFTER INSERT OR UPDATE
   ON daily_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_after_insert_dailyReport();

CREATE OR REPLACE TRIGGER trg_afterinsert_monthlyreport
   AFTER INSERT OR UPDATE
   ON monthly_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_after_insert_monthlyReport();