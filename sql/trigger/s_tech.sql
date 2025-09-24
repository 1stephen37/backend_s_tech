-- Table Definition
CREATE TABLE "public"."brands"
(
    "id_brand" SERIAL,
    "name"     varchar NOT NULL,
    "logo"     text,
    "status"   int2 DEFAULT 1,
    PRIMARY KEY ("id_brand")
);

CREATE TABLE "public"."products"
(
    "id_product" SERIAL,
    "name"       text NOT NULL,
    "sale_off"   int4 DEFAULT 0,
    "views"      int8 DEFAULT 0,
    "status"     int2 DEFAULT 1,
    "id_brand"   int8,
    "created_at" date DEFAULT now(),
    "updated_at" date DEFAULT now(),
    CONSTRAINT "products_id_brand_fkey" FOREIGN KEY ("id_brand") REFERENCES "public"."brands" ("id_brand"),
    PRIMARY KEY ("id_product")
);

-- Indices
CREATE INDEX name ON public.products USING btree (name);


CREATE TABLE "public"."users"
(
    "id_user"    SERIAL,
    "name"       varchar NOT NULL,
    "password"   varchar DEFAULT 'NULL'::character varying,
    "email"      varchar,
    "address"    varchar,
    "phone"      bpchar(10),
    "image"      varchar,
    "role"       int2    DEFAULT 0,
    "created_at" date    DEFAULT now(),
    "updated_at" date    DEFAULT now(),
    PRIMARY KEY ("id_user")
);

-- Table Definition
CREATE TABLE "public"."deliveries"
(
    "id_delivery" SERIAL,
    "name"        varchar NOT NULL,
    "price"       int4    NOT NULL,
    "speed"       varchar NOT NULL,
    "status"      int2 DEFAULT 1,
    "created_at"  time DEFAULT now(),
    "updated_at"  time DEFAULT now(),
    PRIMARY KEY ("id_delivery")
);

-- Table Definition
CREATE TABLE "public"."gallery"
(
    "id_gallery" SERIAL,
    "url"        text,
    "is_primary" bool DEFAULT false,
    "id_product" int8 NOT NULL,
    CONSTRAINT "gallery_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product"),
    PRIMARY KEY ("id_gallery")
);

-- Table Definition
CREATE TABLE "public"."options"
(
    "id_option"  SERIAL,
    "id_product" int8    NOT NULL,
    "color"      varchar NOT NULL,
    "price"      int8    NOT NULL,
    "quantity"   int8    NOT NULL,
    "memory"     varchar NOT NULL,
    "is_basic"   bool DEFAULT false,
    "id_gallery" int8,
    CONSTRAINT "options_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product") ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT "options_id_gallery_fkey" FOREIGN KEY ("id_gallery") REFERENCES "public"."gallery" ("id_gallery"),
    PRIMARY KEY ("id_option")
);


CREATE TABLE "public"."orders"
(
    "id_order"         SERIAL,
    "id_delivery"      int8,
    "id_user"          int8,
    "voucher_code"     varchar DEFAULT '""'::character varying,
    "email"            varchar NOT NULL,
    "phone"            varchar NOT NULL,
    "name"             varchar NOT NULL,
    "address"          text    NOT NULL,
    "status"           int2    DEFAULT 0,
    "origin_total"     int8,
    "total"            int8,
    "receiver_name"    varchar,
    "receiver_address" varchar,
    "distance"         float4  NOT NULL,
    "ship_fee"         int8,
    "created_at"       date    DEFAULT now(),
    "updated_at"       date    DEFAULT now(),
    "payment_method"   varchar DEFAULT 'cod'::character varying,
    CONSTRAINT "orders_id_delivery_fkey" FOREIGN KEY ("id_delivery") REFERENCES "public"."deliveries" ("id_delivery"),
    CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."users" ("id_user"),
    PRIMARY KEY ("id_order")
);

CREATE TABLE "public"."order_details"
(
    "id_order_detail" SERIAL,
    "id_order"        int8 NOT NULL,
    "id_product"      int8 NOT NULL,
    "origin_price"    int8,
    "sale_price"      int8,
    "memory"          varchar,
    "color"           varchar,
    "quantity"        int2,
    CONSTRAINT "order_details_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product"),
    CONSTRAINT "order_details_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "public"."orders" ("id_order"),
    PRIMARY KEY ("id_order_detail")
);

CREATE TABLE "public"."specification_category"
(
    "id_specification_category" SERIAL,
    "id_product"                int8,
    "name"                      varchar,
    CONSTRAINT "specification_category_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product"),
    PRIMARY KEY ("id_specification_category")
);

CREATE TABLE "public"."product_details"
(
    "id_product_detail"         SERIAL,
    "id_specification_category" int8,
    "name"                      varchar,
    "value"                     varchar,
    CONSTRAINT "product_details_id_specification_category_fkey" FOREIGN KEY ("id_specification_category") REFERENCES "public"."specification_category" ("id_specification_category"),
    PRIMARY KEY ("id_product_detail")
);


