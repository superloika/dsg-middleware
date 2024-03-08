-- DSGPM TO PATCH 2024

-- new principals - dsgpm
-- S8201, S8329, S1593, S7105

-- == new cols ==
-- invoices_lines:
-- vat_percentage
-- customer_name
-- posting_date
-- sm_code
-- ext_doc_no
-- gendata

-- cm_lines
-- posting_date
-- vat_percentage
-- ext_doc_no
-- sm_code
-- gendata

-- principals_items, principals_customers, principals_salesmen, settings
-- main_vendor_code

-- principals
-- main_vendor_code
-- controller

-- users
-- main_vendor_codes

alter table invoices_lines
add column `vat_percentage` DECIMAL(3,1) NULL DEFAULT '0.0',
add column `customer_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `posting_date` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `sm_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `ext_doc_no` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `gendata` TEXT NULL DEFAULT NULL COMMENT 'Generated templated data - for back checking' COLLATE 'utf8mb4_unicode_ci'
;

alter table cm_lines
add column `posting_date` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `vat_percentage` DECIMAL(3,1) NULL DEFAULT '0.0',
add column `ext_doc_no` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `sm_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `gendata` TEXT NULL DEFAULT NULL COMMENT 'Generated templated data - for back checking' COLLATE 'utf8mb4_unicode_ci'
;

alter table principals_items
add column `main_vendor_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;

alter table principals_customers
add column `main_vendor_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;

alter table principals_salesmen
add column `main_vendor_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;

alter table settings
add column `main_vendor_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;

alter table principals
add column `main_vendor_code` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
add column `controller` VARCHAR(191) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;

alter table users
add column `main_vendor_codes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci'
;



-- ========================================= db overrides =========================================

-- upload new principals masterfile first
UPDATE principals_items JOIN principals ON principals.code=principals_items.principal_code
SET principals_items.main_vendor_code=principals.main_vendor_code
WHERE 1;
UPDATE principals_customers JOIN principals ON principals.code=principals_customers.principal_code
SET principals_customers.main_vendor_code=principals.main_vendor_code
WHERE 1;
UPDATE principals_salesmen JOIN principals ON principals.code=principals_salesmen.principal_code
SET principals_salesmen.main_vendor_code=principals.main_vendor_code
WHERE 1;
UPDATE settings JOIN principals ON principals.code=settings.principal_code
SET settings.main_vendor_code=principals.main_vendor_code
WHERE 1;


-- remove unnecessary masterfiles entries
DELETE FROM settings WHERE main_vendor_code='';
DELETE FROM principals_items WHERE main_vendor_code='';
DELETE FROM principals_customers WHERE main_vendor_code='';
DELETE FROM principals_salesmen WHERE main_vendor_code='';

-- patch heads to lines
UPDATE invoices_lines
JOIN invoices_headers
ON invoices_lines.doc_no = invoices_headers.doc_no
AND invoices_lines.customer_code = invoices_headers.customer_code
SET invoices_lines.customer_name = invoices_headers.customer_name,
invoices_lines.posting_date = invoices_headers.posting_date,
invoices_lines.sm_code = invoices_headers.sm_code
;

UPDATE cm_lines
JOIN invoices_headers
ON cm_lines.invoice_doc_no = invoices_headers.doc_no
AND cm_lines.customer_code = invoices_headers.customer_code
SET invoices_lines.sm_code = invoices_headers.sm_code
;

UPDATE cm_lines SET posting_date = shipment_date;

-- =================================================================================
-- invoices_lines table - override shipment and posting date format (in cm_lines too)
UPDATE invoices_lines
SET
shipment_date = DATE_FORMAT(STR_TO_DATE(shipment_date, '%m/%d/%y'), '%Y-%m-%d'),
posting_date = DATE_FORMAT(STR_TO_DATE(posting_date, '%m/%d/%y'), '%Y-%m-%d')
;

UPDATE cm_lines
SET
shipment_date = DATE_FORMAT(STR_TO_DATE(shipment_date, '%m/%d/%y'), '%Y-%m-%d'),
posting_date = DATE_FORMAT(STR_TO_DATE(posting_date, '%m/%d/%y'), '%Y-%m-%d')
;



-- change both of their format into DATE
ALTER TABLE invoices_lines
MODIFY shipment_date DATE,
MODIFY posting_date DATE
;

ALTER TABLE cm_lines
MODIFY shipment_date DATE,
MODIFY posting_date DATE
;
-- re-index
-- create new temp table copy for invoices_lines
-- add partitioning based on posting_date (monthly) - execute add partition raw query
-- copy data from orig invoices_lines into the new table with partitioning
INSERT INTO invoices_lines_ptn select * from invoices_lines;

-- ========== principal specific masterfiles ============
-- copy and execute create code of the updated table from local
-- principals_customers, principals_items, principals_salesmen
INSERT INTO principals_customers_ptn SELECT * FROM principals_customers;
INSERT INTO principals_items_ptn SELECT * FROM principals_items;
INSERT INTO principals_salesmen_ptn SELECT * FROM principals_salesmen;


-- ========== general masterfiles ===========
-- principal masterfiles TABLE
-- use composite indexing
-- copy and execute create code of the updated table from local
INSERT INTO principals_ptn select * from principals;

-- general_items TABLE
-- use composite indexing
-- copy and execute create code of the updated table from local
INSERT INTO general_items_ptn select * from general_items;

-- general_customers TABLE
-- use composite indexing
-- copy and execute create code of the updated table from local
INSERT INTO general_customers_ptn select * from general_customers;

-- new settings entries for DOLE
-- DocumentNumberPrefix
-- DocumentNumber_AI


