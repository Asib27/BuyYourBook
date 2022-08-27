--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: buy_items(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buy_items() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

    BEGIN

        INSERT INTO bought_items(user_id,book_id,quantity) VALUES(old.user_id, old.book_id, old.quantity);

        RETURN OLD;

    END;

$$;


ALTER FUNCTION public.buy_items() OWNER TO postgres;

--
-- Name: notification_buy_successful(bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.notification_buy_successful(IN user_id bigint)
    LANGUAGE plpgsql
    AS $$

begin

   insert into notification(notify_whom, type) values (user_id, 'buy successful');

end;$$;


ALTER PROCEDURE public.notification_buy_successful(IN user_id bigint) OWNER TO postgres;

--
-- Name: notification_downvote(bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.notification_downvote(IN user_id bigint)
    LANGUAGE plpgsql
    AS $$

begin

   insert into notification(notify_whom, type) values (user_id, 'downvoted');

end;$$;


ALTER PROCEDURE public.notification_downvote(IN user_id bigint) OWNER TO postgres;

--
-- Name: notification_upvote(bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.notification_upvote(IN user_id bigint)
    LANGUAGE plpgsql
    AS $$



begin

    insert into notification(notify_whom, type) values (user_id, 'upvoted');

end;

$$;


ALTER PROCEDURE public.notification_upvote(IN user_id bigint) OWNER TO postgres;

--
-- Name: trigger_function(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF TG_OP = 'INSERT' THEN
        INSERT INTO user_cloned VALUES (NEW.id,
                                        NEW.email,
                                        NEW.username);
                                       
        RETURN NEW;
   END IF;
   
   IF TG_OP = 'DELETE' THEN
        DELETE 
        FROM user_cloned 
        WHERE userid = OLD.id;                          
        RETURN OLD;     
   END IF;
   IF TG_OP = 'UPDATE' THEN
        UPDATE  user_cloned 
        SET userid = NEW.id, username = NEW.username,
            email = NEW.email;                           
        RETURN NEW;    
   END IF;
    
END;
$$;


ALTER FUNCTION public.trigger_function() OWNER TO postgres;

--
-- Name: update_transaction(bigint, double precision); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.update_transaction(IN user_id bigint, IN totalprice double precision)
    LANGUAGE plpgsql
    AS $$

declare

    l_id  bigint;

begin

    select location_id into l_id

    from user_cloned

    where userid = user_id;



    insert into transaction(location_id, user_id, total_price) values(l_id, user_id, totalPrice);



end;$$;


ALTER PROCEDURE public.update_transaction(IN user_id bigint, IN totalprice double precision) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author_of_books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author_of_books (
    book_id bigint NOT NULL,
    author_id bigint NOT NULL
);


ALTER TABLE public.author_of_books OWNER TO postgres;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id bigint NOT NULL,
    email character varying(255),
    name character varying(200) NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_id_seq OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    isbn bigint NOT NULL,
    edition integer NOT NULL,
    genre character varying(50) NOT NULL,
    language character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    price integer NOT NULL,
    quantity_available integer NOT NULL,
    publisher_id bigint
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_in_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books_in_transaction (
    tx_id bigint NOT NULL,
    isbn bigint NOT NULL
);


ALTER TABLE public.books_in_transaction OWNER TO postgres;

--
-- Name: books_isbn_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_isbn_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_isbn_seq OWNER TO postgres;

--
-- Name: books_isbn_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_isbn_seq OWNED BY public.books.isbn;


--
-- Name: bought_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bought_items (
    id bigint NOT NULL,
    book_id bigint,
    quantity integer,
    user_id bigint
);


ALTER TABLE public.bought_items OWNER TO postgres;

--
-- Name: bought_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bought_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bought_items_id_seq OWNER TO postgres;

--
-- Name: bought_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bought_items_id_seq OWNED BY public.bought_items.id;


--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id bigint NOT NULL,
    quantity integer,
    book_id bigint,
    user_id bigint
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- Name: cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_item_id_seq OWNER TO postgres;

--
-- Name: cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;


--
-- Name: coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupon (
    id bigint NOT NULL,
    discount double precision,
    name character varying(255),
    status character varying(255)
);


ALTER TABLE public.coupon OWNER TO postgres;

--
-- Name: coupon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coupon_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coupon_id_seq OWNER TO postgres;

--
-- Name: coupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coupon_id_seq OWNED BY public.coupon.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    user_id bigint NOT NULL,
    follows_whom bigint NOT NULL
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id bigint NOT NULL,
    district character varying(50) NOT NULL,
    postal_code character varying(10) NOT NULL,
    street_address character varying(200) NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    not_id bigint NOT NULL,
    notify_whom bigint,
    type character varying(200)
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: notification_not_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notification ALTER COLUMN not_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notification_not_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: publisher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publisher (
    id bigint NOT NULL,
    name character varying(255),
    location_id bigint
);


ALTER TABLE public.publisher OWNER TO postgres;

--
-- Name: publisher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publisher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publisher_id_seq OWNER TO postgres;

--
-- Name: publisher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publisher_id_seq OWNED BY public.publisher.id;


--
-- Name: refreshtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refreshtoken (
    id bigint NOT NULL,
    expiry_date timestamp without time zone NOT NULL,
    token character varying(255) NOT NULL,
    user_id bigint
);


ALTER TABLE public.refreshtoken OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id bigint NOT NULL,
    downvotes integer,
    rating real,
    review character varying(500),
    upvotes integer,
    book_id bigint,
    user_id bigint,
    add_date timestamp without time zone
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    tx_id bigint NOT NULL,
    location_id bigint,
    user_id bigint,
    total_price integer
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- Name: transaction_tx_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_tx_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_tx_id_seq OWNER TO postgres;

--
-- Name: transaction_tx_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_tx_id_seq OWNED BY public.transaction.tx_id;


--
-- Name: user_cloned; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cloned (
    userid bigint NOT NULL,
    email character varying(255),
    username character varying(255),
    location_id bigint
);


ALTER TABLE public.user_cloned OWNER TO postgres;

--
-- Name: user_cloned_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_cloned_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_cloned_userid_seq OWNER TO postgres;

--
-- Name: user_cloned_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_cloned_userid_seq OWNED BY public.user_cloned.userid;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(50),
    passwd character varying(120),
    username character varying(20)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books isbn; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN isbn SET DEFAULT nextval('public.books_isbn_seq'::regclass);


--
-- Name: bought_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bought_items ALTER COLUMN id SET DEFAULT nextval('public.bought_items_id_seq'::regclass);


--
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);


--
-- Name: coupon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon ALTER COLUMN id SET DEFAULT nextval('public.coupon_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: publisher id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher ALTER COLUMN id SET DEFAULT nextval('public.publisher_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: transaction tx_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN tx_id SET DEFAULT nextval('public.transaction_tx_id_seq'::regclass);


--
-- Name: user_cloned userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cloned ALTER COLUMN userid SET DEFAULT nextval('public.user_cloned_userid_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: author_of_books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.author_of_books (book_id, author_id) FROM stdin;
3	1
7	3
1	4
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authors (id, email, name) FROM stdin;
1	\N	Rabindranath Tagore
2	wali@gmail.com	Sayed WaliUllah
3	\N	Sophocles
4	manik@gmail.com	Manik Bondhopadhay
5	amn@gmail.com	Sadat Hossain
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (isbn, edition, genre, language, name, price, quantity_available, publisher_id) FROM stdin;
6	5	Novel	English	Pride and Prejudice	150	25	\N
4	5	Play	English	Hamlet 	150	9	\N
5	5	Novel	Bangla	Lalsalu	150	3	\N
7	5	Novel	English	Oedipus Rex	150	21	\N
3	5	Romantic	Bangla	Choker bali	150	17	\N
1	5	Novel	Bangla	Padma Nodir Mazhi	150	15	4
123456	5	Romantic	Bangla	Choker bali	150	25	\N
\.


--
-- Data for Name: books_in_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_in_transaction (tx_id, isbn) FROM stdin;
\.


--
-- Data for Name: bought_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bought_items (id, book_id, quantity, user_id) FROM stdin;
1	4	4	3
2	3	1	3
3	5	5	3
4	5	2	4
5	3	2	4
6	1	2	4
7	7	2	4
8	7	2	4
9	3	2	4
10	1	2	4
11	1	2	4
12	1	2	1
13	1	2	1
\.


--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, quantity, book_id, user_id) FROM stdin;
\.


--
-- Data for Name: coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupon (id, discount, name, status) FROM stdin;
2	5	abab	valid
4	10	abba	valid
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows (user_id, follows_whom) FROM stdin;
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, district, postal_code, street_address) FROM stdin;
1	Dhaka	1253	0 Stephen Alley
2	Chittagong	3764	3 Hoepker Park
3	Comilla	1729	1930 Rusk Drive
4	Dhaka	1253	47 Onsgard Lane
5	Rajshahi	1201	45267 Algoma Park
6	Dhaka	1253	0 Hanson Park
7	Kolkata	42160	186 Pawling Trail
8	Kolkata	42160	2692 Waubesa Lane
9	Dhaka	1253	206 Forest Dale Drive
10	Dhaka	1253	04 Valley Edge Crossing
11	Netrokona	1230	Bagra,Challisha
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (not_id, notify_whom, type) FROM stdin;
1	3	upvoted
3	3	downvoted
4	3	downvoted
5	3	downvoted
6	3	downvoted
7	3	downvoted
8	3	upvoted
9	4	buy successful
10	4	buy successful
11	4	buy successful
12	1	buy successful
13	1	buy successful
\.


--
-- Data for Name: publisher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publisher (id, name, location_id) FROM stdin;
1	Gazi publishers	2
2	Penguin books	4
3	Brothers publishers	1
4	Western Books	6
5	Book House	8
6	Prothoma	9
7	Bangala Books	7
8	Kolkata Books	8
9	kamal brothers	3
\.


--
-- Data for Name: refreshtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refreshtoken (id, expiry_date, token, user_id) FROM stdin;
1	2022-07-22 01:23:48.625503	26ba999e-0640-436d-96ef-16e0a495c6ea	3
2	2022-07-22 01:26:03.187674	bc47a6bf-c0f0-46ba-81fe-b3bba01eab10	3
3	2022-07-22 01:26:44.566833	87cdd3f8-2919-4cfb-a753-1e794aae0ddf	3
4	2022-07-22 01:37:06.720544	95949cb9-ee26-4f10-8e03-0e47237034f6	3
5	2022-07-22 01:37:50.096402	1f1ac0df-bdb8-4b7f-9f1f-624acf7fda27	3
6	2022-07-22 01:49:52.264131	bec4d7fc-717b-444b-ac9f-14d31da30527	3
7	2022-07-22 01:50:16.542262	06756f21-ba6f-44c3-bd68-750fd90cb93a	3
8	2022-08-09 22:13:23.352295	8d091151-d911-418a-bafd-3ae4328eecff	3
9	2022-08-10 13:04:22.229693	4126297a-051e-401e-8082-eb6a5583d494	3
10	2022-08-11 11:27:13.547176	044da956-5f3e-4e71-add2-7cbba1ca544f	3
11	2022-08-11 11:34:05.780349	d70ad558-2a5e-4045-8be6-35e6f942a5ab	3
12	2022-08-13 16:15:21.333896	e89e93e6-f39c-4bb2-924c-4a912cedf551	3
13	2022-08-13 17:01:25.252109	ed3180cd-b14d-4970-8cb2-979674b0851a	3
14	2022-08-13 17:02:58.457435	cef921bf-aa58-4945-8aa0-88302c6c062d	3
15	2022-08-13 22:27:38.476188	1e2b3854-2c76-451f-95ca-a02c2cf844eb	4
16	2022-08-13 22:41:04.862886	e027b140-15f6-4809-aab2-729e4e40029d	2
17	2022-08-13 22:44:35.653531	8fc72a02-267b-428d-9301-e52d32be11b7	1
18	2022-08-13 22:46:06.18093	e72734de-a643-4a8f-8f1f-15d90228cba9	3
19	2022-08-13 22:54:48.514003	8bba1259-5f5b-4ab4-8d75-87a07bd5786d	2
20	2022-08-14 10:19:38.153193	00d3ab3f-5024-4117-b242-900f4aade294	3
21	2022-08-14 10:37:02.866523	1f7fe35b-d47a-4953-b697-c492113514e9	3
22	2022-08-14 11:08:16.493072	e447b4bc-0a91-43cf-96e6-4826f458111e	3
23	2022-08-14 11:14:58.961887	df04e8fb-1d8a-403e-828b-8d9b6a761735	3
24	2022-08-14 11:18:23.903817	9d9b65d5-b8a2-48eb-b6fa-74815bfc351a	3
25	2022-08-14 11:32:54.992598	aa549ed0-7a77-4733-8be8-990332839e38	3
26	2022-08-14 11:40:00.436741	857e9d31-34ca-46b0-b3a5-2d32e1c2442d	3
27	2022-08-14 11:44:21.736182	2aa386c1-8a4d-40aa-aef5-7383b21aefc8	3
28	2022-08-14 12:27:41.504779	4ea3ae9f-d51b-492a-86c8-898db6408d06	3
29	2022-08-14 12:28:50.895202	6d66c63e-62a6-473d-85d3-4c291ba18736	3
30	2022-08-14 13:15:44.112372	a77276c3-07a3-416f-884a-b8c226d92ba2	3
31	2022-08-16 21:50:57.080556	ee181469-b039-4100-a83a-5dd0a5ec1f32	3
32	2022-08-16 22:29:49.668982	6378a338-40f4-4561-9e2f-fd410d9e431e	3
33	2022-08-16 22:46:55.209702	1df342a5-bcec-40d4-8999-7b43a7c25d7c	3
34	2022-08-16 23:28:11.035912	59a2b543-60b7-4fbe-8ab4-3bed05273a0b	3
35	2022-08-20 15:45:01.230018	77470570-dfaf-4ef1-a551-b197212e9f2e	3
36	2022-08-20 15:48:58.388767	c00eeb64-bb1f-4fce-b98f-58dd8e497e26	3
37	2022-08-20 15:55:35.141852	e439cdff-40b0-4542-91bd-b0206fe42e22	3
38	2022-08-25 22:27:48.483272	7ecfa08e-c54f-410f-a853-e251cb5fe11e	4
39	2022-08-25 22:35:33.15515	ce6da723-216e-4060-8c8b-ebdfcd5a29e5	4
40	2022-08-25 22:40:36.240104	e71ff265-ce31-415f-8595-adc1e59196eb	4
41	2022-08-25 23:49:18.599254	8547252b-7387-4b3d-a605-7a8554c751c8	4
42	2022-08-25 23:56:25.585246	e50b932d-9c28-46a2-b1c8-9fae51e6721f	4
43	2022-08-26 12:55:35.164665	7d7735a2-8ce8-42ef-a741-40e1e6c45783	4
44	2022-08-26 13:04:25.64358	ec1203d3-3401-4f22-801d-372d0ae280c3	4
45	2022-08-26 13:07:54.956554	4d52644d-7b10-41e8-a3c4-3fcddb244957	4
46	2022-08-26 13:10:16.036528	2ea49d5e-9a4e-4679-a034-b534cfc2fa6a	4
47	2022-08-26 13:19:39.006266	d747f52c-aaff-4874-8362-5b7dc0782a35	4
48	2022-08-26 13:19:47.411339	c94883e0-afca-42a6-abc9-6762799e4a04	1
49	2022-08-26 13:57:09.245722	21d20d11-1e86-4d08-806e-1b3bad997807	1
50	2022-08-26 14:02:33.373379	f8e6ea8d-e62b-4cc9-8177-22cce12751bb	1
51	2022-08-26 14:05:22.347987	89f85261-58be-48b4-8ac1-c9d8ee8366c2	1
52	2022-08-28 12:33:50.370192	bf20ad77-7082-48fc-a23b-d835c55c47b2	3
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, downvotes, rating, review, upvotes, book_id, user_id, add_date) FROM stdin;
1	5	4	The book is excellent	7	1	3	2022-08-10 13:38:47
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ROLE_USER
2	ROLE_MODERATOR
3	ROLE_ADMIN
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (tx_id, location_id, user_id, total_price) FROM stdin;
1	2	4	\N
2	2	4	\N
3	2	4	\N
4	1	1	\N
5	1	1	300
\.


--
-- Data for Name: user_cloned; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cloned (userid, email, username, location_id) FROM stdin;
1	mod2@email.com	mod2	1
4	kamal@gmail.com	kamal	2
3	abc@email.com	Tanveer	9
2	mod3@email.com	mod3	11
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1	2
1	1
2	2
2	1
3	1
3	2
4	2
4	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, passwd, username) FROM stdin;
1	mod2@email.com	$2a$10$9N3D.i3K3DZkh3bE9CR0ZuyRxyPzNdN1QisLw/ssFrvR1auiSxaf.	mod2
2	mod3@email.com	$2a$10$NjK3g9v69QWL3hBapJIw2Ola5IOQa/72SP2lSNN3jbY2PhG6qeJaC	mod3
3	abc@email.com	$2a$10$cLNS1JaME8E8fE7/V5ZPh.hegPWxfTnZ/kLUH1stmZwcCltGCeecm	Tanveer
4	kamal@gmail.com	$2a$10$sDCxxAIwMGNN/CvrzXD71.a4MWVqi5F1n0x.zM0NvYvTv8Yv6j0zO	kamal
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 5, true);


--
-- Name: books_isbn_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_isbn_seq', 7, true);


--
-- Name: bought_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bought_items_id_seq', 13, true);


--
-- Name: cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_item_id_seq', 13, true);


--
-- Name: coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coupon_id_seq', 4, true);


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 52, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 11, true);