CREATE TABLE "public"."reviews"
(
    "id_review"  SERIAL,
    "id_reply"   int4 NULL,
    "id_user"    int4,
    "id_product" int4,
    "content"    varchar(255) NOT NULL,
    "created_at" date DEFAULT now(),
    "updated_at" date DEFAULT now(),
    CONSTRAINT "reviews_id_reply_fkey" FOREIGN KEY ("id_reply") REFERENCES "public"."reviews" ("id_review"),
    CONSTRAINT "reviews_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."users" ("id_user"),
    CONSTRAINT "reviews_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product"),
    PRIMARY KEY ("id_review")
);

-- Table Definition
CREATE TABLE "public"."shop"
(
    "id_shop" SERIAL,
    "name"    varchar,
    "address" text,
    "phone"   varchar(10),
    "status"  int2    DEFAULT 1,
    "email"   varchar DEFAULT ''::character varying,
    PRIMARY KEY ("id_shop")
);

-- Table Definition
CREATE TABLE "public"."vouchers"
(
    "id_voucher"   SERIAL,
    "code"         varchar,
    "discount"     int2,
    "max_discount" int4,
    "min_amount"   int4,
    "is_percent"   bool DEFAULT false,
    "expired"      bool DEFAULT false,
    "end_date"     date,
    "created_at"   date DEFAULT now(),
    "updated_at"   date DEFAULT now(),
    PRIMARY KEY ("id_voucher")
);

CREATE TABLE "public"."banners"
(
    "id_banner"   SERIAL,
    "id_product"  int8 NOT NULL,
    "slogan"      varchar,
    "image"       varchar,
    "description" text,
    "status"      int2 DEFAULT 1,
    "created_at"  date DEFAULT now(),
    "updated_at"  date DEFAULT now(),
    CONSTRAINT "banners_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "public"."products" ("id_product")
);

INSERT INTO "public"."brands" ("id_brand", "name", "logo", "status")
VALUES (2, 'samsung', 'samsungnew-logo-220x48-1.png', 1);
INSERT INTO "public"."brands" ("id_brand", "name", "logo", "status")
VALUES (1, 'apple', 'logo-iphone-220x48.png', 1);
INSERT INTO "public"."brands" ("id_brand", "name", "logo", "status")
VALUES (3, 'xiaomi', 'logo-xiaomi-220x48-5.png', 1);
INSERT INTO "public"."brands" ("id_brand", "name", "logo", "status")
VALUES (4, 'oppo', 'OPPO42--logob_5.jpg', 1),
       (5, 'vivo', 'vivo-logo-220-220x48-3.png', 1),
       (6, 'realme', 'Realme42-logo-b_37.png', 1),
       (7, 'honor', 'logo-honor-220x48-2.png', 1),
       (8, 'techno', 'logo-tecno-big-220x48.png', 1);

INSERT INTO "public"."products" ("id_product", "name", "sale_off", "views", "status", "id_brand", "created_at",
                                 "updated_at")
VALUES (37, 'OPPO Reno8 T 4G', 15, 200, 1, 4, '2024-07-11', '2024-07-11');
INSERT INTO "public"."products" ("id_product", "name", "sale_off", "views", "status", "id_brand", "created_at",
                                 "updated_at")
VALUES (38, 'OPPO Reno 12 F 5G', 0, 3000, 1, 4, '2024-07-11', '2024-07-11');
INSERT INTO "public"."products" ("id_product", "name", "sale_off", "views", "status", "id_brand", "created_at",
                                 "updated_at")
VALUES (1, 'iPhone 11 | Chính hãng VN/A', 10, 500, 1, 1, '2024-07-05', '2024-07-05');
INSERT INTO "public"."products" ("id_product", "name", "sale_off", "views", "status", "id_brand", "created_at",
                                 "updated_at")
