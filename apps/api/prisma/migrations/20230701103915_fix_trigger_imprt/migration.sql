-- This is an empty migration.

DROP TRIGGER trg_afterinsert_importdetail ON import_detail;

CREATE OR REPLACE FUNCTION f_insert_import() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
  DECLARE insert_date DATE = date(NEW.date);
  DECLARE temp_report date := (select date
    FROM daily_report
    WHERE date = insert_date);
  begin
  IF (temp_report is null) THEN
    INSERT INTO daily_report (date, income, outcome, profit, month)
    VALUES (date(NEW.date), 0, NEW.cost, (0-NEW.total_cost), date_trunc('month', NEW.date::date));
  ELSE
    UPDATE daily_report
    SET
      outcome = outcome + NEW.cost,
      profit = profit - NEW.cost
    where date = insert_date;
  END IF;
  end;
  RETURN null;
END;
$$;

CREATE OR REPLACE TRIGGER trg_afterinsert_import
   AFTER INSERT
   ON importing
   FOR EACH ROW 
       EXECUTE PROCEDURE f_insert_import();

