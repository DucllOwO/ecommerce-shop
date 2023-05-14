-- This is an empty migration.


--Create function
CREATE OR REPLACE FUNCTION f_insert_receipt() 
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
    VALUES (date(NEW.date), NEW.cost, 0, NEW.cost, date_trunc('month', NEW.date::date));
  ELSE
    UPDATE daily_report
    SET
      income = income + NEW.cost,
      profit = profit + NEW.cost
    where date = insert_date;
  END IF;
  end;
  RETURN null;
END;
$$;

--Create trigger
CREATE OR REPLACE TRIGGER trg_afterinsert_receipt
   AFTER INSERT
   ON receipt
   FOR EACH ROW 
       EXECUTE PROCEDURE f_insert_receipt();


--Create function
CREATE OR REPLACE FUNCTION f_insert_importDetail() 
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

--Create trigger
CREATE OR REPLACE TRIGGER trg_afterinsert_importdetail
   AFTER INSERT
   ON import_detail
   FOR EACH ROW 
       EXECUTE PROCEDURE f_insert_importDetail();


--Create function
CREATE OR REPLACE FUNCTION f_before_insert_dailyReport() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
  DECLARE insert_month DATE = date_trunc('month',NEW.date::date);
  DECLARE temp_report date := (select date_trunc('month',date::date)
    FROM daily_report r
    WHERE date_trunc('month', r.date::date) = insert_month
    LIMIT 1);
  begin
  IF (temp_report is null) THEN
    INSERT INTO monthly_report (month, income, outcome, profit, year) VALUES (insert_month, NEW.income, NEW.outcome, NEW.profit,date_trunc('year', NEW.date::date));
  END IF;
  end;
  RETURN NEW;
END;
$$;

--Create trigger
CREATE OR REPLACE TRIGGER trg_beforeinsert_dailyreport
   BEFORE INSERT
   ON daily_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_before_insert_dailyReport();


--Create function
CREATE OR REPLACE FUNCTION f_after_insert_dailyReport() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    DECLARE insert_month DATE = date_trunc('month',NEW.date::date);
    begin
    UPDATE monthly_report
    SET
      income = (select sum(income)
                from daily_report r
                where date_trunc('month', r.date) = insert_month),
      outcome = (select sum(outcome)
                from daily_report r
                where date_trunc('month', r.date) = insert_month),
      profit = (select sum(profit)
                from daily_report r
                where date_trunc('month', r.date) = insert_month)
    where date_trunc('month', month) = insert_month;
    end;
  RETURN null;
END;
$$;


--Create trigger
CREATE OR REPLACE TRIGGER trg_afterinsert_dailyreport
   AFTER INSERT
   ON daily_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_after_insert_dailyReport();


--Create trigger
CREATE OR REPLACE FUNCTION f_before_insert_monthlyReport() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
  DECLARE insert_year DATE = date_trunc('year',NEW.month::date);
  DECLARE temp_report date := (select date_trunc('year',month::date)
    FROM monthly_report r
    WHERE date_trunc('year', r.month::date) = insert_year
    LIMIT 1);
  begin
  IF (temp_report is null) THEN
    INSERT INTO yearly_report (year, income, outcome, profit) VALUES (insert_year, NEW.income, NEW.outcome, NEW.profit);
  END IF;
  end;
  RETURN NEW;
END;
$$;

--Create trigger
CREATE OR REPLACE TRIGGER trg_beforeinsert_monthlyreport
   BEFORE INSERT
   ON monthly_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_before_insert_monthlyReport();



--Create function
CREATE OR REPLACE FUNCTION f_after_insert_monthlyReport() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    DECLARE insert_year DATE = date_trunc('year',NEW.month::date);
    begin
    UPDATE yearly_report
    SET
      income = (select sum(income)
                from monthly_report r
                where date_trunc('year', r.month) = insert_year),
      outcome = (select sum(outcome)
                from monthly_report r
                where date_trunc('year', r.month) = insert_year),
      profit = (select sum(profit)
                from monthly_report r
                where date_trunc('year', r.month) = insert_year)
    where date_trunc('year', year) = insert_year;
    END;
  RETURN null;
END;
$$;


--Create trigger
CREATE OR REPLACE TRIGGER trg_afterinsert_monthlyreport
   AFTER INSERT
   ON monthly_report
   FOR EACH ROW 
       EXECUTE PROCEDURE f_after_insert_monthlyReport();