VALUES (2, 'iPhone 12 mini | Chính hãng VN/A', 15, 200, 1, 1, '2024-07-06', '2024-07-06'),
       (3, 'iPhone XR | Chính hãng VN/A', 0, 300, 1, 1, '2024-07-06', '2024-07-06'),
       (4, 'iPhone 13 Pro | Chính hãng VN/A', 10, 490, 1, 1, '2024-07-06', '2024-07-06'),
       (39, 'OPPO Reno12 5G', 0, 55000, 1, 4, '2024-07-11', '2024-07-11'),
       (6, 'iPhone 12 Pro I Chính hãng VN/A', 20, 100, 1, 1, '2024-07-06', '2024-07-06'),
       (7, 'iPhone 12 | Chính hãng VN/A', 27, 158, 1, 1, '2024-07-06', '2024-07-06'),
       (8, 'iPhone 12 Pro Max | Chính hãng VN/A', 0, 256, 1, 1, '2024-07-06', '2024-07-06'),
       (9, 'iPhone 13 | Chính hãng VN/A', 0, 658, 1, 1, '2024-07-06', '2024-07-06'),
       (10, 'iPhone 14 Pro | Chính hãng VN/A', 0, 850, 1, 1, '2024-07-06', '2024-07-06'),
       (40, 'OPPO Find X5 Pro', 10, 5800, 1, 4, '2024-07-11', '2024-07-11'),
       (13, 'Samsung Galaxy S23 FE 5G', 17, 50, 1, 2, '2024-07-06', '2024-07-06'),
       (11, 'Samsung Galaxy A05', 0, 89, 1, 2, '2024-07-06', '2024-07-06'),
       (14, 'Samsung Galaxy S24', 15, 500, 1, 2, '2024-07-07', '2024-07-07'),
       (15, 'Samsung Galaxy S24 Ultra', 10, 570, 1, 2, '2024-07-07', '2024-07-07'),
       (16, 'Samsung Galaxy Fold5', 10, 650, 1, 2, '2024-07-07', '2024-07-07'),
       (17, 'Samsung Galaxy S22', 0, 48, 1, 2, '2024-07-07', '2024-07-07'),
       (18, 'Samsung Galaxy M34 5G', 0, 58, 1, 2, '2024-07-07', '2024-07-07'),
       (19, 'Samsung Galaxy A55 5G', 0, 85, 1, 2, '2024-07-07', '2024-07-07'),
       (20, 'Samsung Galaxy S24 Plus', 10, 80, 1, 2, '2024-07-07', '2024-07-07'),
       (21, 'Xiaomi 11 Lite 5G NE', 0, 80, 1, 3, '2024-07-07', '2024-07-07'),
       (22, 'Xiaomi POCO X6 Pro 5G', 0, 847, 1, 3, '2024-07-07', '2024-07-07'),
       (23, 'Xiaomi 14 Ultra 5G', 0, 80, 1, 3, '2024-07-07', '2024-07-07'),
       (24, 'Xiaomi 13T Pro 5G', 10, 857, 1, 3, '2024-07-07', '2024-07-07'),
       (25, 'Xiaomi 13T', 15, 957, 1, 3, '2024-07-07', '2024-07-07'),
       (27, 'Xiaomi Redmi Note 12 Pro 4G', 15, 958, 1, 3, '2024-07-07', '2024-07-07'),
       (28, 'Xiaomi Redmi Note 12', 10, 585, 1, 3, '2024-07-07', '2024-07-07'),
       (31, 'OPPO Reno10 Pro Plus 5G', 10, 1580, 1, 4, '2024-07-09', '2024-07-09'),
       (32, 'OPPO A18', 0, 250, 1, 4, '2024-07-09', '2024-07-09'),
       (29, 'Xiaomi POCO M6', 0, 1500, 1, 3, '2024-07-09', '2024-07-09'),
       (30, 'Xiaomi Redmi Note 11 Pro Plus 5G', 0, 1200, 1, 3, '2024-07-09', '2024-07-09'),
       (33, 'OPPO Reno7 5G', 0, 2000, 1, 4, '2024-07-09', '2024-07-09'),
       (34, 'OPPO Reno 7 Pro', 0, 500, 1, 4, '2024-07-10', '2024-07-10'),
       (12, 'Samsung Galaxy Z Flip5', 30, 5000, 1, 2, '2024-07-06', '2024-07-06'),
       (5, 'iPhone 13 Pro Max | Chính hãng VN/A', 25, 3200, 1, 1, '2024-07-06', '2024-07-06'),
       (26, 'Xiaomi Redmi Note 12 Pro 5G', 20, 6900, 1, 3, '2024-07-07', '2024-07-07'),
       (35, 'OPPO A79 5G', 0, 1528, 1, 4, '2024-07-11', '2024-07-11'),
       (36, 'OPPO Reno10 5G', 10, 2500, 1, 4, '2024-07-11', '2024-07-11'),
       (42, 'Realme C55', 5, 250, 1, 6, '2024-07-11', '2024-07-11'),
       (41, 'Vivo V27e', 10, 158, 1, 5, '2024-07-11', '2024-07-11'),
       (44, 'Realme GT Neo 5 Lite', 0, 500, 1, 6, '2024-07-11', '2024-07-11'),
       (45, 'HONOR X7b', 10, 2584, 1, 7, '2024-07-11', '2024-07-11'),
       (46, 'TECNO SPARK 20PRO+', 10, 2580, 1, 8, '2024-07-11', '2024-07-11'),
       (47, 'Tecno Camon 30', 0, 5888, 1, 8, '2024-07-11', '2024-07-11'),
       (48, 'iPhone 15 Pro Max', 0, 5888, 1, 1, '2024-07-11', '2024-07-11'),
       (49, 'iPhone 13 mini', 0, 5888, 1, 1, '2024-07-11', '2024-07-11');

INSERT INTO "public"."specification_category" ("id_specification_category", "id_product", "name")
VALUES (1, 1, 'Màn hình');
INSERT INTO "public"."specification_category" ("id_specification_category", "id_product", "name")
VALUES (2, 1, 'Camera sau');
INSERT INTO "public"."specification_category" ("id_specification_category", "id_product", "name")
VALUES (3, 1, 'Camera trước');
INSERT INTO "public"."specification_category" ("id_specification_category", "id_product", "name")
VALUES (4, 1, 'Vi xử lý & đồ họa'),
       (5, 1, 'Giao tiếp & kết nối');


INSERT INTO "public"."users" ("id_user", "name", "password", "email", "address", "phone", "image", "role", "created_at",
                              "updated_at")
VALUES (3, 'hoàng thành thăng long', '$2b$10$llk644SqGj8Z7clL//hq9.tlbga.G4uvJXRsP1hV..rQg373EK8Dy',
        'longh97@gmail.com', 'Thành phố Hồ Chí Minh', '0338015134', NULL, 0, '2024-07-12', '2024-07-12');
INSERT INTO "public"."users" ("id_user", "name", "password", "email", "address", "phone", "image", "role", "created_at",
                              "updated_at")