--
-- Name: notification_not_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_not_id_seq', 13, true);


--
-- Name: publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publisher_id_seq', 9, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: transaction_tx_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_tx_id_seq', 5, true);


--
-- Name: user_cloned_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cloned_userid_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: author_of_books author_of_books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_of_books
    ADD CONSTRAINT author_of_books_pkey PRIMARY KEY (book_id, author_id);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books_in_transaction books_in_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_in_transaction
    ADD CONSTRAINT books_in_transaction_pkey PRIMARY KEY (tx_id, isbn);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (isbn);


--
-- Name: bought_items bought_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bought_items
    ADD CONSTRAINT bought_items_pkey PRIMARY KEY (id);


--
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);


--
-- Name: coupon coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT coupon_pkey PRIMARY KEY (id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (user_id, follows_whom);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (not_id);


--
-- Name: publisher publisher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher
    ADD CONSTRAINT publisher_pkey PRIMARY KEY (id);


--
-- Name: refreshtoken refreshtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refreshtoken
    ADD CONSTRAINT refreshtoken_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (tx_id);


--
-- Name: users uk6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: coupon uk_dfikvnp7dxdfishfvpnlc0xc1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT uk_dfikvnp7dxdfishfvpnlc0xc1 UNIQUE (name);


--
-- Name: authors uk_jmhavkj33euq43uhnucw7l5he; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT uk_jmhavkj33euq43uhnucw7l5he UNIQUE (email);


--
-- Name: refreshtoken uk_or156wbneyk8noo4jstv55ii3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refreshtoken
    ADD CONSTRAINT uk_or156wbneyk8noo4jstv55ii3 UNIQUE (token);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: user_cloned user_cloned_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cloned
    ADD CONSTRAINT user_cloned_pkey PRIMARY KEY (userid);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_item update_buy_items; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_buy_items BEFORE DELETE ON public.cart_item FOR EACH ROW EXECUTE FUNCTION public.buy_items();


--
-- Name: users update_user_cloned; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_cloned BEFORE INSERT OR DELETE OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.trigger_function();


--
-- Name: books fk1eujqvebj0cej9mcivv49grwi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT fk1eujqvebj0cej9mcivv49grwi FOREIGN KEY (publisher_id) REFERENCES public.publisher(id);


--
-- Name: cart_item fk1wi7wavn5l3p1p6ky6x92klkg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT fk1wi7wavn5l3p1p6ky6x92klkg FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


--
-- Name: reviews fk3kmmwd1hh6dx4bnlm0a2igy8l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk3kmmwd1hh6dx4bnlm0a2igy8l FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


--
-- Name: publisher fk4itc1clgacy8pgf5ue77rqrwk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher
    ADD CONSTRAINT fk4itc1clgacy8pgf5ue77rqrwk FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: reviews fk6a9k6xvev80se5rreqvuqr7f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk6a9k6xvev80se5rreqvuqr7f9 FOREIGN KEY (book_id) REFERENCES public.books(isbn);


--
-- Name: transaction fk8vyn3xvfdku4nu6okf0w4y1n0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk8vyn3xvfdku4nu6okf0w4y1n0 FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


--
-- Name: notification fk_notify_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk_notify_user FOREIGN KEY (notify_whom) REFERENCES public.user_cloned(userid);


--
-- Name: refreshtoken fka652xrdji49m4isx38pp4p80p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refreshtoken
    ADD CONSTRAINT fka652xrdji49m4isx38pp4p80p FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cart_item fkb58e5ca5nwhh6hm3sboyggghe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT fkb58e5ca5nwhh6hm3sboyggghe FOREIGN KEY (book_id) REFERENCES public.books(isbn);


--
-- Name: author_of_books fkf8bt16os7tm4ixs2yx3ruqnmd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_of_books
    ADD CONSTRAINT fkf8bt16os7tm4ixs2yx3ruqnmd FOREIGN KEY (book_id) REFERENCES public.books(isbn);


--
-- Name: follows fkfmnpcu6x5abpysc2g0xd7k3v8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT fkfmnpcu6x5abpysc2g0xd7k3v8 FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


--
-- Name: books_in_transaction fkg8iovbao4q4bsq8v5md6n1smu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_in_transaction
    ADD CONSTRAINT fkg8iovbao4q4bsq8v5md6n1smu FOREIGN KEY (tx_id) REFERENCES public.transaction(tx_id);


--
-- Name: books_in_transaction fkgbny592dwje2mwfylvji3jmp1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_in_transaction
    ADD CONSTRAINT fkgbny592dwje2mwfylvji3jmp1 FOREIGN KEY (isbn) REFERENCES public.books(isbn);


--
-- Name: user_roles fkh8ciramu9cc9q3qcqiv4ue8a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_cloned fkhah79ykxggf69pqdyrfayynel; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cloned
    ADD CONSTRAINT fkhah79ykxggf69pqdyrfayynel FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: user_roles fkhfh9dx7w3ubf1co1vdev94g3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: follows fkp7e2h58a6iyr9lpirf6pv4mmq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT fkp7e2h58a6iyr9lpirf6pv4mmq FOREIGN KEY (follows_whom) REFERENCES public.user_cloned(userid);


--
-- Name: transaction fkpuojn1u1lygt1ve5a23xijay7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fkpuojn1u1lygt1ve5a23xijay7 FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: author_of_books fkti8qgju32kb1t1962219u4dua; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_of_books
    ADD CONSTRAINT fkti8qgju32kb1t1962219u4dua FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- PostgreSQL database dump complete
--

