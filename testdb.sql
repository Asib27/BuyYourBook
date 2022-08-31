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
-- Name: my_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.my_type AS (
	name character varying,
	price integer,
	link character varying,
	author_name character varying,
	quantity integer
);


ALTER TYPE public.my_type OWNER TO postgres;

--
-- Name: buy_items(numeric, character varying, numeric, numeric); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.buy_items(IN userid numeric, IN book_id character varying, IN quant numeric, IN buy numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
        if buy = 0 then
            INSERT INTO bought_items(user_id,book_id,quantity) VALUES(userid, book_id,quant);
        end if;

    END;

$$;


ALTER PROCEDURE public.buy_items(IN userid numeric, IN book_id character varying, IN quant numeric, IN buy numeric) OWNER TO postgres;

--
-- Name: check_location(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_location(cn character varying, street character varying, dis character varying) RETURNS bigint
    LANGUAGE plpgsql
    AS $$

    declare

        l_id bigint;

    begin



        select id into l_id

        from locations l

        where Lower(street) = lower(l.street_address)

        and  lower(dis) = lower(l.district)

        and lower(cn) = lower(l.country);



        if l_id is null then

            insert into locations(district, street_address, country) values (dis, street, cn);



            select id into l_id

            from locations l

            where street = l.street_address

            and   dis = l.district

            and cn = l.country;

        end if;

        return l_id;

    end;

$$;


ALTER FUNCTION public.check_location(cn character varying, street character varying, dis character varying) OWNER TO postgres;

--
-- Name: check_vote_function(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_vote_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

declare

    v_id numeric;

    u_vote numeric;

    d_vote numeric;

BEGIN

    select vote_id into v_id

    from votes

    where user_id = new.user_id

    and review_id = new.review_id;



    if v_id is null then

        if new.up_vote = 1 then

            update reviews set upvotes = upvotes + 1 where review_id = new.review_id;

        elsif new.down_vote = 1 then

            update reviews set downvotes = downvotes + 1 where review_id = new.review_id;

        end if;

        return NEW;

    else

        select up_vote, down_vote into u_vote, d_vote

        from votes

        where vote_id = v_id;



        if u_vote = 1 and new.up_vote = 1 then

            raise exception ' already upvoted';



        elsif u_vote = 1 and new.down_vote = 1 then

            delete from votes where vote_id = v_id;

            update reviews set upvotes = upvotes - 1 where review_id = new.review_id;

            update reviews set downvotes = downvotes + 1 where review_id = new.review_id;



        elsif d_vote = 1 and new.down_vote = 1 then

            raise exception ' already downvoted';



        elsif d_vote = 1 and new.up_vote = 1 then

            delete from votes where vote_id = v_id;

            update reviews set upvotes = upvotes + 1 where review_id = new.review_id;

            update reviews set downvotes = downvotes - 1 where review_id = new.review_id;

        end if;



    end if;



    RETURN NEW;

END;

$$;


ALTER FUNCTION public.check_vote_function() OWNER TO postgres;

--
-- Name: get_author(numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_author(cart_id numeric) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

    declare

        author_name varchar;

    begin

        select name into author_name

        from authors

        where id = (

            select author_id

            from author_of_books

            where book_id = (select book_id from cart_item where cart_id = id)

        );

        RETURN author_name;

    end;

$$;


ALTER FUNCTION public.get_author(cart_id numeric) OWNER TO postgres;

--
-- Name: get_object_fields(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_object_fields(cart_id bigint) RETURNS public.my_type
    LANGUAGE plpgsql
    AS $$



DECLARE

    result_record my_type;



BEGIN

    select b.name, b.price, b.link

    into result_record.name, result_record.price

    from books b join cart_item ci on b.isbn = ci.book_id

    where ci.id = cart_id;



    select quantity into result_record.quantity

    from cart_item

    where id = cart_id;

    raise notice '%', result_record.quantity;



    select name into result_record.author_name

    from authors

    where id = (

        select author_id

        from author_of_books

        where book_id = (select book_id from cart_item where cart_id = id)

    );



    RETURN result_record;



END



$$;


ALTER FUNCTION public.get_object_fields(cart_id bigint) OWNER TO postgres;

--
-- Name: insert_verification(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_verification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

DECLARE

    dis varchar;

    cntry varchar;

    address varchar;

    l_id bigint;

BEGIN



    l_id := 0;



    dis := NEW.district;

    cntry := new.country;

    address := new.street_address;



    select id into l_id from locations

    where lower(cntry) = lower(country)

    and lower(dis) = lower(district)

    and lower(address) = lower(street_address);



    if l_id <> 0 then

        Raise EXCEPTION '%',l_id;

    end if;



   RETURN NEW;

END;

$$;


ALTER FUNCTION public.insert_verification() OWNER TO postgres;

--
-- Name: notification_buy_successful(bigint, numeric); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.notification_buy_successful(IN user_id bigint, IN buy numeric)
    LANGUAGE plpgsql
    AS $$
begin
    if buy = 1 then
        insert into notification(notify_whom, type) values (user_id, 'buy successful');
    end if;

end;
$$;


ALTER PROCEDURE public.notification_buy_successful(IN user_id bigint, IN buy numeric) OWNER TO postgres;

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
-- Name: update_transaction(bigint, double precision, numeric); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.update_transaction(IN user_id bigint, IN totalprice double precision, IN buy numeric)
    LANGUAGE plpgsql
    AS $$
declare

    l_id  bigint;

begin

    if buy = 1 then
        select location_id into l_id

        from user_cloned

        where userid = user_id;



        insert into transaction(location_id, user_id, total_price, added_time) values(l_id, user_id, totalPrice, now());
    end if;



end;
$$;


ALTER PROCEDURE public.update_transaction(IN user_id bigint, IN totalprice double precision, IN buy numeric) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author_of_books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author_of_books (
    book_id character varying(13) NOT NULL,
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
    isbn character varying(13) NOT NULL,
    edition integer NOT NULL,
    genre character varying(50) NOT NULL,
    language character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    price integer NOT NULL,
    quantity_available integer NOT NULL,
    publisher_id bigint,
    link character varying(255),
    description character varying(255)
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_in_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books_in_transaction (
    tx_id bigint NOT NULL,
    isbn character varying(13) NOT NULL
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
    book_id character varying(13),
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
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id bigint NOT NULL,
    user_id bigint
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_book (
    cart_id bigint NOT NULL,
    book_id character varying(13) NOT NULL
);


ALTER TABLE public.cart_book OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_cart_id_seq OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;


--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id bigint NOT NULL,
    quantity integer,
    book_id character varying(13),
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
    street_address character varying(200) NOT NULL,
    country character varying(255)
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
    book_id character varying(13),
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
    total_price double precision,
    added_time timestamp without time zone
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
    location_id bigint,
    link character varying(255),
    backup_phone_number character varying(11),
    first_name character varying(255),
    last_name character varying(255),
    middle_name character varying(255),
    phone_number character varying(11),
    about_user character varying(255),
    favourite_books character varying(255),
    favourite_genre character varying(255)
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
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    vote_id bigint NOT NULL,
    down_vote integer,
    review_id bigint,
    up_vote integer,
    user_id bigint
);


ALTER TABLE public.votes OWNER TO postgres;

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
-- Name: cart cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);


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
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (isbn, edition, genre, language, name, price, quantity_available, publisher_id, link, description) FROM stdin;
5	5	Novel	Bangla	Lalsalu	150	25	\N	\N	\N
6	5	Novel	English	Pride and Prejudice	150	25	\N	\N	\N
7	5	Novel	English	Oedipus Rex	150	25	\N	\N	\N
3	5	Romantic	Bangla	Choker bali	150	23	\N	\N	\N
4	5	Play	English	Hamlet 	150	23	\N	\N	\N
1	5	Novel	Bangla	Padma Nodir Mazhi	150	21	4	\N	This book is all about nothing...
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
14	3	2	6
15	4	2	6
16	1	2	6
17	1	2	1
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cart_id, user_id) FROM stdin;
\.


--
-- Data for Name: cart_book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_book (cart_id, book_id) FROM stdin;
\.


--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, quantity, book_id, user_id) FROM stdin;
23	4	5	6
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
6	3
6	1
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, district, street_address, country) FROM stdin;
1	Dhaka	0 Stephen Alley	Bangladesh
2	Chittagong	3 Hoepker Park	Bangladesh
3	Comilla	1930 Rusk Drive	Bangladesh
4	Dhaka	47 Onsgard Lane	Bangladesh
5	Rajshahi	45267 Algoma Park	Bangladesh
6	Dhaka	0 Hanson Park	Bangladesh
7	Kolkata	186 Pawling Trail	India
8	Kolkata	2692 Waubesa Lane	India
9	Dhaka	206 Forest Dale Drive	Bangladesh
10	Dhaka	04 Valley Edge Crossing	Bangladesh
12	ab	cd	bd
16	Dhaka	0 Stephen Alley	India
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
14	6	buy successful
15	1	buy successful
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
53	2022-08-28 18:27:45.200842	a5ab6167-2744-4eee-87b0-fa3071a28321	3
54	2022-08-28 18:28:52.638521	c900b156-9c40-4e36-8f90-a93509716439	3
55	2022-08-28 18:30:13.182795	3342d7a4-050c-4639-bb71-be859cd5284e	3
56	2022-08-28 18:32:52.58877	3a89f1f2-96bf-42df-80e6-7d1d409b2c71	6
57	2022-08-29 00:26:20.894155	715f6197-1b5a-4caa-ba81-9c8ddfb6d12c	6
58	2022-08-29 00:40:03.528651	b3758bcc-d539-48e5-9e4d-69421a160cf6	6
59	2022-08-29 00:44:57.827875	180f9f68-b06a-4e86-bd86-56bf9318d6c5	6
60	2022-08-29 00:56:28.559892	2f9db286-d5e5-4264-9bff-40c99c919b37	6
61	2022-08-29 00:56:49.106902	4aa7388b-bb73-4752-924f-9b5bc0916cd3	6
62	2022-08-29 01:07:26.429966	4e34c4d8-6423-4ea1-9e29-558ad1b19c0a	6
63	2022-08-29 01:21:59.845996	7661eb94-e307-4ca7-84ef-3029e8225b10	6
64	2022-08-29 12:21:21.361914	8108d45f-edf5-4229-a0d3-c21e50713025	6
65	2022-08-29 19:23:27.145245	db0a49a3-99a6-422e-a33b-07f07b698a59	6
66	2022-08-29 19:26:39.900814	25187273-3214-4c86-95aa-a9c429e5b5f0	6
67	2022-08-29 19:48:39.546197	7ab433f1-82d8-482e-8c10-1a390f8081d3	6
68	2022-08-29 20:24:44.949411	eac0b6f2-aafd-4db4-b711-73bb5e4f15da	6
69	2022-08-29 20:43:29.368292	3e8450a7-e07c-432e-9893-1af061619f1d	6
70	2022-08-29 23:04:13.997813	36cf447c-31db-4a1f-b59f-559b0b80b1df	6
71	2022-08-29 23:25:19.054564	46a370c5-0041-44bc-bf23-72e917ba45e2	6
72	2022-08-31 19:45:10.381708	193b648a-c589-40d0-8fe9-61e74ff2676e	6
73	2022-08-31 21:18:24.408807	7e54358f-d649-4cf4-9e69-9b3bdc1b3c2b	6
74	2022-08-31 21:21:03.255673	16270911-755e-4986-852f-52f54084be0f	6
75	2022-08-31 22:00:42.23492	879859af-3cef-4c28-8459-44f16abd2d1b	6
76	2022-08-31 22:05:32.206849	3c2cb379-1d81-42bd-9677-38286a5efb85	6
77	2022-08-31 22:13:13.000307	9b101f28-ca6b-4c61-8d3b-30a4a3a90ca9	6
78	2022-08-31 22:16:39.792025	324db5ee-844e-46fe-bf12-ebfc20a0c8c1	6
79	2022-08-31 22:22:52.721493	00e5813c-3c05-4173-88c0-e6c35a96dc41	6
80	2022-08-31 22:25:23.802252	8c7075c1-83d6-4b29-95f9-46c9466990cb	6
81	2022-08-31 22:31:01.529834	1f61afb4-059b-4878-b6ed-31a505af53dd	6
82	2022-08-31 22:34:22.891903	cc5ab14a-e245-4d75-8039-6edf2e0974b2	6
83	2022-08-31 22:35:57.939892	5a4a782d-4493-4de8-ae99-fbbca98c6c8f	6
84	2022-08-31 22:42:16.692654	c30f93e7-57a4-4975-8f51-048539527366	6
85	2022-08-31 23:23:34.617636	42d0e5e1-b855-4826-aa39-80c490f2160e	6
86	2022-08-31 23:29:21.853891	cb713a00-e66c-4b47-9947-c3beb8d40739	6
87	2022-08-31 23:31:09.523461	c98b92f2-62b3-4c79-9434-a5edce954d9d	6
88	2022-08-31 23:34:28.533467	863d4e36-3e06-45ad-af10-7c0220bb8302	6
89	2022-08-31 23:37:11.471169	0369417a-eef1-435b-94b8-fa68e44b5da7	6
90	2022-08-31 23:48:46.723098	3d91adfe-adfe-4f54-b660-3808fce9ac95	6
91	2022-08-31 23:49:43.441835	ff3529e8-4c83-4cb5-b018-492daaeed3a7	6
92	2022-09-01 00:01:18.335973	19e5095d-2f2f-43a4-b35f-5c17487bada1	6
93	2022-09-01 00:05:53.998505	bab405aa-bfc0-47e4-8452-8ed7490c8302	6
94	2022-09-01 00:10:06.930205	3424c550-d6a3-49f0-bfe5-cc61b1e27b1b	1
95	2022-09-01 00:50:25.934614	4ebc77ad-4e71-470d-a99b-8af45cd158e0	1
96	2022-09-01 02:03:05.252821	2ef867d3-c97c-4974-ba51-670dceb40d85	1
101	2022-09-01 02:48:19.131256	6b7c1097-433a-42a2-b7c4-cd3821711b80	6
102	2022-09-01 03:40:51.190643	d73351dd-4e19-45f0-9172-e2b73011ed56	6
103	2022-09-01 05:38:54.551189	ba182357-2c12-47f9-b9ac-93885137c941	1
104	2022-09-01 05:51:22.025283	477f8675-52d0-40f7-8d7f-e10e360892df	1
105	2022-09-01 10:01:22.305626	15f42330-5946-4876-a5d7-4133ea25dc56	6
106	2022-09-01 10:06:54.101833	19bbdcbf-79e2-4650-8d5a-486666112bfa	6
107	2022-09-01 10:09:48.101428	fde0844a-59e0-4c0e-89e3-e3081cbe553e	6
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, downvotes, rating, review, upvotes, book_id, user_id, add_date) FROM stdin;
7	0	5	The book is excellent	0	1	6	2022-08-28 01:09:54
8	0	2	The book is bad	0	4	6	2022-08-28 01:10:08
5	2	4	The book is excellent	0	1	6	2022-08-28 01:08:42
6	0	3	The book is excellent	0	1	6	2022-08-28 01:09:49
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

COPY public.transaction (tx_id, location_id, user_id, total_price, added_time) FROM stdin;
6	\N	6	900	2022-08-31 05:40:20.068278
7	16	1	300	2022-08-31 05:42:41.825594
\.


--
-- Data for Name: user_cloned; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cloned (userid, email, username, location_id, link, backup_phone_number, first_name, last_name, middle_name, phone_number, about_user, favourite_books, favourite_genre) FROM stdin;
4	kamal@gmail.com	kamal	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	mod3@email.com	mod3	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	abc@email.com	Tanveer	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	abcd@email.com	mod	\N	\N	01234567891	abc	ghi	def	12345678910	\N	\N	\N
1	mod2@email.com	mod2	16	\N	\N	\N	\N	\N	\N	\N	\N	\N
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
6	1
6	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, passwd, username) FROM stdin;
1	mod2@email.com	$2a$10$9N3D.i3K3DZkh3bE9CR0ZuyRxyPzNdN1QisLw/ssFrvR1auiSxaf.	mod2
2	mod3@email.com	$2a$10$NjK3g9v69QWL3hBapJIw2Ola5IOQa/72SP2lSNN3jbY2PhG6qeJaC	mod3
3	abc@email.com	$2a$10$cLNS1JaME8E8fE7/V5ZPh.hegPWxfTnZ/kLUH1stmZwcCltGCeecm	Tanveer
4	kamal@gmail.com	$2a$10$sDCxxAIwMGNN/CvrzXD71.a4MWVqi5F1n0x.zM0NvYvTv8Yv6j0zO	kamal
6	abcd@email.com	$2a$10$ADfv6Bb0rjnb6e.0Wzfi.uoqafc4j3hvpc/760x5Tiux.hkyPLFUC	mod
\.


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.votes (vote_id, down_vote, review_id, up_vote, user_id) FROM stdin;
2	1	5	0	2
100	1	6	0	1
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 4, true);