VALUES (4, 'Huỳnh Tiến Long', '$2b$10$rsoSzMEeD4wTSWPOlwm1fOc4g28ju7Hnvu93F2C5D1YhKHBT/UDiO', 'huynhtienlong@gmail.com',
        '312321', '0338015137', NULL, 0, '2024-07-25', '2024-07-25');
INSERT INTO "public"."users" ("id_user", "name", "password", "email", "address", "phone", "image", "role", "created_at",
                              "updated_at")
VALUES (5, 'Trương Tấn Vinh', '$2b$10$G6bkkYWFnAvxshuB8kUS/.5/.MN89rHnirRnvmNckT3pBDjCgv9cm', 'truongtanvinh@gmail.com',
        '312321', '0338015133', NULL, 0, '2024-07-25', '2024-07-25');
INSERT INTO "public"."users" ("id_user", "name", "password", "email", "address", "phone", "image", "role", "created_at",
                              "updated_at")
VALUES (6, 'Json Server', '$2b$10$10BV6/PeIJh3n5z.onEZAOnEf/rx1QXMIXZM./EsFBKzZ39duWsMy', 'jsonserver@gmail.com',
        'phường tân chánh hiệp', '0338312312', NULL, 0, '2024-07-25', '2024-07-25'),
       (2, 'Nguyễn Admin', '$2b$10$llk644SqGj8Z7clL//hq9.tlbga.G4uvJXRsP1hV..rQg373EK8Dy', 'tienadmin@gmail.com',
        'Thành phố Hồ Chí Minh', '0338015135', NULL, 1, '2024-07-12', '2024-07-12'),
       (9, 'Nguyễn Văn Long', '$2b$10$llk644SqGj8Z7clL//hq9.tlbga.G4uvJXRsP1hV..rQg373EK8Dy', 'nvl@gmail.com',
        'Thành phố Hồ Chí Minh', '0338157592', NULL, 0, '2024-08-04', '2024-08-04'),
       (11, 'Nguyễn Văn A', '$2b$10$V5xbIHBzcS7lcUCcWOPW1O0Tdo6mOWisJxjU8TwDq8rrJns1INNCW', 'nguyenvana@gmail.com',
        'Thành phố Hồ Chí Minh', '0338152321', NULL, 0, '2024-08-06', '2024-08-06'),
       (12, 'Huỳnh Phước Long', '$2b$10$UE2ccCX4J12CEUHpa2D/f.DUj93rPWGxqhfM.i6.Ka/xUFrA1sKPi',
        'huynhphuoclong@gmail.com', 'Công viên phần mềm Quang Trung', '0338015135', NULL, 0, '2024-08-06',
        '2024-08-06'),
       (8, 'Nguyễn Tiến', '', 'ngamingyahoo@gmail.com', NULL, '0338157598',
        'https://lh3.googleusercontent.com/a/ACg8ocJ43nfhc50KJuYe0_TIfsPhb9mDWeZMbEJtOA8GKqbOhgVl2mU6=s96-c', 1,
        '2024-07-26', '2024-07-26');


INSERT INTO "public"."deliveries" ("id_delivery", "name", "price", "speed", "status", "created_at", "updated_at")
VALUES (1, 'Vietnam Post', 10000, 'chậm', 1, '03:45:06.279085', '03:45:06.279085');
INSERT INTO "public"."deliveries" ("id_delivery", "name", "price", "speed", "status", "created_at", "updated_at")
VALUES (2, 'GrabExpress', 12000, 'trung bình', 1, '03:45:55.317131', '03:45:55.317131');
INSERT INTO "public"."deliveries" ("id_delivery", "name", "price", "speed", "status", "created_at", "updated_at")
VALUES (4, 'J&T Express', 20000, 'hơi nhanh 1', 1, '03:46:42.236083', '01:27:12.626874');
INSERT INTO "public"."deliveries" ("id_delivery", "name", "price", "speed", "status", "created_at", "updated_at")
VALUES (3, 'Ninja Van', 18000, 'nhanh ', 1, '03:46:42.236083', '01:27:17.154449'),
       (8, 'test', 312312, 'test1321', 1, '01:52:58.432204', '01:53:03.695351');

INSERT INTO "public"."gallery" ("id_gallery", "url", "is_primary", "id_product")
VALUES (1, 'iphone-11.webp', 't', 1);
INSERT INTO "public"."gallery" ("id_gallery", "url", "is_primary", "id_product")
VALUES (2, 'iphone-12-mini_white.webp', 't', 2);
INSERT INTO "public"."gallery" ("id_gallery", "url", "is_primary", "id_product")
VALUES (3, '_0004_iphonexr-black-360_us-en-screen.webp', 't', 3);
INSERT INTO "public"."gallery" ("id_gallery", "url", "is_primary", "id_product")
VALUES (5, 'iphone13proxam1282_61_8_2_1_8.webp', 't', 4),
       (6, 'iphone-13-pro-max-128GB-vang.webp', 't', 5),
       (8, 'iphone12_64GB-green2_241.webp', 't', 7),
       (9, 'iphone-12-pro-max-128GB-Bac-3_223_1.webp', 't', 8),
       (10, 'iphone13-128GB-hongh_ng_4.webp', 't', 9),
       (11, 'iphone-14-pro-128GB-blackx_m_16.webp', 't', 10),
       (12, 'samsung-a05-trang-4GB-128Gb_1.webp', 't', 11),
       (13, 'samsung-z-lip5_green_4GB_128GB_1.webp', 't', 12),
       (14, 'samsung-galaxy-s23-fe-tim-8GB_128Gb_6_.webp', 't', 13),
       (15, 'galaxy-s24-tim-8GB-256GB_3.webp', 't', 14),
       (16, 'galaxy-s24-ultra-den-12GB-256GB-1_1_3.webp', 't', 15),
       (17, 'samsung-galaxy-z-fold-5-blue-12GB-256gb_1.webp', 't', 16),
       (18, 'sm-s901_galaxys22_front_phantomwhite-8GB-128GB_211122.webp', 't', 17),
       (20, 'samsung-m34-drakblue-8GB-128GB-cb_1.webp', 't', 18),
       (21, 'sm-a556_galaxy_a55_awesome_lilac-tim-8GB-128GB_ui_1.webp', 't', 19),
       (22, 'galaxy-s24-plus-vang-12GB-258GB_2.webp', 't', 20),
       (23, 'xiaomi-11-lite-5g-white-9GB-128GB-014_1_2.webp', 't', 21),
       (24, 'xiaomi-poco-x6-pro-5g-black-8GB-256GB-t_i_xu_ng_19__5_4.webp', 't', 22),
       (7, 'iphone-12-pro-max_3__9_4_dark_blue-12.png', 't', 6),
       (25, 'xiaomi-14-ultra-black-16GB-512GB-1.webp', 't', 23),
       (26, 'xiaomi-13t-pro-5g-black_-12GB-512GB3__1_1.webp', 't', 24),
       (27, 'xiaomi-13t-black-12GB-256GB_2_1.webp', 't', 25),
       (28, 'xiaomi-redmi-note-12-pro-5G-8GB-256GB-gtt7766_9__2.webp', 't', 26),
       (29, 'redmi-note-12-pro-4g-1-xanh-nhat-8GB-256GB_1.webp', 't', 27),
       (30, 'xiaomi-redmi-note-12-4GB-128GB-xam-rgt76878_1__2.webp', 't', 28),
       (31, 'poco-m6-den-6GB-128GB.webp', 't', 29),
       (32, 'xiaomi-11-pro-plus-5G-black-8GB-256GB-1.webp', 't', 30),
       (33, 'oppo-reno10-pro-plus-5G-12GB-256GB-yellow_2_.webp', 't', 31),
       (34, 'dien-thoai-oppo-a18-4gb-64gb-blue_1_.webp', 't', 32),
       (35, 'oppo-reno-7-5G-8GB-256GB-_1.webp', 't', 33),
       (36, 'oppo-reno7-pro-5g-starlight-black-12GB-128GB-back-front.webp', 't', 34),
       (37, 'oppo-a79-5G-8GB-256GB-tim.webp', 't', 35),
       (38, 'reno10_5g_-8GB-256GB_product_-_blue_1.webp', 't', 36),
       (39, 'oppo-reno8-t-4g-cam-yellow-8GB-256GB-4_1.webp', 't', 37),
       (40, 'oppo-reno12-f-cam-5G-8GB-256GB-1.webp', 't', 38),
       (41, 'dien-thoai-oppo-reno12-5g-trang-12GB-256GB-1.webp', 't', 39),
       (42, 'oppo-find-x5-pro-den-12GB-256GB_1.webp', 't', 40),
       (43, 'vivo-v27e-black-8GB-256GB-2.webp', 't', 41),
       (44, 'realme-c55-yellow-8GB-256GB_1_1.webp', 't', 42),
       (45, 'realme-gt-neo-5-lite-xam-8GB-128GB.png', 't', 44),
       (46, 'honor-x7b-blue-8GB-258GB.png', 't', 45),
       (47, 'tecno_spark_20_pro_plus_-8GB-256GB_tr_ng.webp', 't', 46),
       (48, 'techno-camon-30-black-8GB-256GB_2.png', 't', 47),
       (49, 'iphone-11-black-4GB-64GB_130.webp', 'f', 1),
       (50, 'iphone-11-back-4GB-64GB_130.webp', 'f', 1),
       (51, 'iphone-11-4GB-64GB-green--5_158.webp', 'f', 1),
       (52, 'iphone-11-red-4GB-128gb.webp', 'f', 1),
       (53, 'iphone-yellow-4GB-256GB1_253_2.webp', 'f', 1),
       (54, 'iphone15-pro-max-titan-den.webp', 'f', 48),
       (55, 'iphone-yellow-4GB-256GB1_253_2.webp', 'f', 49);

INSERT INTO "public"."options" ("id_option", "id_product", "color", "price", "quantity", "memory", "is_basic",
                                "id_gallery")
VALUES (13, 12, 'Xanh lá', 25990000, 500, '8GB/128GB', 't', 13);
INSERT INTO "public"."options" ("id_option", "id_product", "color", "price", "quantity", "memory", "is_basic",
                                "id_gallery")
VALUES (14, 13, 'Tím', 14890000, 500, '8GB/128GB', 't', 14);
INSERT INTO "public"."options" ("id_option", "id_product", "color", "price", "quantity", "memory", "is_basic",
                                "id_gallery")