--
-- Name: books_isbn_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_isbn_seq', 7, true);


--
-- Name: bought_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bought_items_id_seq', 17, true);


--
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_cart_id_seq', 1, false);


--
-- Name: cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_item_id_seq', 23, true);


--
-- Name: coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coupon_id_seq', 4, true);


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 107, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 16, true);


--
-- Name: notification_not_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_not_id_seq', 15, true);


--
-- Name: publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publisher_id_seq', 9, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 8, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: transaction_tx_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_tx_id_seq', 7, true);


--
-- Name: user_cloned_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cloned_userid_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


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
-- Name: cart_book cart_book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_book
    ADD CONSTRAINT cart_book_pkey PRIMARY KEY (cart_id, book_id);


--
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


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
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (vote_id);


--
-- Name: votes last_name_changes; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_name_changes BEFORE INSERT ON public.votes FOR EACH ROW EXECUTE FUNCTION public.check_vote_function();


--
-- Name: users update_user_cloned; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_cloned BEFORE INSERT OR DELETE OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.trigger_function();


--
-- Name: locations verify_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER verify_insert BEFORE INSERT ON public.locations FOR EACH ROW EXECUTE FUNCTION public.insert_verification();


--
-- Name: author_of_books author_of_books_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_of_books
    ADD CONSTRAINT author_of_books_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(isbn);


--
-- Name: books_in_transaction books_in_transaction_isbn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_in_transaction
    ADD CONSTRAINT books_in_transaction_isbn_fkey FOREIGN KEY (isbn) REFERENCES public.books(isbn);


--
-- Name: cart_book cart_book_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_book
    ADD CONSTRAINT cart_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(isbn);


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
-- Name: cart_book fk3a7qu2xj02cbgbv7rjpjo8seb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_book
    ADD CONSTRAINT fk3a7qu2xj02cbgbv7rjpjo8seb FOREIGN KEY (cart_id) REFERENCES public.cart(cart_id);


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
-- Name: transaction fk8vyn3xvfdku4nu6okf0w4y1n0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk8vyn3xvfdku4nu6okf0w4y1n0 FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


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
-- Name: cart fkgqefp98uipqo0ida1n0kvfqq3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fkgqefp98uipqo0ida1n0kvfqq3 FOREIGN KEY (user_id) REFERENCES public.user_cloned(userid);


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
-- Name: reviews reviews_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(isbn);


--
-- PostgreSQL database dump complete
--