VALUES (15, 14, 'Tím', 22990000, 500, '8GB/256GB', 't', 15);
INSERT INTO "public"."options" ("id_option", "id_product", "color", "price", "quantity", "memory", "is_basic",
                                "id_gallery")
VALUES (16, 15, 'Đen', 33990000, 500, '12GB/256GB', 't', 16),
       (17, 16, 'Xanh dương', 40990000, 500, '12GB/256GB', 't', 17),
       (18, 17, 'Trắng', 21990000, 500, '8GB/128GB', 't', 18),
       (19, 18, 'Xanh đậm', 7990000, 500, '8GB/128GB', 't', 20),
       (20, 19, 'TÍm', 9990000, 500, '8GB/128GB', 't', 21),
       (46, 42, 'Vàng', 5900000, 500, '8GB/256GB', 't', 44),
       (2, 2, 'Trắng', 14990000, 500, '64GB', 't', 2),
       (3, 3, 'Đen', 11990000, 500, '64GB', 't', 3),
       (21, 20, 'Vàng', 26990000, 500, '12GB/256GB', 't', 22),
       (22, 21, 'Trắng Swarovski', 9490000, 500, '8GB/128GB', 't', 23),
       (23, 22, 'Đen', 9990000, 500, '8GB/256GB', 't', 24),
       (24, 23, 'Đen', 29900000, 500, '16GB/512GB', 't', 25),
       (25, 24, 'Đen', 16990000, 500, '12GB/512GB', 't', 26),
       (26, 25, 'Đen', 12990000, 500, '12GB/256GB', 't', 27),
       (27, 26, 'Xanh dương', 9490000, 500, '8GB/256GB', 't', 28),
       (28, 27, 'Xanh dương nhạt', 7990000, 500, '8GB/256GB', 't', 29),
       (29, 28, 'Xám', 4990000, 500, '4GB/128GB', 't', 30),
       (42, 41, 'Đen', 8990000, 500, '8GB/256GB', 't', 43),
       (50, 44, 'Xám', 5720000, 500, '8GB/128GB', 't', 45),
       (51, 45, 'Xanh dương', 5290000, 500, '8GB/256GB', 't', 46),
       (30, 29, 'Đen', 4290000, 500, '6GB/128GB', 't', 31),
       (31, 30, 'Đen', 6000000, 500, '8GB/256GB', 't', 32),
       (32, 31, 'Xanh', 19900000, 500, '12GB/256GB', 't', 33),
       (33, 32, 'Xanh dương', 3290000, 500, '4GB/64GB', 't', 34),
       (34, 33, 'Xanh', 12990000, 500, '8GB/256GB', 't', 35),
       (35, 34, 'Đen', 10990000, 500, '12GB/256GB', 't', 36),
       (36, 35, 'Tím', 7490000, 500, '8GB/256GB', 't', 37),
       (37, 36, 'Xanh dương', 9290000, 500, '8GB/256GB', 't', 38),
       (38, 37, 'Vàng', 8490000, 500, '8GB/256GB', 't', 39),
       (39, 38, 'Cam', 9490000, 500, '8GB/256GB', 't', 40),
       (5, 4, 'Xám', 23990000, 500, '128GB', 't', 5),
       (6, 5, 'Vàng', 28900000, 500, '128GB', 't', 6),
       (7, 6, 'Xanh dương đậm', 26990000, 500, '128GB', 't', 7),
       (8, 7, 'Xanh lá', 15990000, 500, '64GB', 't', 8),
       (9, 8, 'Bạc', 28990000, 500, '128GB', 't', 9),
       (10, 9, 'Hồng', 18990000, 500, '128GB', 't', 10),
       (11, 10, 'Đen', 23590000, 500, '128GB', 't', 11),
       (12, 11, 'Bạc', 3000000, 500, '4GB/128GB', 't', 12),
       (40, 39, 'Bạc vũ trụ', 12990000, 500, '12GB/256GB', 't', 41),
       (41, 40, 'Đen', 19990000, 500, '12GB/256GB', 't', 42),
       (52, 46, 'Trắng', 5490000, 500, '8GB/256GB', 't', 47),
       (53, 47, 'Đen', 6490000, 500, '8GB/256GB', 't', 48),
       (1, 1, 'Trắng', 11990000, 500, '4GB/64GB', 't', 1),
       (54, 1, 'Đen', 11990000, 500, '4GB/64GB', 'f', 49),
       (56, 1, 'Xanh lá nhạt', 12800000, 500, '4GB/64GB', 'f', 51),
       (57, 1, 'Đỏ', 13990000, 500, '4GB/128GB', 'f', 52),
       (58, 1, 'Vàng', 19900000, 500, '4GB/256GB', 'f', 53),
       (55, 1, 'Bạc', 12400000, 0, '4GB/64GB', 'f', 50),
       (59, 48, 'Titan Đen', 26990000, 500, '4GB/64GB', 't', 54),
       (60, 49, 'Trắng', 11990000, 500, '4GB/64GB', 't', 55);

INSERT INTO "public"."orders" ("id_order", "id_delivery", "id_user", "voucher_code", "email", "phone", "name",
                               "address", "status", "origin_total", "total", "receiver_name", "receiver_address",
                               "distance", "ship_fee", "created_at", "updated_at", "payment_method")
VALUES (16, 1, 12, '""', 'huynhphuoclong@gmail.com', '0338157592', 'Huỳnh Phước Long', 'Công viên phần mềm Quang Trung',
        0, 21582000, 20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod');
INSERT INTO "public"."orders" ("id_order", "id_delivery", "id_user", "voucher_code", "email", "phone", "name",
                               "address", "status", "origin_total", "total", "receiver_name", "receiver_address",
                               "distance", "ship_fee", "created_at", "updated_at", "payment_method")
VALUES (15, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod');
INSERT INTO "public"."orders" ("id_order", "id_delivery", "id_user", "voucher_code", "email", "phone", "name",
                               "address", "status", "origin_total", "total", "receiver_name", "receiver_address",
                               "distance", "ship_fee", "created_at", "updated_at", "payment_method")
VALUES (14, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod');
INSERT INTO "public"."orders" ("id_order", "id_delivery", "id_user", "voucher_code", "email", "phone", "name",
                               "address", "status", "origin_total", "total", "receiver_name", "receiver_address",
                               "distance", "ship_fee", "created_at", "updated_at", "payment_method")
VALUES (11, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (9, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (4, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (2, 2, 9, '""', 'nvl@gmail.com', '0338157592', 'Nguyễn Văn Long', 'Thành phố Hồ Chí Minh', 0, 10791000, 10911000,
        'Công Tôn Toản', 'Bình Thạnh, TP.Hồ Chí Minh', 10, 120000, '2024-08-05', '2024-08-05', 'cod'),
       (1, 2, 8, '""', 'ngamingyahoo@gmail.com', '0338157598', 'Nguyễn Tiến', 'Thành phố Hồ Chí Minh', 0, 12533000,
        12653000, 'Hoàng Long', 'Công viên phần mềm Quang Trung', 10, 120000, '2024-08-05', '2024-08-05', 'cod'),
       (5, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (6, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (7, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (8, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (12, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (10, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (13, 1, 11, '""', 'nguyenvana@gmail.com', '0338152321', 'Nguyễn Văn A', 'Thành phố Hồ Chí Minh', 0, 21582000,
        20602000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (17, 1, 3, '""', 'longh97@gmail.com', '0338015134', 'hoàng thành thăng long', 'Thành phố Hồ Chí Minh', 0,
        11672700, 11189000, NULL, NULL, 10, 100000, '2024-08-06', '2024-08-06', 'cod'),
       (18, 2, 8, '""', 'ngamingyahoo@gmail.com', '0338157598', 'Nguyễn Tiến', 'Thành phố Hồ Chí Minh', 0, 17910000,
        17134000, NULL, NULL, 10, 120000, '2024-08-07', '2024-08-07', 'cod');


INSERT INTO "public"."order_details" ("id_order_detail", "id_order", "id_product", "origin_price", "sale_price",
                                      "memory", "color", "quantity")
VALUES (1, 1, 46, 5490000, 4941000, '8GB/256GB', 'Trắng', 1);
INSERT INTO "public"."order_details" ("id_order_detail", "id_order", "id_product", "origin_price", "sale_price",
                                      "memory", "color", "quantity")
VALUES (2, 1, 26, 9490000, 7592000, '8GB/256GB', 'Xanh dương', 1);
INSERT INTO "public"."order_details" ("id_order_detail", "id_order", "id_product", "origin_price", "sale_price",
                                      "memory", "color", "quantity")
VALUES (3, 2, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 1);
INSERT INTO "public"."order_details" ("id_order_detail", "id_order", "id_product", "origin_price", "sale_price",
                                      "memory", "color", "quantity")
VALUES (5, 4, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (6, 5, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (7, 6, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (8, 7, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (9, 8, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (10, 9, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (11, 10, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (12, 11, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (13, 12, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (14, 13, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (15, 14, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (16, 15, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (17, 16, 1, 11990000, 10791000, '4GB/64GB', 'Trắng', 2),
       (18, 17, 7, 15990000, 11672700, '64GB', 'Xanh lá', 1),
       (19, 18, 1, 19900000, 17910000, '4GB/256GB', 'Vàng', 1);


INSERT INTO "public"."product_details" ("id_product_detail", "id_specification_category", "name", "value")
VALUES (15, 5, 'Công nghệ NFC', 'Có');
INSERT INTO "public"."product_details" ("id_product_detail", "id_specification_category", "name", "value")
VALUES (16, 5, 'Thẻ SIM', 'Nano-SIM + eSIM');
INSERT INTO "public"."product_details" ("id_product_detail", "id_specification_category", "name", "value")
VALUES (17, 5, 'Hệ điều hành', 'iOS 13 hoặc cao hơn (Tùy vào phiên bản phát hành)');
INSERT INTO "public"."product_details" ("id_product_detail", "id_specification_category", "name", "value")
VALUES (18, 5, 'Hồng ngoại', 'Không'),
       (19, 5, 'Jack tai nghe 3.5', 'Không'),
       (20, 5, 'Hỗ trợ mạng', '4G'),
       (21, 5, 'Wi-Fi', '802.11ax Wi‑Fi 6 with 2x2 MIMO'),
       (26, 5, 'Bluetooth', '5.0'),
       (27, 5, 'GPS', 'GPS/GNSS'),
       (1, 1, 'Kích thước màn hình', '6.1 inches'),
       (2, 1, 'Công nghệ màn hình', 'IPS LCD'),
       (3, 1, 'Độ phân giải màn hình', '1792 x 828 pixel'),
       (4, 1, 'Tính năng màn hình', 'True-tone'),
       (5, 1, 'Tần số quét', '60Hz'),
       (6, 1, 'Kiểu màn hình', 'Tai thỏ'),
       (7, 2, 'Camera sau', 'Camera kép 12MP:
- Camera góc rộng: ƒ/1.8 aperture
- Camera siêu rộng: ƒ/2.4 aperture'),
       (8, 2, 'Quay video', 'Quay video 4K ở tốc độ 24 fps, 30 fps hoặc 60 fps'),
       (9, 2, 'Tính năng camera', 'Retina Flash
Nhãn dán (AR Stickers)
Ban đêm (Night Mode)
Chạm lấy nét
Góc rộng (Wide)
Góc siêu rộng (Ultrawide) HDR Nhận diện khuôn mặt
Quay chậm (Slow Motion)
Toàn cảnh (Panorama)
Trôi nhanh thời gian (Time L'),
       (10, 3, 'Camera trước', '12 MP, ƒ/2.2 aperture'),
       (11, 3, 'Quay video trước', '4K@24/30/60fps, 1080p@30/60/120fps, gyro-EIS'),
       (12, 4, 'Chipset', 'A13 Bionic'),
       (13, 4, 'Loại CPU', 'Hexa-core'),
       (14, 4, 'GPU', 'Apple GPU');


INSERT INTO "public"."reviews" ("id_review", "id_user", "id_product", "content", "created_at", "updated_at")
VALUES (1, 2, 1, 'Sản phẩm này thật sự rất tuyệt đấy !', '2024-07-12', '2024-07-12');
INSERT INTO "public"."reviews" ("id_review", "id_user", "id_product", "content", "created_at", "updated_at")
VALUES (2, 8, 1, 'Tôi rất thich sản phẩm này cũng như chất lượng dịch vụ tuyệt vời của Stech, các bạn nên mua nha.',
        '2024-08-04', '2024-08-04');
INSERT INTO "public"."reviews" ("id_review", "id_user", "id_reply", "id_product", "content", "created_at", "updated_at")
VALUES (3, 8, 1, 1, 'Tôi rất thich sản phẩm này cũng như chất lượng dịch vụ tuyệt vời của Stech, các bạn nên mua nha.',
        '2024-08-04', '2024-08-04');


INSERT INTO "public"."shop" ("id_shop", "name", "address", "phone", "status", "email")
VALUES (1, 'Stech', 'Công viên phần mềm Quang Trung, Tân Chánh Hiệp, Quận 12, thành phố Hồ Chí Minh', '0338015138', 1,
        'stechsupport@gmail.com');


INSERT INTO "public"."vouchers" ("id_voucher", "code", "discount", "max_discount", "min_amount", "is_percent",
                                 "expired", "end_date", "created_at", "updated_at")
VALUES (1, 'sale5', 5, 2000000, 10000000, 't', 'f', '2024-08-30', '2024-07-15', '2024-07-15');
INSERT INTO "public"."vouchers" ("id_voucher", "code", "discount", "max_discount", "min_amount", "is_percent",
                                 "expired", "end_date", "created_at", "updated_at")
VALUES (2, 'sale10', 10, 5000000, 15000000, 't', 'f', '2024-08-30', '2024-08-03', '2024-08-03');

INSERT INTO "public"."banners" ("id_banner", "id_product", "slogan", "image", "description", "status")
VALUES (1, 48, 'Thay đổi cuộc chơi - hiệu năng dẫn đầu', 'iPhone-15-Pro-Max-running-Genshin-Impact.png',
        'Là chiếc điện thoại thông minh cao cấp nhất của Apple, iPhone 15 Pro Max mang đến sự kết hợp hoàn hảo giữa thiết kế thanh lịch, màn hình OLED siêu sắc nét và hiệu năng vượt trội nhờ chip Apple A17 Bionic. Với 4 camera chuyên nghiệp, khả năng kết nối 5G và sạc không dây MagSafe, đây chính là lựa chọn hoàn hảo cho những ai yêu thích sự đẳng cấp và muốn trải nghiệm di động tối ưu.',
        1),
       (2, 49, 'Tinh tế và mạnh mẽ với iPhone 13 mini màu đỏ',
        NULL,
        'Với thiết kế nhỏ gọn nhưng vẫn đầy đủ tính năng, iPhone 13 mini màu đỏ là lựa chọn hoàn hảo cho những ai yêu thích sự tinh tế và đẳng cấp. Sở hữu màn hình OLED sống động, chip A15 Bionic mạnh mẽ và hệ thống camera kép, chiếc iPhone này mang đến trải nghiệm di động tuyệt vời.',
        1);
--        (3, 1, 'Tinh tế và mạnh mẽ với iPhone 13 mini màu đỏ', "",
--         'Với thiết kế nhỏ gọn nhưng vẫn đầy đủ tính năng, iPhone 13 mini màu đỏ là lựa chọn hoàn hảo cho những ai yêu thích sự tinh tế và đẳng cấp. Sở hữu màn hình OLED sống động, chip A15 Bionic mạnh mẽ và hệ thống camera kép, chiếc iPhone này mang đến trải nghiệm di động tuyệt vời.',
--         1);